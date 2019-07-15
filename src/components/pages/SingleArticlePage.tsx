// main
import React, { useEffect, Suspense, memo } from "react";
import { connect } from "react-redux";
// actions
import {
  getArticleByUID,
  setCurrentArticleUID
} from "../../store/actions/article/articleActions";
import { sliceComponentsHelper } from "../../helpers/slice-helpers/SliceComponentsHelpers";
//types
import { ISEO } from "../../types/common.types";
import {
  IArticleHeader,
  ISingleArticlePage,
  ISingleArticle
} from "../../types/article.types";
//components
import Loader from "../layout/Loader";
const HeadSEO: React.LazyExoticComponent<
  React.FunctionComponent<{
    SEO: ISEO;
  }>
> = React.lazy(() => import("../layout/HeadSEO"));
const ErrorPage: React.FunctionComponent<{}> = React.lazy(() =>
  import("../layout/ErrorPage")
);
const ArticleHeader: React.FunctionComponent<IArticleHeader> = React.lazy(() =>
  import("../articles/ArticleHeader")
);
const ArticlesList: React.FunctionComponent<{
  articles: ISingleArticle[];
}> = React.lazy(() => import("../articles/ArticlesList"));

interface IProps {
  match: any;
  article: any;
  getArticleByUID: Function;
}

const SingleArticlePage: React.FunctionComponent<IProps> = memo(
  ({ match, article, getArticleByUID }: IProps): JSX.Element | null => {
    const uid: string = match.params.uid;

    async function getSingleArticleByUID(): Promise<any> {
      await setCurrentArticleUID({ articleUID: uid });
      if (!article[uid]) {
        await getArticleByUID({ articleUID: uid });
      }
    }

    useEffect((): void => {
      getSingleArticleByUID();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    const error: boolean | null =
      article[uid] && article[uid].error ? true : null;
    const SEO: ISEO =
      article[uid] && article[uid].SEO ? article[uid].SEO : null;
    const articleData: ISingleArticlePage = article[uid] ? article[uid] : null;

    if (error)
      return (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      );

    if (articleData)
      return (
        <>
          <HeadSEO SEO={SEO} />
          <Suspense fallback={<Loader />}>
            <ArticleHeader
              title={articleData.title}
              short_description={articleData.short_description}
              series={articleData.series}
              categories={articleData.categories}
              tags={articleData.tags}
              date={articleData.date}
              author={articleData.author}
              big_img={articleData.big_img}
            />
            {articleData.content &&
              articleData.content.length > 0 &&
              sliceComponentsHelper(articleData.content)}
            {article.lastArticles && article.lastArticles.length > 0 && (
              <>
                <hr />
                <div className="container text-center m-auto">
                  <h1>Last 3 articles:</h1>
                </div>
                <ArticlesList articles={article.lastArticles} />
              </>
            )}
          </Suspense>
        </>
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

const mapStateToProps = ({ article }: { article: any }) => ({ article });
const mapDispatchToProps: { getArticleByUID: Function } = { getArticleByUID };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArticlePage);
