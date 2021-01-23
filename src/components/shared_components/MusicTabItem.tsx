import { Link } from 'gatsby';
import React from 'react';
const MusicTabItem = ({
  originaUrl,
  originalAuthor,
  children
}: {
  originaUrl: string;
  originalAuthor?: string;
  children?: string;
}) => {
  const originalAuthorPart = originalAuthor ? (
    <p>
      The original author of this tab is <i>{originalAuthor}</i>
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
      <code style={{whiteSpace: 'pre-wrap'}}>{children}</code>
      <hr></hr>
    </div>
  );
};

export default MusicTabItem;
