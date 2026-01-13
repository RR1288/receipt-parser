const Tesseract = require("tesseract.js");

async function extractText(imagePath) {
  const { data: { text } } = await Tesseract.recognize(
    imagePath,
    "eng",
    {
      logger: m => console.log(m)
    }
  );

  return text;
}

module.exports = { extractText };
