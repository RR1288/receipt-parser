const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    store: {
        type: String,
        required: true
    },

    storeItemId: {
        type: String,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    unitPrice: Number,
    totalPrice: {
        type: Number,
        required: true
    }
});

const ReceiptSchema = new mongoose.Schema({
    store: String,
    items: [ItemSchema],
    subtotal: Number,
    total: Number,
    rawText: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Receipt", ReceiptSchema);