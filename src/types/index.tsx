import { type } from "os";

/**
|--------------------------------------------------
| Helpers
|--------------------------------------------------
*/

export interface IUrl {
  url: string;
}

export interface IImg {
  url: string;
  alt: string | null | undefined;
}

export interface ISEO {
  title: string | null;
  description: string | null;
  keywords: string | null;
  geo_region: string | null;
  robots: string | null;
  item_prop_name: string | null;
  item_prop_description: string | null;
  twitter_card: string | null;
  twitter_site: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_creator: string | null;
  og_title: string | null;
  og_type: string | null;
  og_url: string | null;
  og_description: string | null;
  og_site_name: string | null;
  article_section: string | null;
  article_tag: string | null;
  fb_admins: string | null;
  item_prop_image: string | null;
  twitter_image: string | null;
  og_image: string | null;
  article_published_time: string | null;
  article_modified_time: string | null;
}

/**
|--------------------------------------------------
| Slices
|--------------------------------------------------
*/

//code slice
export interface ISliceComponentProps {
  key: string;
  content: object;
}

export interface ICodeSlice {
  type: string;
  title: string | null;
  language: string | null;
  code: string | null;
}

//single media slice
export interface ISingleMediaSlice {
  type: string | null;
  title: string | null;
  description: string | null;
  button_title: string | null;
  button_url: string | null;
  image: IImg | null;
  media_position: string | null;
  text_align: string | null;
  media_type: string | null;
  youtube: string | null;
}

//multiple media slice -> single element
export interface IMultipleMediaSliceSingle {
  title: string | null;
  description: string | null;
  image: IImg | null;
  image_alternative: string | null;
  media_type: string | null;
  youtube: string | null;
}

//multiple media slice
export interface IMultipleMediaSlice {
  type: string;
  title: string | null;
  button_title: string | null;
  button_url: string | null;
  media: IMultipleMediaSliceSingle[] | null;
}

//text block slice
export interface ITextBlockSlice {
  type: string;
  title: string | null;
  description: Array<any> | null;
  button_title: string | null;
  button_url: string | null;
  text_align: string | null;
}

export type TAllSlices =
  | ICodeSlice
  | ISingleMediaSlice
  | IMultipleMediaSlice
  | ITextBlockSlice;

/**
|--------------------------------------------------
| Redux
|--------------------------------------------------
*/

export interface IPrismicConnection {
  query: any;
}

export interface IgetRelatedToAuthorArticles {
  prismicConnection: IPrismicConnection;
  userId: string;
}

export interface IAuthorSingle {
  uid: string;
  id: string;
  short_description: string;
  full_name: string;
  image: IImg;
  image_avatar: IImg;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  github: string | null;
  linkedin: string | null;
  content: Array<any>;
  articles: Array<any>;
}

export interface IAuthorSinglePage {
  error?: boolean;
  author: IAuthorSingle;
  SEO: ISEO;
  articles: Array<any>;
}
