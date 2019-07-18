import React from "react";
//@ts-ignore
import { Helmet } from "react-helmet";

const ErrorPage: React.MemoExoticComponent<() => JSX.Element> = React.memo(
  () => {
    return (
      <>
        <Helmet>
          <title>Coffee4Code - 404</title>
          <meta
            name="description"
            content={"404 page - Coffee4Code - Page doesn't exist."}
          />
        </Helmet>
        <div className="container">
          <h1 className="display-4 text-center">ERROR #404</h1>
        </div>
      </>
    );
  }
);

export default ErrorPage;
