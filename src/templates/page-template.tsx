import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import PageTemplateDetails from '../components/PageTemplateDetails';
import SEO from '../components/SEO';
import { PageBySlugQuery } from '../graphql';

const PageTemplate = ({ data, location }: { data: PageBySlugQuery; location: string }) => {
  const { title, subtitle } = data.site.siteMetadata;
  const page = data.mdx;
  const { title: pageTitle, description: pageDescription } = page.frontmatter;
  const description = pageDescription !== null ? pageDescription : subtitle;

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${pageTitle} - ${title}`}</title>
          <meta name='description' content={description} />
        </Helmet>
        <SEO article={false} title={pageTitle} description={description} />
        <PageTemplateDetails data={data} location={location} />
      </div>
    </Layout>
  );
};

export default PageTemplate;

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      fields {
        slug
      }
      frontmatter {
        date
        title
        description
      }
    }
  }
`;
