import React from "react";
import PropTypes from "prop-types";
import { SingleArticlePreview } from "./SingleArticlePreview";

const ArticlesList = ({ articles }) => {
  console.log(articles);
  return (
    <div className="container">
      <div className="row justify-content-center">
        {articles.map(article => (
          <SingleArticlePreview article={article} key={article.uid} />
        ))}
      </div>
    </div>
  );
};

ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
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
  )
};

export default ArticlesList;
