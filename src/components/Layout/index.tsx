import React from 'react';
import Helmet from 'react-helmet';
import '../../assets/scss/init.scss';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Helmet defaultTitle='Blog by John Doe' />
      {children}
    </div>
  );
};

export default Layout;
