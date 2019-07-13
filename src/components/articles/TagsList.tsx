import React from "react";

const TagsList: React.FC<{ tags: string }> = ({
  tags
}: {
  tags: string;
}): JSX.Element | null => {
  if (!tags) return null;
  return (
    <div className="mb-3">
      <span className="mr-2 small text-secondary">Tags:</span>
      {tags.split(";").map(
        (singleTag: string, index: number): JSX.Element | null => {
          if (!singleTag || singleTag.trim().length === 0) return null;
          return (
            <button
              type="button"
              className="btn btn-sm py-0 px-1 btn-outline-secondary rounded-0 shadow-sm mr-2"
              key={index}
            >
              {singleTag}
            </button>
          );
        }
      )}
    </div>
  );
};

export default TagsList;
