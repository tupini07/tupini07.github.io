const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const slash = require('slash')
const { parse } = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = path.resolve('./src/templates/post-template.tsx')
  const wikiPageTemplate = path.resolve('./src/templates/wiki-page-template.tsx')
  const pageTemplate = path.resolve('./src/templates/page-template.tsx')
  const tagTemplate = path.resolve('./src/templates/tag-template.tsx')
  const categoryTemplate = path.resolve(
    './src/templates/category-template.tsx'
  )

  let result = await graphql(`
      {
        allMdx(limit: 1000, filter: {frontmatter: {draft: {ne: true}}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                title
                layout
                category
              }
            }
          }
        }
      }
    `)

  if (result.errors) {
    reject(result.errors)
  }

  _.each(result.data.allMdx.edges, edge => {
    if (_.get(edge, 'node.frontmatter.layout') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(pageTemplate),
        context: { slug: edge.node.fields.slug },
      })
    } else if (_.get(edge, 'node.frontmatter.layout') === 'wiki') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(wikiPageTemplate),
        context: { slug: edge.node.fields.slug },
      })
    } else if (_.get(edge, 'node.frontmatter.layout') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: slash(postTemplate),
        context: { slug: edge.node.fields.slug },
      })

      let tags = []
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }

      tags = _.uniq(tags)
      _.each(tags, tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`
        createPage({
          path: tagPath,
          component: tagTemplate,
          context: { tag },
        })
      })

      let categories = []
      if (_.get(edge, 'node.frontmatter.category')) {
        categories = categories.concat(edge.node.frontmatter.category)
      }

      categories = _.uniq(categories)
      _.each(categories, category => {
        const categoryPath = `/categories/${_.kebabCase(category)}/`
        createPage({
          path: categoryPath,
          component: categoryTemplate,
          context: { category },
        })
      })
    }
  })

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'File') {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    createNodeField({ node, name: 'slug', value: slug })
  } else if (
    node.internal.type === 'Mdx' &&
    typeof node.slug === 'undefined'
  ) {
    let slug = _.kebabCase(node.frontmatter.title)
    if (typeof node.frontmatter.path !== 'undefined') {
      slug = node.frontmatter.path
    }

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (typeof node.frontmatter.category !== 'undefined') {
      const categorySlug = `/categories/${_.kebabCase(
        node.frontmatter.category
      )}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }

  if (node.internal.type === 'Mdx' && node.frontmatter.layout === 'wiki') {
    const parsedPath = path.parse(node.fileAbsolutePath);
    const { dir } = parsedPath;

    let finalPath = dir.substring(dir.indexOf('/wiki/'));
    if (parsedPath.base !== 'index.mdx') {
      finalPath += `/${parsedPath.name}`;
    }

    // the slug is created based on the path of the file in the file system
    // only if no explicit path is provided in the frontmatter
    createNodeField({
      node,
      name: 'slug',
      value: node.frontmatter.path || finalPath,
    });
  }
}
