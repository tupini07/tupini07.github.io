import { graphql, Link, useStaticQuery } from 'gatsby';
import lodash from 'lodash';
import React from 'react';
import { SidebarInformationQuery } from '../../../graphql';
import Links from '../Links';
import Menu from '../Menu';
import './style.scss';

const Sidebar = ({ location }) => {
  const data: SidebarInformationQuery = useStaticQuery(graphql`
    query sidebarInformation {
      site {
        siteMetadata {
          title
          subtitle
          copyright
          menu {
            label
            path
          }
          author {
            name
            email
            telegram
            twitter
            github
            rss
            vk
          }
        }
      }
    }
  `);

  const { title, author, subtitle, copyright, menu } = data.site.siteMetadata;
  const isHomePage = lodash.get(location, 'pathname', '/') === '/';

  /* eslint-disable jsx-a11y/img-redundant-alt */
  const authorBlock = (
    <div>
      {/* <Link to="/">
        <img
          src={profilePic}
          className="sidebar__author-photo"
          width="75"
          height="75"
          alt={author.name}
        />
      </Link> */}
      {isHomePage ? (
        <h1 className='sidebar__author-title'>
          <Link className='sidebar__author-title-link' to='/'>
            {title}
          </Link>
        </h1>
      ) : (
        <h2 className='sidebar__author-title'>
          <Link className='sidebar__author-title-link' to='/'>
            {title}
          </Link>
        </h2>
      )}
      {/* <p className='sidebar__author-subtitle'>{subtitle}</p> */}
      <hr style={{margin: 0, width: "100%", border: 0}} />
    </div>
  );
  /* eslint-enable jsx-a11y/img-redundant-alt */

  return (
    <div className='sidebar'>
      <div className='sidebar__inner'>
        <div className='sidebar__author'>{authorBlock}</div>
        <div>
          <Menu data={menu} />
          <br />
          <Links data={author} />
          <hr style={{margin: 0, width: "100%", border: 0}} />
          <p className='sidebar__copyright'>{copyright}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
