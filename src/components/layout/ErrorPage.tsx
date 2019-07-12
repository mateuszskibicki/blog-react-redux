import React from "react";
//@ts-ignore
import { Helmet } from "react-helmet";

const ErrorPage: React.MemoExoticComponent<() => JSX.Element> = React.memo(
  () => {
    return (
      <div>
        <Helmet>
          <title>Error title</title>
          <meta name="description" content={"Description error"} />
        </Helmet>
        <h1>error</h1>
      </div>
    );
  }
);

export default ErrorPage;
