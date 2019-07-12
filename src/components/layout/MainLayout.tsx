import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";

interface IProps {
  loading: boolean;
  children: any;
}

const MainLayout = ({ loading, children }: IProps) => {
  return (
    <>
      <Navbar />
      <Link to="/author/mateusz-skibicki">
        <button className="btn">user: good</button>
      </Link>
      <Link to="/author/mateusz-skibicki1">
        <button className="btn">user: fake</button>
      </Link>
      <Link to="/author/mateusz-skibicki2">
        <button className="btn">user: fake2</button>
      </Link>
      <Link to="/articles/99">
        <button className="btn">article: good</button>
      </Link>
      <Link to="/articles/dummy12312313">
        <button className="btn">article: fake</button>
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

const mapStateToProps = ({ loading }: { loading: boolean }) => loading;

export default connect(
  mapStateToProps,
  null
)(MainLayout);
