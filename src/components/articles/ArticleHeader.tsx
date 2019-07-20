import React from "react";
import CategoriesList from "./CategoriesList";
import TagsList from "./TagsList";
//import SeriesList from "./SeriesList";
import AuthorPreview from "./AuthorPreview";

import { IArticleHeader } from "../../types/article.types";

const ArticleHeader: React.FC<IArticleHeader> = ({
  title,
  short_description,
  //series,
  categories,
  tags,
  date,
  big_img,
  author
}: IArticleHeader): JSX.Element => (
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
    <div className="container my-3 mx-auto">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 my-2 mx-auto">
          {title && <h2 className="mb-2">{title}</h2>}
          {date && <p className="text-secondary mb-2">{date}</p>}
          {short_description && (
            <p className="text-secondary mb-2">{short_description}</p>
          )}
          <div>
            {categories && <CategoriesList categories={categories} />}
            {/* {series && <SeriesList series={series} />} */}
            {tags && <TagsList tags={tags} />}
          </div>
          {author && <AuthorPreview author={author} />}
        </div>
        {big_img && big_img.url && big_img.alt && (
          <div className="d-none d-lg-block col-lg-6">
            <img
              src={big_img.url}
              className="img-fluid my-3 shadow rounded"
              alt={big_img.alt}
            />
          </div>
        )}
      </div>
    </div>
  </>
);

export default ArticleHeader;
