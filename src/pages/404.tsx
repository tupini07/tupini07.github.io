import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout_components/Layout';
import Sidebar from '../components/shared_components/Sidebar';

const NotFoundRoute = ({ location }) => {
  return (
    <Layout>
      <div>
        <Sidebar location={location} />
        <div className='content'>
          <div className='content__inner'>
            <div className='page'>
              <h1 className='page__title'>NOT FOUND</h1>
              <div className='page__body'>
                <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundRoute;
