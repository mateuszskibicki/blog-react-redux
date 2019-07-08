import React from "react";
import PropTypes from "prop-types";

const TagsList = ({ tags }) => {
  return (
    <div className="mb-2">
      <span className="mr-2 small text-secondary">Tags:</span>
      {tags.split(";").map((singleTag, index) => {
        if (!singleTag || singleTag.trim().length === 0) return "";
        return (
          <button
            type="button"
            className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
            key={index}
          >
            {singleTag}
          </button>
        );
      })}
    </div>
  );
};

TagsList.propTypes = {
  tags: PropTypes.string
};

export default TagsList;
