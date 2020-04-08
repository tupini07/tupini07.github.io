import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import Disqus from '../Disqus/Disqus';
import './style.scss';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const PostTemplateDetails = props => {
  const { subtitle, author } = props.data.site.siteMetadata;
  const post = props.data.mdx;
  const tags = post.fields.tagSlugs;
  console.log(JSON.stringify(props));

  const homeBlock = (
    <div>
      <Link className="post-single__home-button" to="/">
        All Articles
      </Link>
    </div>
  );

  const tagsBlock = (
    <div className="post-single__tags">
      <ul className="post-single__tags-list">
        {tags &&
          tags.map((tag, i) => (
            <li className="post-single__tags-list-item" key={tag}>
              <Link to={tag} className="post-single__tags-list-item-link">
                {post.frontmatter.tags[i]}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );

  const commentsBlock = (
    <div>
      <Disqus postNode={post} siteMetadata={props.data.site.siteMetadata} />
    </div>
  );

  return (
    <div>
      {homeBlock}
      <div className="post-single">
        <div className="post-single__inner">
          <h1 className="post-single__title">{post.frontmatter.title}</h1>

          <MDXRenderer className="post-single__body">{post.body}</MDXRenderer>

          <div className="post-single__date">
            <em>Published {moment(post.frontmatter.date).format('D MMM YYYY')}</em>
          </div>
        </div>
        <div className="post-single__footer">
          {tagsBlock}
          <hr />
          <p className="post-single__footer-text">
            {subtitle}
            <a
              href={`https://twitter.com/${author.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <br /> <strong>{author.name}</strong> on Twitter
            </a>
          </p>
          {commentsBlock}
        </div>
      </div>
    </div>
  );
};

export default PostTemplateDetails;
