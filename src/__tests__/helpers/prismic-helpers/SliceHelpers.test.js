import {
  sliceHelper,
  filterArray
} from "../../../helpers/slice-helpers/SliceHelpers";

describe("SliceHelpers", () => {
  describe("filterArray", () => {
    test("filterArray - should be defined and function", () => {
      expect(filterArray).toBeDefined();
      expect(filterArray).toBeInstanceOf(Object);
      expect(typeof filterArray === "function").toBeTruthy();
    });

    test("filterArray - should return array without nulls", () => {
      expect(filterArray([null, null, null])).toStrictEqual([]);
      expect(filterArray([null, null, "string", null])[0]).toBe("string");
    });
  });

  describe("sliceHelper", () => {
    test("sliceHelper - should be defined and function", () => {
      expect(sliceHelper).toBeDefined();
      expect(sliceHelper).toBeInstanceOf(Object);
      expect(typeof sliceHelper === "function").toBeTruthy();
    });

    test("sliceHelper - should return null if incorrect data provided", () => {
      expect(sliceHelper(null)).toBeNull();
    });

    test("sliceHelper - should return empty array if there are items but incorrect", () => {
      expect(sliceHelper([{}])).toStrictEqual([]);
    });

    test("sliceHelper - should return 1 item in array when 1 correct object is provided", () => {
      const data = [
        { slice_type: "text_block", primary: { title: [{ text: "title" }] } }
      ];
      const successResponse = sliceHelper(data);
      expect(Array.isArray(successResponse)).toBeTruthy();
      expect(successResponse[0].type).toBe(data[0].slice_type);
      expect(successResponse[0].title).toBe(data[0].primary.title[0].text);
    });
  });
});
