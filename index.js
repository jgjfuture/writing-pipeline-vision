import functions from '@google-cloud/functions-framework';
import { alalyzeImage } from './analyze.js';
import { publishMessage, makePublishData } from './publish.js';
import { topicName } from './pubsub.js';

functions.cloudEvent('entoryPoint', cloudEvent => {
    (async () => {
        const base64Message = cloudEvent.data.message.data;
        if (!base64Message) {
            console.log('No message received!');
            return;
        }
        const messageString = Buffer.from(base64Message, 'base64').toString();
        const message = JSON.parse(messageString);
        const imageURL = message.imageURL;
        const pageId = message.notionPageId;
        const reasoningText = await alalyzeImage(imageURL);
        await publishMessage(topicName, makePublishData(pageId, reasoningText));
    })();
});
