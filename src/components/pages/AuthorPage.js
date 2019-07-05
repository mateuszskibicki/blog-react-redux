// main
import React, { useEffect, Suspense, memo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// actions
import { getAuthorByUidPrismic } from "../../store/actions/author/authorActions";
//components
const HeadSEO = React.lazy(() => import("../layout/HeadSEO"));
const ErrorPage = React.lazy(() => import("../layout/ErrorPage"));

const AuthorPage = memo(
  ({ match, authors, getAuthorByUidPrismic }) => {
    const uid = match.params.uid;

    async function getUserByUID() {
      if (!authors[uid]) {
        await getAuthorByUidPrismic(uid);
      }
    }

    useEffect(() => {
      getUserByUID();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    const error = authors[uid] && authors[uid].error ? true : null;
    const SEO = authors[uid] && authors[uid].SEO ? authors[uid].SEO : null;
    const author = authors[uid] ? authors[uid] : null;

    if (error)
      return (
        <Suspense fallback={null}>
          <ErrorPage />
        </Suspense>
      );

    if (author)
      return (
        <Suspense fallback={null}>
          <HeadSEO SEO={SEO} />
          <h1>author page</h1>
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

AuthorPage.propTypes = {
  getAuthorByUidPrismic: PropTypes.func,
  match: PropTypes.object,
  authors: PropTypes.object
};

const mapStateToProps = ({ authors }) => ({ authors });
const mapDispatchToProps = { getAuthorByUidPrismic };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
