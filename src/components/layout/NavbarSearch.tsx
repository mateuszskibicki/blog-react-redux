import React from "react";
import { connect } from "react-redux";
import {
  setSearchText,
  getArticlesBySearchText
} from "../../store/actions/search/searchActions";

const NavbarSearch: any = ({
  searchText,
  getArticlesBySearchText,
  setSearchText
}: any) => {
  const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchText(value);
    if (
      value &&
      value.trim().length > 0 &&
      value !== searchText &&
      getArticlesBySearchText
    ) {
      getArticlesBySearchText({ searchText: value });
    }
  };

  return (
    <div className="navbar__search d-flex flex-row align-items-center">
      <input
        type="text"
        className="shadow"
        onChange={onChangeSearchText}
        value={searchText}
        placeholder={"Find..."}
      />
      {/* <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="search"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="svg-inline--fa fa-search fa-w-16 ml-3"
      >
        <path
          fill="currentColor"
          d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          className=""
        />
      </svg> */}
    </div>
  );
};

const mapStateToProps = ({ search }: any) => search;
const mapDispatchToProps = { setSearchText, getArticlesBySearchText };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarSearch);
