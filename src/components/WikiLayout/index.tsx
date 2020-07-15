import React from 'react';
import Helmet from 'react-helmet';
import '../../assets/scss/init.scss';
import wikiLayoutStyle from './wikilayout.module.scss';
import WikiBacklinks from '../WikiBacklinks';

const WikiLayout = ({ wid, children }) => {
  return (
    <div className={wikiLayoutStyle.layoutContainer}>
      <div className={wikiLayoutStyle.wikiLeftSidebar}></div>
      <div className={wikiLayoutStyle.wikiMainContainer}>{children}</div>
      <div className={wikiLayoutStyle.wikiBacklinks}>
        <WikiBacklinks wid={wid} />
      </div>
    </div>
  );
};

export default WikiLayout;
