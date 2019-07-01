import { singleArticleHelper } from "../../../helpers/article/ArticleHelpers";

describe("ArticleHelpers (single article)", () => {
  describe("singleArticleHelper", () => {
    test("singleArticleHelper - should be a function and defined", () => {
      expect(singleArticleHelper).toBeDefined();
      expect(singleArticleHelper).toBeInstanceOf(Object);
    });

    test("singleArticleHelper - should return null when provided data is incorrect", () => {
      expect(singleArticleHelper("string")).toBeNull();
      expect(singleArticleHelper()).toBeNull();
      expect(singleArticleHelper({})).toBeNull();
      expect(singleArticleHelper([])).toBeNull();
      expect(singleArticleHelper(12345)).toBeNull();
      expect(singleArticleHelper({ dummy: 123 })).toBeNull();
    });

    test("singleArticleHelper - should return data without author when it is not provided", () => {
      const successResponse = {
        data: {
          author: null
        }
      };
      expect(singleArticleHelper(successResponse).author).toBeNull();
      expect(singleArticleHelper(successResponse).SEO).toBeDefined();
    });

    test("singleArticleHelper - should return data with author when correct data is provided", () => {
      const successResponse = {
        uid: "some-uid",
        data: {
          author: { data: { uid: "some author" } }
        }
      };
      expect(singleArticleHelper(successResponse).author).toBeDefined();
      expect(singleArticleHelper(successResponse).author.uid).toBe(
        successResponse.data.author.data.uid
      );
      expect(singleArticleHelper(successResponse).SEO).toBeDefined();
      expect(singleArticleHelper(successResponse).uid).toBeDefined();
      expect(singleArticleHelper(successResponse).uid).toBe(
        successResponse.uid
      );
    });
  });
});
