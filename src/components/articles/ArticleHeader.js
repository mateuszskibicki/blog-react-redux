import React from "react";
import PropTypes from "prop-types";
import CategoriesList from "./CategoriesList";
import TagsList from "./TagsList";
import SeriesList from "./SeriesList";
import AuthorPreview from "./AuthorPreview";

const ArticleHeader = ({
  title,
  short_description,
  series,
  categories,
  tags,
  date,
  big_img,
  author
}) => (
  <>
    {big_img && (
      <div className="container-fluid p-0 m-0 d-block d-lg-none">
        <div className="col-12 m-0 p-0">
          <div
            style={{
              height: "320px",
              background: `url(${big_img.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        </div>
      </div>
    )}
    <div
      className="container-fluid my-3 mx-auto"
      style={{ maxWidth: "1400px" }}
    >
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 my-2 mx-auto">
          {title && <h2 className="mb-2">{title}</h2>}
          {date && <p className="text-secondary mb-2">{date}</p>}
          {short_description && (
            <p className="text-secondary mb-2">{short_description}</p>
          )}
          <div>
            {categories && <CategoriesList categories={categories} />}
            {series && <SeriesList series={series} />}
            {tags && <TagsList tags={tags} />}
          </div>
          {author && <AuthorPreview author={author} />}
        </div>
        {big_img && big_img.url && big_img.alt && (
          <div className="d-none d-lg-block col-lg-6">
            <img
              src={big_img.url}
              className="img-fluid my-3 shadow"
              alt={big_img.alt}
            />
          </div>
        )}
      </div>
    </div>
  </>
);

ArticleHeader.propTypes = {
  title: PropTypes.string,
  short_description: PropTypes.string,
  series: PropTypes.string,
  categories: PropTypes.string,
  tags: PropTypes.string,
  date: PropTypes.string,
  big_img: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string
  }),
  author: PropTypes.shape({
    uid: PropTypes.string,
    full_name: PropTypes.string,
    short_description: PropTypes.string,
    image_avatar: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string
    })
  })
};

export default ArticleHeader;
