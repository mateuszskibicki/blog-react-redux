import { IImg } from "./common.types";

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
