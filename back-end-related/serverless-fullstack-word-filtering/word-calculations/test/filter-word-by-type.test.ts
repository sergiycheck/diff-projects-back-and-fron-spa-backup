import { describe, expect, test } from "@jest/globals";
import { filterWordsByType } from "../src/filter-word-by-type";
import { dictionary } from "../src/dictionary";

describe("filterWordsByType", () => {
  test("should return an object with the correct keys", () => {
    const inputObj = {
      inputWords: ["table", "sleep"],
    };

    const expectedResult = {
      noun: 1,
      verb: 1,
      adjective: 0,
      adverb: 0,
      preposition: 0,
      conjunction: 0,
      pronoun: 0,
      interjection: 0,
      determiner: 0,
      numeral: 0,
    };

    const result = filterWordsByType(inputObj.inputWords, dictionary);

    expect(result).toEqual(expectedResult);
  });
});
