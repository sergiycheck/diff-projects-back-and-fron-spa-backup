import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { filterWordsByType } from "./src/filter-word-by-type";
import { dictionary } from "./src/dictionary";

export const filterWordsByTypeHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("event", event);

  const body = JSON.parse(event.body || "[]") as { inputWords: string[] };
  const result = filterWordsByType(body.inputWords, dictionary);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(result, null, 2),
  };
};
