const BaseParser = require("./BaseParser");

class WalmartParser extends BaseParser {
    parse(text) {
        const lines = text
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean);
        const items = [];

        let lastItem = null;
        let subtotal = null;
        let total = null;

        for (const line of lines) {
            // Check subtotal
            const subtotalMatch = line.match(/^SUBTOTAL\s+([\d.]+)/i);
            if (subtotalMatch) {
                subtotal = parseFloat(subtotalMatch[1]);
                continue;
            }

            // Check total
            const totalMatch = line.match(/^TOTAL\s+([\d.]+)/i);
            if (totalMatch) {
                total = parseFloat(totalMatch[1]);
                continue;
            }

            // Skip TAX lines
            if (/^TAX/i.test(line)) {
                continue;
            }

            // check item line
            const itemMatch = line.match(
                /^(.+?)\s+(\d{11,13})\s+[A-Z]\s+([\d.]+)$/
            );

            if (itemMatch) {
                const [, name, storeItemId, price] = itemMatch;

                lastItem = {
                    store: "walmart",
                    storeItemId,
                    name: name.trim(),
                    quantity: 1,
                    unitPrice: parseFloat(price),
                    totalPrice: parseFloat(price),
                };

                items.push(lastItem);
            }
        }

        return {items, subtotal, total};
    }
}

module.exports = WalmartParser;
