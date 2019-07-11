// main
import React, { useEffect, Suspense, memo } from "react";
import { connect } from "react-redux";
// actions
import { getAuthorByUidPrismic } from "../../store/actions/author/authorActions";
//types
import { ISEO, IAction } from "../../types/common.types";
import { IAuthorSingle } from "../../types/author.types";
//components
const HeadSEO: React.FunctionComponent<{ SEO: ISEO | null }> = React.lazy(
  (): Promise<any> => import("../layout/HeadSEO")
);
const ErrorPage: React.StatelessComponent = React.lazy(
  (): Promise<any> => import("../layout/ErrorPage")
);

type Props = {
  match: any;
  authors: any | null;
  getAuthorByUidPrismic: (uid: string) => IAction;
};

const AuthorPage: React.FunctionComponent<Props> = memo(
  ({ match, authors, getAuthorByUidPrismic }): JSX.Element | null => {
    //uid
    const uid: string = match.params.uid;

    async function getUserByUID(): Promise<any> {
      if (!authors[uid]) {
        await getAuthorByUidPrismic(uid);
      }
    }

    useEffect((): void => {
      getUserByUID();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    const error: boolean | null =
      authors[uid] && authors[uid].error ? true : null;
    const SEO: ISEO | null =
      authors[uid] && authors[uid].SEO ? authors[uid].SEO : null;
    const author: IAuthorSingle | null = authors[uid] ? authors[uid] : null;

    if (error)
      return (
        <Suspense fallback={null}>
          <ErrorPage />
        </Suspense>
      );

    if (author)
      return (
        <Suspense fallback={null}>
          <HeadSEO SEO={SEO} />
          <h1>author page</h1>
        </Suspense>
      );

    return null;
  },
  //memo
  (prevProps, nextProps): boolean => {
    const prevUID = prevProps.match.params.uid;
    const nextUID = nextProps.match.params.uid;
    if (prevUID === nextUID) {
      return true;
    }
    return false;
  }
);

const mapStateToProps = (state: any): any => ({
  authors: state.authors
});
const mapDispatchToProps: {
  getAuthorByUidPrismic: typeof getAuthorByUidPrismic;
} = { getAuthorByUidPrismic };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
