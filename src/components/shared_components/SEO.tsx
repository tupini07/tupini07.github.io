import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { SeoQuery } from '../../graphql';
const SEO = ({
  title,
  description,
  image,
  article
}: {
  title?: string;
  description?: string;
  image?: string;
  article: boolean;
}) => {
  const { pathname } = useLocation();

  const { siteMetadata } = (useStaticQuery(query) as SeoQuery).site;
  const { defaultTitle, defaultDescription, siteUrl, defaultImage } = siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`
  };

  return (
    <Helmet title={seo.title}>
      <meta name='description' content={seo.description} />
      {seo.image && <meta name='image' content={seo.image} />}
      {seo.url && <meta property='og:url' content={seo.url} />}
      {(article ? true : null) && <meta property='og:type' content='article' />}
      {seo.title && <meta property='og:title' content={seo.title} />}
      {seo.description && <meta property='og:description' content={seo.description} />}
      {seo.image && <meta property='og:image' content={seo.image} />}
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
        defaultImage: image
      }
    }
  }
`;
