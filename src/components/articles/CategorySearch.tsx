import React from "react";

interface IProps {
  searchText: string | null;
  category: string | null;
}

const CategorySearch = ({ searchText, category }: IProps) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {searchText && <p className="lead">Results for: {searchText}</p>}
          {category && <p className="lead">Category: {category}</p>}
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;
