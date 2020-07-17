import { Link } from 'gatsby';
import React from 'react';
import '../../assets/scss/init.scss';
import ZettBacklinks from '../ZettBacklinks';
import zettLayoutStyle from './zettlayout.module.scss';

const ZettLayout = ({ wid, children }) => {
  return (
    <div>
      <div className={zettLayoutStyle.backHomeLink}>
        <Link to='/zettelkasten'>
          <i className='icon-arraow-left' /> Back to Zettelkasten Index
        </Link>
      </div>
      <div className={zettLayoutStyle.layoutContainer}>
        <div className={zettLayoutStyle.zettLeftSidebar}>
          Left sidebar
        </div>
        <div className={zettLayoutStyle.zettMainContainer}>{children}</div>
        <div className={zettLayoutStyle.zettBacklinks}>
          <ZettBacklinks wid={wid} />
        </div>
      </div>
    </div>
  );
};

export default ZettLayout;
