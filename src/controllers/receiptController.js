const Receipt = require("../models/Receipt");
const {extractText} = require("../services/ocrService");
const {getProcessor} = require("../services/processors");

async function uploadReceipt(req, res) {
    try {
        const imagePath = req.file.path;
        // Store will be provided by the user
        // const store = detectStore(rawText);
        const {store} = req.body;
        if (!store) {
            return res.status(400).json({error: "Store is required"});
        }

        const processor = getProcessor(store);
        if (!processor) {
            return res.statues(400).json({error: "Unsupported store"});
        }
        const processedImage = await processor.preprocessImage(imagePath);

        const rawText = await extractText(processedImage);

        const result = processor.parseText(rawText);
        const receipt = await Receipt.create({
            store,
            items: result.items,
            subtotal: result.subtotal,
            total: result.total,
            rawText,
        });

        res.json(receipt);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to process receipt"});
    }
}

module.exports = {uploadReceipt};
