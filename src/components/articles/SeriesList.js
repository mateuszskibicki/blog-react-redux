import React from "react";
import PropTypes from "prop-types";

const SeriesList = ({ series }) => {
  return (
    <div className="mb-2">
      <span className="mr-2 small text-secondary">Series:</span>
      {series.split(";").map((singleSeries, index) => {
        if (!singleSeries || singleSeries.trim().length === 0) return "";
        return (
          <button
            type="button"
            className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
            key={index}
          >
            {singleSeries}
          </button>
        );
      })}
    </div>
  );
};

SeriesList.propTypes = {
  series: PropTypes.string
};

export default SeriesList;
