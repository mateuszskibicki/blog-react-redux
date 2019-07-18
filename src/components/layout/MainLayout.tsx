import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Navbar";
import Footer from "./Footer";
import IconsFloating from "./IconsFloating";
import Loader from "./Loader";

interface IProps {
  loading: boolean;
  children: any;
}

const MainLayout = ({ loading, children }: IProps) => {
  return (
    <>
      <Navbar />
      <IconsFloating />
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
      <Link to="/articles">
        <button className="btn btn-sm btn-info">articles page 1</button>
      </Link>
      <Link to="/articles?page=2">
        <button className="btn btn-sm btn-info">articles page 2</button>
      </Link>
      <Link to="/articles?category=front-end">
        <button className="btn btn-sm btn-info">articles page front-end</button>
      </Link>
      <Link to="/articles?searchText=emmm">
        <button className="btn btn-sm btn-info">articles page front-end</button>
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
