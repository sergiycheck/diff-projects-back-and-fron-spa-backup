import { Dictionary } from "./dictionary";

type FilteredResultDictionary = {
  [Property in keyof Dictionary]: number;
};

export const filterWordsByType = (wordsToFilter: string[], dictionary: Dictionary): FilteredResultDictionary => {
  const result: FilteredResultDictionary = {
    noun: 0,
    verb: 0,
    adjective: 0,
    adverb: 0,
    preposition: 0,
    conjunction: 0,
    pronoun: 0,
    interjection: 0,
    determiner: 0,
    numeral: 0,
  };

  for (const word of wordsToFilter) {
    for (const wordType in dictionary) {
      const words = dictionary[wordType as keyof Dictionary];
      if (words.includes(word)) {
        result[wordType as keyof Dictionary] += 1;
      }
    }
  }

  return result;
};
