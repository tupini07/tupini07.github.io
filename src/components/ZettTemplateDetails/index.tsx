import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import Disqus from '../Disqus/Disqus';
import zettTDStyle from './zetttemplatedetails.module.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import ZettLink from '../ZettLink';

const ZettTemplateDetails = ({ data }) => {
  const { subtitle, author } = data.site.siteMetadata;
  const post = data.mdx;
  const tags = post.fields.tagSlugs;

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
      <h1 className={zettTDStyle.title}>{post.frontmatter.title}</h1>
      <div className={zettTDStyle.subtitleItem}>
        <em>{post.frontmatter.wid}</em>
      </div>
      <div className={zettTDStyle.subtitleItem}>
        <em>Created on: {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
      </div>
      <MDXProvider
        components={{
          a: (props) => <ZettLink {...props} />,
        }}
      >
        <MDXRenderer className='post-single__body'>{post.body}</MDXRenderer>
      </MDXProvider>
      {tagsBlock}
    </div>
  );
};

export default ZettTemplateDetails;
