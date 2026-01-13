const TargetParser = require("./targetParser");
const WalmartParser = require("./walmartParser");

function getParser(store) {
    switch (store) {
        case "target":
            return new TargetParser();
        case "walmart":
            return new WalmartParser();
        default:
            return null;
    }
}

module.exports = {getParser};