import React, { memo } from "react";
export const Loader = memo(() => {
  return (
    <div className="fa-5x my-5 text-center text-center m-auto">
      <i className="fas fa-spinner fa-spin" />
    </div>
  );
});
