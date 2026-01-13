const sharp = require("sharp");
const path = require("path");

class Processor {
    constructor(margins = null) {
        this.margins = margins;
    }

    async preprocessImage(imagePath) {
        if (!this.margins) return imagePath;

        const {top, bottom, left, right} = this.margins;
        const out = path.join("uploads/processed", `cropped_${Date.now()}.png`);

        const image = sharp(imagePath).rotate();
        const {width, height} = await image.metadata();

        const cropWidth = width - left - right;
        const cropHeight = height - top - bottom;

        if (cropWidth <= 0 || cropHeight <= 0) {
            throw new Error("Invalid crop dimensions");
        }

        await image
            .extract({left, top, width: cropWidth, height: cropHeight})
            .png()
            .toFile(out);

        return out;
    }

    parseText(text) {
        throw new Error("parseText not implemented");
    }
}

module.exports = Processor;
