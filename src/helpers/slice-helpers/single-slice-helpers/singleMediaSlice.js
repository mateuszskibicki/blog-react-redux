import {
  TextHelper,
  SmallTextHelper,
  UrlHelper,
  ImgHelper,
  //ArrayHelper,
  EmbedHelper
} from "../../PrismicHelpers";

export const singleMediaSlice = data => {
  //If wrong type of data return null
  if (!data || !data.slice_type || !data.primary) return null;
  //Always take the slice_type and return it with data, helper will know what to display/render
  const dataType = data.slice_type;
  //Non repetable data inside slice
  const sliceFixedData = data.primary;
  // Repetable data (example: buttons)
  //const sliceRepetableData = data.items;

  // Data to send to the array of slices (always type and data if needed)
  return {
    type: dataType,
    title: TextHelper(sliceFixedData.title),
    description: TextHelper(sliceFixedData.description),
    button_title: TextHelper(sliceFixedData.button_title),
    button_url: UrlHelper(sliceFixedData.button_url),
    image: ImgHelper(sliceFixedData.image),
    media_position: SmallTextHelper(sliceFixedData.media_position),
    text_align: SmallTextHelper(sliceFixedData.text_align),
    media_type: SmallTextHelper(sliceFixedData.media_type),
    youtube: EmbedHelper(sliceFixedData.youtube)
  };
};
