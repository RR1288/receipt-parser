const Procesor = require("./Processor");
const WalmartParser = require("../parsers/WalmartParser");


class WalmartProcessor extends Procesor {
    constructor() {
        super({top: 220, bottom: 320, left: 0, right: 0});
    }

    parseText(text) {
        return new WalmartParser().parse(text);
    }
}

module.exports = WalmartProcessor;
