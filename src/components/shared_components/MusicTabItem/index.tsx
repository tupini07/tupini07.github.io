import { Link } from 'gatsby';
import React from 'react';
import musicTabItemStyle from './musicTabItem.module.scss';

const MusicTabItem = ({
  originaUrl,
  originalAuthor,
  originalAuthorLink,
  children
}: {
  originaUrl: string;
  originalAuthor?: string;
  originalAuthorLink?: string;
  children?: string;
}) => {
  const originalAuthorPart = originalAuthor ? (
    <p>
      The original author of this tab is{' '}
      {originalAuthorLink ? (
        <Link to={originalAuthorLink} target='_blank'>
          {originalAuthor}
        </Link>
      ) : (
        <i>{originalAuthor}</i>
      )}
    </p>
  ) : (
    ''
  );

  return (
    <div>
      <p>
        This tab is not my work. The original can be found{' '}
        <Link to={originaUrl} target='_blank'>
          here
        </Link>
        .
      </p>

      {originalAuthorPart}

      <hr></hr>
      <div className='gatsby-highlight' data-language='text'>
        <pre className='language-text'>
          <code className='language-text'>{children}</code>
        </pre>
      </div>

      <hr></hr>
    </div>
  );
};

export default MusicTabItem;
