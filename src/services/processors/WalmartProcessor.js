
const WalmartParser = require("../parsers/walmartParser");
const Procesor = require("./Processor");

const sharp = require("sharp");

class WalmartProcessor extends Procesor {
    async preprocessImage(imagePath) {
        const out = "walmart_cropped.png";
        const image = sharp(imagePath);
        const {width, height} = await image.metadata();

        await image
            .extract({
                left: 20,
                top: 60,
                width: width - 40,
                height: height - 100,
            })
            .toFile(out);

        return out;
    }

    parseText(text) {
        const parser = new WalmartParser();
        return parser.parse(text);
    }
}

module.exports = WalmartProcessor;
