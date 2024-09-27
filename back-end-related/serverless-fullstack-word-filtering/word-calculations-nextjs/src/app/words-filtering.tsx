"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";

type InputWordsRequest = {
  inputWords: string[];
};

type Dictionary = {
  noun: string[];
  verb: string[];
  adjective: string[];
  adverb: string[];
  preposition: string[];
  conjunction: string[];
  pronoun: string[];
  interjection: string[];
  determiner: string[];
  numeral: string[];
};

type FilteredResultDictionary = {
  [Property in keyof Dictionary]: number;
};

const urls = {
  base: process.env.NEXT_PUBLIC_REST_API_ENDPOINT!,
};

export const WordsFiltering = () => {
  const [message, setMessage] = React.useState<string>("");
  const [results, setResults] = React.useState<string>("");

  const mutation = useMutation({
    mutationFn: async (words) => {
      const result = await fetch(urls.base, { method: "POST", body: JSON.stringify(words) });
      const json = await result.json();
      return json;
    },
  });

  const submitHandler = async () => {
    const words: InputWordsRequest = {
      inputWords: message.split(" "),
    };

    const result = (await mutation.mutateAsync(words as any)) as FilteredResultDictionary;
    let finalResult = "";
    for (const key in result) {
      finalResult += `${key}: ${(result as any)[key]} \n`;
    }
    setResults(finalResult);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your message
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
          placeholder="Submit a message"
        ></textarea>
        <button
          onClick={submitHandler}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
            focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Submit
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          id="results_message"
          rows={12}
          value={results}
          onChange={(e) => setResults(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border 
            border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
            dark:focus:border-blue-500"
          placeholder="results"
        ></textarea>
      </div>
    </div>
  );
};
