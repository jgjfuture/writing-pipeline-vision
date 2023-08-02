import { pubsub } from './pubsub.js';

export async function publishMessage(topicName, data) {
  const dataBuffer = Buffer.from(data);

  const messageId = await pubsub.topic(topicName).publish(dataBuffer);
  console.log(`Message ${messageId} published.`);

  return messageId;
}

export function makePublishData(notionPageId, reasoningText) {
    return JSON.stringify({
        notionPageId,
        reasoningText
    });
}