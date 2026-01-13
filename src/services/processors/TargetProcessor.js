const TargetParser = require("../parsers/targetParser");
const Procesor = require("./Processor");

const sharp = require("sharp");

class TargetProcessor extends Procesor {
    async preprocessImage(imagePath) {
        const out = "target_cropped.png";
        const image = sharp(imagePath).rotate();
        const {width, height} = await image.metadata();

        const left = 165;
        const right = 165;
        const top = 750;
        const bottom = 1350;

        const cropWidth = width - left - right;
        const cropHeight = height - top - bottom;

        await image
            .extract({left, top, width: cropWidth, height: cropHeight})
            .png()
            .toFile(out);

        return out;
    }

    parseText(text) {
        const parser = new TargetParser();
        return parser.parse(text);
    }
}

module.exports = TargetProcessor;
