import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Sidebar from '../Sidebar';
import ptStyle from './pageTemplate.module.scss';

const PageTemplateDetails = ({ data, location }) => {
  const page = data.mdx;

  return (
    <div>
      <Sidebar location={location} />
      <div className="content">
        <div className="content__inner">
          <div className={ptStyle.page}>
            <h1 className={ptStyle.pageTitle}>{page.frontmatter.title}</h1>
            <MDXRenderer className="post-page__body">{page.body}</MDXRenderer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplateDetails;
