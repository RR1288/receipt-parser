function detectStore(text) {
    const upper = text.toUpperCase();

    if (upper.includes("TARGET")) return "target";
    if (upper.includes("WALMART")) return "walmart";
    if (upper.includes("ALDI")) return "aldi";

    return "unknown";
}

module.exports = {detectStore};
