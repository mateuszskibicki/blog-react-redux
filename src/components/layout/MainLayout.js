import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

// const Navbar = React.lazy(() => import("./Navbar"));
// const Footer = React.lazy(() => import("./Footer"));
// const Loader = React.lazy(() => import("./Loader"));

const MainLayout = ({ loading, children }) => {
  return (
    <>
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
      {!loading && children && children}
      <Footer />
    </>
  );
};

MainLayout.defaultProps = {
  loading: false
};

MainLayout.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = ({ loading }) => loading;

export default connect(
  mapStateToProps,
  null
)(MainLayout);
