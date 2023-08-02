import vision from '@google-cloud/vision';

export async function alalyzeImage(imageURL) {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(imageURL);
    const annotationsBlocks = result.textAnnotations;
    if (!annotationsBlocks) {
        return "";
    }
    reasoningText = annotationsBlocks[0].description;
    return reasoningText;
}