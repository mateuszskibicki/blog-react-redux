import React from "react";
import { Helmet } from "react-helmet";

const ErrorPage = React.memo(() => {
  return (
    <div>
      <Helmet>
        <title>Error title</title>
        <meta name="description" content={"Description error"} />
      </Helmet>
      <h1>error</h1>
    </div>
  );
});

export default ErrorPage;
