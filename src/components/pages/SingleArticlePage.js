// main
import React, { useEffect, Suspense, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// actions
import {
  getArticleByUID,
  setCurrentArticleUID
} from "../../store/actions/article/articleActions";
//components
const HeadSEO = React.lazy(() => import("../layout/HeadSEO"));
const ErrorPage = React.lazy(() => import("../layout/ErrorPage"));

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
        <Suspense fallback={null}>
          <HeadSEO SEO={SEO} />
          <h1>article page</h1>
        </Suspense>
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
