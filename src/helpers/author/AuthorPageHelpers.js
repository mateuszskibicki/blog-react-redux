import { TextHelper, ImgHelper } from "../PrismicHelpers";
import { SEOhelper } from "../SEOhelper";
import { sliceHelper } from "../slice-helpers/SliceHelpers";

export const authorPageHelper = data => {
  if (!data || !data.data) return null;

  const authorData = data.data;

  const author = {
    uid: data.uid,
    id: data.id,
    short_description: TextHelper(authorData.short_description),
    full_name: TextHelper(authorData.full_name),
    image: ImgHelper(authorData.image),
    image_avatar: ImgHelper(authorData.image_avatar),
    email: TextHelper(authorData.email),
    instagram: TextHelper(authorData.instagram),
    facebook: TextHelper(authorData.facebook),
    github: TextHelper(authorData.github),
    linkedin: TextHelper(authorData.linkedin),
    content: sliceHelper(authorData.body)
  };

  return {
    [author.uid]: {
      author,
      SEO: SEOhelper(authorData)
    }
  };
};
