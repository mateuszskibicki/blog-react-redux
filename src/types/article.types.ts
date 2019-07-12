import { IImg, ISEO } from "./common.types";
import { ISmallAuthor } from "./author.types";
import { TAllSlices } from "./slices.types";

export interface ISingleArticlePage {
  uid: string;
  title: string | null;
  short_description: string | null;
  series: string | null;
  categories: string | null;
  tags: string | null;
  date: string | null;
  small_img: IImg | null;
  big_img: IImg | null;
  SEO: ISEO | null;
  author: ISmallAuthor | null;
  content: Array<TAllSlices> | null;
}

export interface ISingleArticle {
  uid: string;
  title: string | null;
  short_description: string | null;
  series: string | null;
  categories: string | null;
  tags: string | null;
  date: string | null;
  small_img: IImg | null;
  xs_img: IImg | null;
  big_img?: IImg | null;
  author: ISmallAuthor | null;
}

export interface IArticleHeader {
  title: string | null;
  short_description: string | null;
  series: string | null;
  categories: string | null;
  tags: string | null;
  date: string | null;
  author: ISmallAuthor | null;
  big_img: IImg | null;
}
