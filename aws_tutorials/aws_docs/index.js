"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event, context) => {
    for (const message of event.Records) {
        await processMessageAsync(message);
    }
    return { message: "Done" };
};
exports.handler = handler;
async function processMessageAsync(message) {
    try {
        console.log(`Processed message ${message.body}`);
        // TODO: Do interesting work based on the new message
        await Promise.resolve(1); //Placeholder for actual async work
    }
    catch (err) {
        console.error("An error occurred");
        throw err;
    }
}
