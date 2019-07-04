import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navbar } from "./Navbar";
import { HeadSEO } from "./HeadSEO";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { Link } from "react-router-dom";

const MainLayout = ({ loading, children, error, SEO }) => {
  return (
    <>
      {SEO && <HeadSEO SEO={SEO} />}
      <Navbar />
      <Link to="/author/mateusz-skibicki">
        <button className="btn">good</button>
      </Link>
      <Link to="/author/mateusz-skibicki1">
        <button className="btn">fake</button>
      </Link>
      <Link to="/author/mateusz-skibicki2">
        <button className="btn">fake2</button>
      </Link>
      {loading && <Loader />}
      {error && <h1>ups page doesn't exist</h1>}
      {!error && !loading && children}
      <Footer />
    </>
  );
};

MainLayout.defaultProps = {
  SEO: null,
  loading: false,
  error: false
};

MainLayout.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  SEO: PropTypes.object
};

const mapStateToProps = ({ loading }) => loading;

export default connect(
  mapStateToProps,
  null
)(MainLayout);
