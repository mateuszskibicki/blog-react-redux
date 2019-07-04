// main
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// actions
import { getAuthorByUidPrismic } from "../../store/actions/author/authorActions";
// components
// import SingleAuthorPage
// const SingleAuthorPage = dynamic(() =>
//   import("../../components/templates/single-author-page/SingleAuthorPage")
// );

const AuthorPage = ({ match, authors, getAuthorByUidPrismic }) => {
  const uid = match.params.uid;

  async function getUserByUID() {
    if (!authors[uid]) {
      await getAuthorByUidPrismic(uid);
    }
  }

  useEffect(() => {
    getUserByUID();
  }, [uid]);
  //   const { authors, userUid } = props;
  //   const error = authors.error;
  //   const SEO =
  //     authors[userUid] && authors[userUid].SEO ? authors[userUid].SEO : null;
  //   const author = authors[userUid] ? authors[userUid] : null;
  return (
    <h1>author page</h1>
    // <MainLayout error={error} SEO={SEO}>
    //   {/* <SingleAuthorPage author={author} /> */}
    // </MainLayout>
  );
};

AuthorPage.propTypes = {
  getAuthorByUidPrismic: PropTypes.func,
  userUid: PropTypes.string,
  authors: PropTypes.object
};

const mapStateToProps = ({ authors }) => ({ authors });
const mapDispatchToProps = { getAuthorByUidPrismic };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
