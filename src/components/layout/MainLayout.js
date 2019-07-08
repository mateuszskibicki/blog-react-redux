import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = React.lazy(() => import("./Navbar"));
const Footer = React.lazy(() => import("./Footer"));
const Loader = React.lazy(() => import("./Loader"));

const MainLayout = ({ loading, children }) => {
  return (
    <Suspense fallback="">
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
    </Suspense>
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
