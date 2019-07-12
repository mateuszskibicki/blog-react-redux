import React from "react";

interface IProps {
  categories: string;
}

const CategoriesList: React.FC<IProps> = ({
  categories
}: IProps): JSX.Element | null => {
  if (!categories) return null;
  return (
    <div className="mb-2">
      <span className="mr-2 small text-secondary">Categories:</span>
      {categories.split(";").map(
        (singleCategory: string, index: number): JSX.Element | null => {
          if (!singleCategory || singleCategory.trim().length === 0)
            return null;
          return (
            <button
              type="button"
              className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
              key={index}
            >
              {singleCategory}
            </button>
          );
        }
      )}
    </div>
  );
};

export default CategoriesList;
