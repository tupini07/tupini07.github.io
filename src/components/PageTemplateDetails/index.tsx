import React from 'react';
import './style.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Sidebar from '../Sidebar';

const PageTemplateDetails = ({ data, location }) => {
  const page = data.mdx;

  return (
    <div>
      <Sidebar location={location} />
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
