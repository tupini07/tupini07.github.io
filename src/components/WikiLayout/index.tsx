import React from 'react';
import Helmet from 'react-helmet';
import '../../assets/scss/init.scss';
import wikiLayoutStyle from './wikilayout.module.scss';
import WikiBacklinks from '../WikiBacklinks';
import { Link } from 'gatsby';

const WikiLayout = ({ wid, children }) => {
  return (
    <div>
      <div className={wikiLayoutStyle.backHomeLink}>
        <Link to='/wiki'>
          <i className='icon-arraow-left'></i> Back to Wiki Index
        </Link>
      </div>
      <div className={wikiLayoutStyle.layoutContainer}>
        <div className={wikiLayoutStyle.wikiLeftSidebar}></div>
        <div className={wikiLayoutStyle.wikiMainContainer}>{children}</div>
        <div className={wikiLayoutStyle.wikiBacklinks}>
          <WikiBacklinks wid={wid} />
        </div>
      </div>
    </div>
  );
};

export default WikiLayout;
