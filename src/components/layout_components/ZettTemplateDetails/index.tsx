import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import moment from 'moment';
import React from 'react';
import ZettLink from '../../shared_components/ZettLink';
import zettTDStyle from './zetttemplatedetails.module.scss';
import { ZettPagesQuery } from '../../../graphql';

const ZettTemplateDetails = ({ data }: { data: ZettPagesQuery }) => {
  const post = data.mdx;
  const tags = post.fields.tagSlugs;

  const tagsBlock = (
    <div className='post-single__tags'>
      <ul className='post-single__tags-list'>
        {tags &&
          tags.map((tag, i) => (
            <li className='post-single__tags-list-item' key={tag}>
              <Link to={tag} className='post-single__tags-list-item-link'>
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );

  const wikiLinkBlock = (
    <div className={zettTDStyle.subtitleItem}>
      {post.frontmatter.wikipedia_link ? (
        <span>
          <ZettLink href={post.frontmatter.wikipedia_link}>Wikipedia Link</ZettLink>
        </span>
      ) : (
        ''
      )}
    </div>
  );

  const wikidataLinkBlock = (
    <div className={zettTDStyle.subtitleItem}>
      {post.frontmatter.wikidata_entity ? (
        <span>
          Wikidata:{' '}
          <ZettLink href={'https://www.wikidata.org/wiki/' + post.frontmatter.wikidata_entity}>
            {post.frontmatter.wikidata_entity}
          </ZettLink>
        </span>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <div>
      <h1 className={zettTDStyle.title}>{post.frontmatter.title}</h1>
      <div className={zettTDStyle.subtitleItem}>
        <em>{post.frontmatter.wid}</em>
      </div>
      <div className={zettTDStyle.subtitleItem}>
        <em>Last modified: {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
      </div>
      {wikidataLinkBlock}
      {wikiLinkBlock}
      <MDXProvider
        components={{
          a: props => <ZettLink {...props} />
        }}
      >
        <MDXRenderer className='post-single__body'>{post.body}</MDXRenderer>
      </MDXProvider>
      {tagsBlock}
    </div>
  );
};

export default ZettTemplateDetails;
