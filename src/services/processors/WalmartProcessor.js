const Procesor = require("./Processor");
const WalmartParser = require("../parsers/WalmartParser");

const sharp = require("sharp");

class WalmartProcessor extends Procesor {
    async preprocessImage(imagePath) {
        const out = "walmart_cropped.png";
        const image = sharp(imagePath).rotate();
        const {width, height} = await image.metadata();

        const left = 0;
        const right = 0;
        const top = 220;
        const bottom = 320;

        const cropWidth = width - left - right;
        const cropHeight = height - top - bottom;

        await image
            .extract({left, top, width: cropWidth, height: cropHeight})
            .png()
            .toFile(out);

        return out;
    }

    parseText(text) {
        const parser = new WalmartParser();
        return parser.parse(text);
    }
}

module.exports = WalmartProcessor;
