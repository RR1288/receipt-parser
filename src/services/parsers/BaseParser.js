class BaseParser {
    parse(text) {
        throw new Error("parse() must be implemented");
    }
}

module.exports = BaseParser;
