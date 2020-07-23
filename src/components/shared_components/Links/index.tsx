import React from 'react';
import linkStyle from './links.module.scss';
import '../../../assets/fonts/fontello-771c82e0/css/fontello.css';

const Links = ({ data: author }) => {
  const links = {
    telegram: [author.telegram],
    twitter: [author.twitter],
    github: [author.github],
    vk: [author.vk],
    rss: [author.rss],
    email: [author.email]
  };

  const twitterElement = author.twitter ? (
    <li className={linkStyle.linksListItem}>
      <a
        href={`https://www.twitter.com/${links.twitter}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <i className='icon-twitter' />
      </a>
    </li>
  ) : (
    ''
  );

  const githubElement = author.github ? (
    <li className={linkStyle.linksListItem}>
      <a href={`https://www.github.com/${links.github}`} target='_blank' rel='noopener noreferrer'>
        <i className='icon-github' />
      </a>
    </li>
  ) : (
    ''
  );

  const vkElement = author.vk ? (
    <li className={linkStyle.linksListItem}>
      <a href={`https://www.vk.com/${links.vk}`} target='_blank' rel='noopener noreferrer'>
        <i className='icon-vkontakte' />
      </a>
    </li>
  ) : (
    ''
  );

  const emailElement = author.email ? (
    <li className={linkStyle.linksListItem}>
      <a href={`mailto:${links.email}`}>
        <i className='icon-mail' />
      </a>
    </li>
  ) : (
    ''
  );

  const telegramElement = author.telegram ? (
    <li className={linkStyle.linksListItem}>
      <a href={`telegram:${links.telegram}`}>
        <i className='icon-paper-plane' />
      </a>
    </li>
  ) : (
    ''
  );

  const rssElement = author.rss ? (
    <li className={linkStyle.linksListItem}>
      <a href={`${links.rss}`}>
        <i className='icon-rss' />
      </a>
    </li>
  ) : (
    ''
  );

  return (
    <div className={linkStyle.links}>
      <ul className={linkStyle.linksList}>
        {twitterElement}
        {githubElement}
        {vkElement}
      </ul>
      <ul className={linkStyle.linksList}>
        {emailElement}
        {telegramElement}
      </ul>
      <ul className={linkStyle.linksList}>{rssElement}</ul>
    </div>
  );
};

export default Links;
