import React from "react";
import { Link } from "react-router-dom";

import { ISmallAuthor } from "../../types/author.types";

interface IProps {
  author: ISmallAuthor;
}

const AuthorPreview: React.FC<IProps> = ({
  author
}: IProps): JSX.Element | null => {
  if (!author) return null;
  return (
    <div className="mb-1">
      <span className="mr-2 small text-secondary">Author:</span>
      <Link to={`/author/${author.uid}`}>
        <button
          type="button"
          className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
        >
          {author.full_name}
        </button>
      </Link>
    </div>
  );
};

export default AuthorPreview;
