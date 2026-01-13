const TargetProcessor = require("./TargetProcessor");
const WalmartProcessor = require("./WalmartProcessor");

function getProcessor(store) {
    switch (store) {
        case "target":
            return new TargetProcessor();
        case "walmart":
            return new WalmartProcessor();
        default:
            return null;
    }
}

module.exports = {getProcessor};
