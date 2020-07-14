import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import Disqus from '../Disqus/Disqus';
import './style.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import WikiLink from '../WikiLink';

const WikiTemplateDetails = ({ data }) => {
  const { subtitle, author } = data.site.siteMetadata;
  const post = data.mdx;
  const tags = post.fields.tagSlugs;

  const homeBlock = (
    <div>
      <Link className='post-single__home-button' to='/'>
        All Articles
      </Link>
    </div>
  );

  const tagsBlock = (
    <div className='post-single__tags'>
      <ul className='post-single__tags-list'>
        {tags &&
          tags.map((tag, i) => (
            <li className='post-single__tags-list-item' key={tag}>
              <Link to={tag} className='post-single__tags-list-item-link'>
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div>
      {homeBlock}
      <h1>{post.frontmatter.title}</h1>
      <div className="published-date">
        <em>Created on: {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
      </div>
      <MDXProvider
        components={{
          a: (props) => <WikiLink {...props} />,
        }}
      >
        <MDXRenderer className='post-single__body'>{post.body}</MDXRenderer>
      </MDXProvider>
      {tagsBlock}
    </div>
  );
};

export default WikiTemplateDetails;
