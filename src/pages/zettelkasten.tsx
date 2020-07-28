import { graphql, Link } from 'gatsby';
import React from 'react';
import Layout from '../components/layout_components/Layout';
import Sidebar from '../components/shared_components/Sidebar';
import ZettLink from '../components/shared_components/ZettLink';
import moment from 'moment';
import { Helmet } from 'react-helmet';

const zettelkastenRoute = ({ data, location }) => {
  const { title } = data.site.siteMetadata;
  const zettPages: Array<any> = data.allMdx.nodes;
  return (
    <Layout>
      <div>
        <Helmet title={`Zettelkasten - ${title}`} />
        <Sidebar location={location} />
        <div className='content'>
          <div className='content__inner'>
            <div className='page'>
              <h1 className='page__title'>Zettelkasten</h1>
              <div>
                {/* Need to change this to be nicer */}
                <Link to='/zettelkasten-broken-links'>Broken Links</Link>
              </div>
              <ZettLink href='WID:index' />
              <div className='page__body'>
                <h3>Recent pages</h3>
                <div className='categories'>
                  <ul className='categories__list'>
                    {zettPages.map(zettP => (
                      <li key={zettP.frontmatter.wid} className='categories__list-item'>
                        <ZettLink href={zettP.frontmatter.wid} /> (Last modified: {moment(zettP.frontmatter.date).format('D MMM YYYY')})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default zettelkastenRoute;

export const pageQuery = graphql`
  query Zettelkasten {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 10
      filter: { frontmatter: { layout: { eq: "zettelkasten" }, draft: { ne: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          wid
          title
          date
        }
      }
    }
  }
`;
