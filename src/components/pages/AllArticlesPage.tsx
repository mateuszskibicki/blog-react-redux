// main
import React, { useEffect, Suspense, memo } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
// actions
import {
  getAllArticles,
  setArticlesErrorToFalse
} from "../../store/actions/articles/articlesActions";
//types
import { ISEO } from "../../types/common.types";
import { IArticlesPage, ISingleArticle } from "../../types/article.types";
// components
import Loader from "../layout/Loader";
const HeadSEO: React.FunctionComponent<{ SEO: ISEO | null }> = React.lazy(
  (): Promise<any> => import("../layout/HeadSEO")
);
const ErrorPage: React.FunctionComponent<{}> = React.lazy(() =>
  import("../layout/ErrorPage")
);

// const ArticlesPage = dynamic(() =>
//   import("../../components/templates/articles-page/ArticlesPage")
// );

type IProps = {
  location: any;
  articles: IArticlesPage;
  getAllArticles: any;
};

interface IParsed {
  page: string;
  category: string | null;
  searchText: string | null;
}

const AllArticlesPage: React.FC<IProps | any> = ({
  articles,
  location,
  getAllArticles
}: IProps | any): JSX.Element => {
  const parsed: any = queryString.parse(location.search);
  const params: IParsed = {
    page: parsed.page || "1",
    category: parsed.category || null,
    searchText: parsed.searchText || null
  };

  async function getAllAerticlesByPage(): Promise<any> {
    if (articles && articles[params.page]) {
      return;
    }

    await getAllArticles({ ...params });
  }

  useEffect((): void => {
    getAllAerticlesByPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page, articles.error]);

  const error: boolean = articles.error;
  const currentPage: string | null = articles.currentPage;
  const totalPages: number | null = articles.totalPages;
  const category: string | null = articles.category;
  const searchText: string | null = articles.searchText;
  const SEO: ISEO | null = articles.SEO;
  const articlesArray: ISingleArticle[] = articles[params.page];

  if (error)
    return (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
      </Suspense>
    );

  return (
    <Suspense fallback={<Loader />}>
      <HeadSEO SEO={SEO} />
      {/* <ArticlesPage articles={articles} /> */}
    </Suspense>
  );
};

const mapStateToProps = ({ articles }: any) => ({ articles });
const mapDispatchToProps = { getAllArticles };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllArticlesPage);
