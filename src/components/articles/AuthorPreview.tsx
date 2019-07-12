import React from "react";
import { Link } from "react-router-dom";

import { ISmallAuthor } from "../../types/author.types";

interface IProps {
  author: ISmallAuthor;
  small?: boolean;
}

const AuthorPreview: React.FC<IProps> = ({
  author,
  small
}: IProps): JSX.Element => {
  if (small)
    return (
      <div className="row justify-content-center align-items-center my-2 mx-auto">
        {author.image_avatar && (
          <div className="col-3 col-xl-2 text-center p-1">
            <Link to={`/author/${author.uid}`}>
              <img
                src={author.image_avatar.url}
                alt={author.image_avatar.alt ? author.image_avatar.alt : ""}
                className="img-fluid shadow rounded-circle m-auto cursor-pointer"
              />
            </Link>
          </div>
        )}
        <div className="col-9 col-xl-10">
          <p className="mb-0 text-secondary">{author.full_name}</p>
          <Link
            to={`/author/${author.uid}`}
            className="btn btn-sm py-0 px-1 btn-outline-primary rounded-0 shadow-sm mr-2"
          >
            Read more...
          </Link>
        </div>
      </div>
    );

  return (
    <div className="row justify-content-center align-items-center my-3 mx-auto">
      {author.image_avatar && (
        <div className="col-4 col-sm-5 col-md-3 col-xl-2 text-center">
          <Link to={`/author/${author.uid}`}>
            <img
              src={author.image_avatar.url}
              alt={author.image_avatar.alt ? author.image_avatar.alt : ""}
              className="img-fluid shadow rounded-circle m-auto cursor-pointer"
            />
          </Link>
        </div>
      )}
      <div className="col-8 col-sm-7 col-md-9 col-8">
        <p className="small mb-1">WRITTEN BY:</p>
        <h4 className="mb-1">{author.full_name}</h4>
        {!small && (
          <p className="mb-1 text-secondary">{author.short_description}</p>
        )}
        <Link to={`/author/${author.uid}`}>link</Link>
      </div>
    </div>
  );
};

export default AuthorPreview;
