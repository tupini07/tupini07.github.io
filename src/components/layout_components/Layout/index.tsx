import React from 'react';
import '../../../assets/scss/init.scss';
import { Helmet } from 'react-helmet';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Helmet defaultTitle='Blog by John Doe' />
      {children}
    </div>
  );
};

export default Layout;
