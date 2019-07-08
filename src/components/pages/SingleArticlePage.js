// main
import React, { useEffect, Suspense, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// actions
import {
  getArticleByUID,
  setCurrentArticleUID
} from "../../store/actions/article/articleActions";
import { sliceComponentsHelper } from "../../helpers/slice-helpers/SliceComponentsHelpers";
//components
import HeadSEO from "../layout/HeadSEO";
const ErrorPage = React.lazy(() => import("../layout/ErrorPage"));
const ArticleHeader = React.lazy(() => import("../articles/ArticleHeader"));
const ArticlesList = React.lazy(() => import("../articles/ArticlesList"));

const SingleArticlePage = memo(
  ({ match, article, getArticleByUID }) => {
    const uid = match.params.uid;

    async function getSingleArticleByUID() {
      await setCurrentArticleUID({ articleUID: uid });
      if (!article[uid]) {
        await getArticleByUID({ articleUID: uid });
      }
    }

    useEffect(() => {
      getSingleArticleByUID();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    const error = article[uid] && article[uid].error ? true : null;
    const SEO = article[uid] && article[uid].SEO ? article[uid].SEO : null;
    const articleData = article[uid] ? article[uid] : null;

    if (error)
      return (
        <Suspense fallback={null}>
          <ErrorPage />
        </Suspense>
      );

    if (articleData)
      return (
        <>
          <HeadSEO SEO={SEO} />
          <ArticleHeader
            title={articleData.title}
            short_description={articleData.short_description}
            series={articleData.series}
            categories={articleData.categories}
            tags={articleData.tags}
            date={articleData.date}
            author={articleData.author}
            big_img={articleData.big_img}
          />
          {articleData.content &&
            articleData.content.length > 0 &&
            sliceComponentsHelper(articleData.content)}
          {article.lastArticles && article.lastArticles.length > 0 && (
            <Suspense fallback={null}>
              <ArticlesList articles={article.lastArticles} />
            </Suspense>
          )}
        </>
      );

    return null;
  },
  //memo
  (prevProps, nextProps) => {
    const prevUID = prevProps.match.params.uid;
    const nextUID = nextProps.match.params.uid;
    if (prevUID === nextUID) {
      return true;
    }
    return false;
  }
);

SingleArticlePage.propTypes = {
  getArticleByUID: PropTypes.func,
  match: PropTypes.object,
  article: PropTypes.object
};

const mapStateToProps = ({ article }) => ({ article });
const mapDispatchToProps = { getArticleByUID };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticlePage);
