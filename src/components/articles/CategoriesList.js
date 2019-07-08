import React from "react";
import PropTypes from "prop-types";

const CategoriesList = ({ categories }) => {
  return (
    <div className="mb-2">
      <span className="mr-2 small text-secondary">Categories:</span>
      {categories.split(";").map((singleCategory, index) => {
        if (!singleCategory || singleCategory.trim().length === 0) return "";
        return (
          <button
            type="button"
            className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
            key={index}
          >
            {singleCategory}
          </button>
        );
      })}
    </div>
  );
};

CategoriesList.propTypes = {
  categories: PropTypes.string
};

export default CategoriesList;
