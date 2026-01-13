class Processor {
    constructor() {
        if (new.target === Processor) {
            throw new Error("Processor is abstract!");
        }
    }

    async preprocessImage(imagePath) {
        return imagePath;
    }

    parseText(text) {
        throw new Error("parseText not implemented");
    }
}

module.exports = Processor;
