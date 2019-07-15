import React from "react";
import { ButtonSmallOutlined } from "../common/buttons/ButtonSmallOutlined";
//types
import { ISmallAuthor } from "../../types/author.types";

interface IProps {
  author: ISmallAuthor;
}

const AuthorPreview: React.FC<IProps> = ({
  author
}: IProps): JSX.Element | null => {
  if (!author || !author.full_name) return null;
  return (
    <div className="mb-1">
      <span className="mr-2 small text-secondary">Author:</span>
      <ButtonSmallOutlined
        text={author.full_name}
        internal
        url={`/articles?category=${`/author/${author.uid}`}`}
      />
    </div>
  );
};

export default AuthorPreview;
