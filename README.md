# Receipt Parser

## Overview

I needed a simple way to store my groceries digitally, like a simple personal inventory tool, to check when I bought a product last, track price trends, or compare the same product across different stores. The first step is parsing physical receipts into structured data.  

This project handles that first step by allowing you to upload receipt images, extract item information, and store it in MongoDB.

## Features

- Upload receipt images (Target, Walmart, Aldi)  
- Extract items, quantities, unit prices, subtotal, and total  
- Store structured data in MongoDB for easy retrieval and analysis  
- Designed with scalability in mind for multiple stores with different parsers  
- **Swagger UI** for testing API endpoints  

> Go to `/api-docs` (e.g., `http://localhost:3000/api-docs`) to test the API endpoints.

## Tech Stack

- Node.js + Express  
- MongoDB with Mongoose  
- Tesseract.js for local OCR (no cloud)  
- Multer for handling file uploads  
- Swagger for API documentation  

## Setup

1. **Clone the repository**  
```bash
git clone https://github.com/RR1288/receipt-parser.git
cd receipt-parser
```

2. **Install dependencies**  
```bash
npm install
```

3. **Create a `.env` file**  
```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/receipt_parser
```

4. **Start MongoDB manually** (Windows example)  
```bash
mongod --dbpath C:\data\db
```

5. **Start the app**  
```bash
node index.js
```

6. **Access Swagger UI**  
Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) to upload receipt images and test parsing.

## Project Structure (simplified)

```
src/
 ├─ app.js            # Express app setup
 ├─ config/db.js      # MongoDB connection
 ├─ routes/           # API routes
 ├─ controllers/      # Controllers orchestrating requests
 ├─ models/           # MongoDB models
 ├─ services/         # OCR, store detection, parsers
 └─ uploads/          # Uploaded images
```

## Future Improvements

- Add more store-specific parsers  
- Build a monthly/quarterly report of items

## License

MIT License

