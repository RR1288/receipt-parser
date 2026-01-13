const Tesseract = require("tesseract.js");

async function extractText(imagePath) {
    const {
        data: {text},
    } = await Tesseract.recognize(imagePath, "eng", {
        tessedit_char_whitelist:
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$@.- ",
        logger: (m) => console.log(m),
    });

    return text;
}

module.exports = {extractText};
