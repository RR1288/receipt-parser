const BaseParser = require("./BaseParser");

class TargetParser extends BaseParser {
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
            const subtotalMatch = line.match(/^SUBTOTAL\s+\$([\d.]+)/i);
            if (subtotalMatch) {
                subtotal = parseFloat(subtotalMatch[1]);
                continue;
            }

            // Check total
            const totalMatch = line.match(/^TOTAL\s+\$([\d.]+)/i);
            if (totalMatch) {
                total = parseFloat(totalMatch[1]);
                continue;
            }

            // check quantity line: 2@S81.99 ea
            const qtyMatch = line.match(/^(\d+)\s*@\s*\$([\d.]+)/);
            if (qtyMatch && lastItem) {
                const quantity = parseInt(qtyMatch[1], 10);
                const unitPrice = parseFloat(qtyMatch[2]);

                lastItem.quantity = quantity;
                lastItem.unitPrice = unitPrice;
                // lastItem.totalPrice = +(quantity*unitPrice).toFixed(2);

                continue;
            }

            // check item line
            const itemMatch = line.match(/^(\d{6,})\s+(.+?)\s+\$([\d.]+)$/);

            if (itemMatch) {
                const [, storeItemId, name, price] = itemMatch;

                lastItem = {
                    store: "target",
                    storeItemId,
                    name,
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

module.exports = TargetParser;
