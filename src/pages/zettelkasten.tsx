import { graphql, Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import ZettLink from '../components/ZettLink';

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
              <ZettLink href='WID:20200716134828488' />
              <div className='page__body'>
                <h3>Recent pages</h3>
                <div className='categories'>
                  <ul className='categories__list'>
                    {zettPages.map(zettP => (
                      <li key={zettP.frontmatter.wid} className='categories__list-item'>
                        <ZettLink href={zettP.frontmatter.wid} /> ({zettP.frontmatter.date})
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
