import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

const ZettLastEdited = ({ wid }: { wid: string }) => {
  // TODO add files here
  const data = useStaticQuery(graphql`
    query GitFileEdits {
      allGitCommit {
        nodes {
          author {
            email
            name
          }
          hash
          date(locale: "UTC")
          message
        }
      }
    }
  `);

  return <div>Not implemented! RAW data: {JSON.stringify(data)} </div>;
};

export default ZettLastEdited;
