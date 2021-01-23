import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';
import Sidebar from '../../shared_components/Sidebar';
import ptStyle from './pageTemplate.module.scss';
import MusicTabItem from '../../shared_components/MusicTabItem';

const PageTemplateDetails = ({ data, location }) => {
  const page = data.mdx;

  const shortcodes = {
    MusicTabItem
  };

  return (
    <div>
      <Sidebar location={location} />
      <div className='content'>
        <div className='content__inner'>
          <div className={ptStyle.page}>
            <h1 className={ptStyle.pageTitle}>{page.frontmatter.title}</h1>
            <MDXProvider components={shortcodes}>
              <MDXRenderer className='post-page__body'>{page.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTemplateDetails;
