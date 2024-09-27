import { SQSEvent, Context, SQSHandler, SQSRecord } from "aws-lambda";

export const handler: SQSHandler = async (event: SQSEvent, context: Context): Promise<any> => {
  for (const message of event.Records) {
    await processMessageAsync(message);
  }
  return { message: "Done" };
};

async function processMessageAsync(message: SQSRecord): Promise<any> {
  try {
    console.log(`Processed message ${message.body}`);
    // TODO: Do interesting work based on the new message
    await Promise.resolve(1); //Placeholder for actual async work
  } catch (err) {
    console.error("An error occurred");
    throw err;
  }
}
