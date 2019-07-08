import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CategoriesList from "./CategoriesList";
import TagsList from "./TagsList";
import SeriesList from "./SeriesList";
import AuthorPreview from "./AuthorPreview";

export const SingleArticlePreview = ({
  article: {
    uid,
    date,
    series,
    categories,
    short_description,
    tags,
    title,
    small_img,
    author
  }
}) => {
  return (
    <div className="col-12 col-xs-8 col-sm-6 col-md-4 p-0 ">
      <div className="m-2 shadow">
        {small_img && small_img.url && (
          <Link to={`/articles/${uid}`}>
            <img
              src={small_img.url}
              alt={small_img.alt}
              className="img-fluid cursor-pointer"
            />
          </Link>
        )}
        <div className="py-2 px-3">
          {date && <p className="mb-2 text-secondary text-right">{date}</p>}
          {title && (
            <Link to={`/articles/${uid}`}>
              <h4 className="mb-2 cursor-pointer">{title}</h4>
            </Link>
          )}
          {short_description && (
            <p className="mb-2 text-secondary">{short_description}</p>
          )}
          {author && author.uid && <AuthorPreview author={author} small />}
          {categories && <CategoriesList categories={categories} />}
          {series && <SeriesList series={series} />}
          {tags && <TagsList tags={tags} />}
          <div>
            <Link to={`/articles/${uid}`}>
              <button>article link</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

SingleArticlePreview.propTypes = {
  article: PropTypes.shape({
    uid: PropTypes.string,
    date: PropTypes.string,
    series: PropTypes.string,
    short_description: PropTypes.string,
    tags: PropTypes.string,
    categories: PropTypes.string,
    title: PropTypes.string,
    small_img: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string
    }),
    xs_img: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string
    }),
    author: PropTypes.shape({
      full_name: PropTypes.string,
      image_avatar: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      }),
      short_description: PropTypes.string,
      uid: PropTypes.string
    })
  })
};
