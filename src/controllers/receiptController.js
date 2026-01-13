const Receipt = require("../models/Receipt");
const {extractText} = require("../services/ocrService");
const {getParser} = require("../services/parsers");
const {detectStore} = require("../services/storeDetector");

async function uploadReceipt(req, res) {
    try {
        console.log(req.file);

        const imagePath = req.file.path;

        const rawText = await extractText(imagePath);
        const store = detectStore(rawText);
        const parser = getParser(store);

        if (!parser) {
            return res.status(400).json({error: "Unsupported store"});
        }

        const result = parser.parse(rawText);
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
