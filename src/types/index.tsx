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

export interface ICodeSlice {
  type: string;
  title: string | null;
  language: string | null;
  code: string | null;
}

export interface IMultipleMediaSliceSingle {
  title: string | null;
  description: string | null;
  image: IImg | null;
  image_alternative: string | null;
  media_type: string | null;
  youtube: string | null;
}

export interface IMultipleMediaSlice {
  type: string;
  title: string | null;
  button_title: string | null;
  button_url: string | null;
  media: IMultipleMediaSliceSingle[] | null;
}
