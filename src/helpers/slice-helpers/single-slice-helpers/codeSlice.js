import {
  TextHelper,
  SmallTextHelper
  //UrlHelper,
  //ArrayHelper
} from "../../PrismicHelpers";

export const codeSlice = data => {
  //If wrong type of data return null
  if (!data || !data.slice_type || !data.primary) return null;
  //Always take the slice_type and return it with data, helper will know what to display/render
  const dataType = data.slice_type;
  //Non repetable data inside slice
  const sliceFixedData = data.primary;
  //Repetable data (example: buttons)
  //const sliceRepetableData = data.items;

  //Data to send to the array of slices (always type and data if needed)
  return {
    type: dataType,
    title: TextHelper(sliceFixedData.title),
    language: SmallTextHelper(sliceFixedData.language),
    code: TextHelper(sliceFixedData.code)
  };
};
