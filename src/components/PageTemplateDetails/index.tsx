import React from 'react';
import Sidebar from '../Sidebar';
import './style.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const PageTemplateDetails = props => {
  const page = props.data.mdx;

  return (
    <div>
      <Sidebar {...props} />
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">{page.frontmatter.title}</h1>
            <MDXRenderer className="post-page__body">{page.body}</MDXRenderer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplateDetails;
