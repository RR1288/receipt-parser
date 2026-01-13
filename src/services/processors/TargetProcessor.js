const TargetParser = require("../parsers/targetParser");
const Procesor = require("./Processor");

class TargetProcessor extends Procesor {
    constructor() {
        super({top: 750, bottom: 1350, left: 165, right: 165});
    }

    parseText(text) {
        return new TargetParser().parse(text);
    }
}

module.exports = TargetProcessor;
