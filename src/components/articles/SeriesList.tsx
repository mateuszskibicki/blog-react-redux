import React from "react";

interface IProps {
  series: string;
}

const SeriesList: React.FC<IProps> = ({
  series
}: IProps): JSX.Element | null => {
  if (!series) return null;
  return (
    <div className="mb-2">
      <span className="mr-2 small text-secondary">Series:</span>
      {series.split(";").map(
        (singleSeries: string, index: number): JSX.Element | null => {
          if (!singleSeries || singleSeries.trim().length === 0) return null;
          return (
            <button
              type="button"
              className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
              key={index}
            >
              {singleSeries}
            </button>
          );
        }
      )}
    </div>
  );
};

export default SeriesList;
