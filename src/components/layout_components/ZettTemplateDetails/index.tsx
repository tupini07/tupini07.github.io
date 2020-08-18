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

  const wikidataLinkBlock = (
    <span>
      {post.frontmatter.wikidata_entity ? (
      <span className={zettTDStyle.subtitleItem}>(
          QID:{' '}
          <ZettLink href={'https://www.wikidata.org/wiki/' + post.frontmatter.wikidata_entity}>
            {post.frontmatter.wikidata_entity}
          </ZettLink>
        )
        </span>
      ) : (
        ''
      )}
    </span>
  );

  const wikiLinkBlock = (
    <div className={zettTDStyle.subtitleItem}>
      {post.frontmatter.wikipedia_link ? (
        <span>
          <ZettLink href={post.frontmatter.wikipedia_link}>Wikipedia Link</ZettLink> {wikidataLinkBlock}
        </span>
      ) : (
        ''
      )}
    </div>
  );

  const externalLinkBlock = (
    <div className={zettTDStyle.subtitleItem}>
      {post.frontmatter.external_reference ? (
        <span>
          Home:{' '}
          <ZettLink href={post.frontmatter.external_reference}>
            {post.frontmatter.external_reference}
          </ZettLink>
        </span>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <div>
      <h1 className={zettTDStyle.title}>
        {post.frontmatter.title}
        <em className={zettTDStyle.subtitleItem}> ({post.frontmatter.wid})</em>
      </h1>
      <div className={`${zettTDStyle.subtitleItem} ${zettTDStyle.modifiedDate}`}>
        <em>Last modified: {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
      </div>
      {wikiLinkBlock}
      {externalLinkBlock}
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
