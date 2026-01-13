const express = require("express");
const multer = require("multer");
const {uploadReceipt} = require("../controllers/receiptController");

const router = express.Router();
const upload = multer({dest: "uploads/"});

/**
 * @swagger
 * /receipts:
 *   post:
 *     summary: Upload a receipt image and parse items
 *     tags:
 *       - Receipts
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               receipt:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Parsed receipt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 store:
 *                   type: string
 *                   example: target
 *                 subtotal:
 *                   type: number
 *                   example: 45.93
 *                 total:
 *                   type: number
 *                   example: 39.17
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       store:
 *                         type: string
 *                       storeItemId:
 *                         type: string
 *                         example: "261050497"
 *                       name:
 *                         type: string
 *                         example: "GG MILK NF"
 *                       quantity:
 *                         type: number
 *                         example: 2
 *                       unitPrice:
 *                         type: number
 *                         example: 1.99
 *                       totalPrice:
 *                         type: number
 *                         example: 3.98
 *       400:
 *         description: Unsupported store
 *       500:
 *         description: OCR or parsing failure
 */
router.post("/", upload.single("receipt"), uploadReceipt);

module.exports = router;
