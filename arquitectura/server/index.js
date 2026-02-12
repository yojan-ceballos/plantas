import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// --- Configuration & Constants ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// paths:
// - DIST_DIR: The built React app (output of `npm run build`)
// - DATA_DIR: Where JSON/CSV files live. 
//   In production (Render), we might want a persistent volume (e.g. /var/data).
//   We default to local source `public/data` for dev or if no volume is attached.
const DIST_DIR = path.join(__dirname, '..', 'dist');
const LOCAL_DATA_DIR = path.join(__dirname, '..', 'public', 'data');
const DATA_DIR = process.env.DATA_PATH || LOCAL_DATA_DIR;

// Ensure Data Directory Exists (if using custom path)
if (!fs.existsSync(DATA_DIR)) {
    console.warn(`Warn: Data directory ${DATA_DIR} does not exist. Creating it...`);
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CART_FILE = path.join(DATA_DIR, 'cart.json');

// --- Helper Functions ---
function readJson(filePath) {
    if (!fs.existsSync(filePath)) return []; // Return empty array if file missing
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
}

function writeJsonAtomic(filePath, data) {
    try {
        const json = JSON.stringify(data, null, 2);
        const tmpPath = filePath + '.tmp';
        fs.writeFileSync(tmpPath, json, 'utf-8');
        fs.renameSync(tmpPath, filePath);
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
        throw err;
    }
}

// --- Express Setup ---
const app = express();
const PORT = process.env.PORT || 3001;

// 1. Security & Performance Middlewares
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for less friction with external scripts/images
    crossOriginEmbedderPolicy: false,
}));
app.use(compression()); // Gzip compression
app.use(cors()); // Allow cross-origin requests (useful for dev split setup)

// 2. Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. API Routes (Prefix: /api)
const apiRouter = express.Router();

// GET /api/products
apiRouter.get('/products', (req, res) => {
    try {
        // If file doesn't exist in DIST/DATA, try to fallback or just return empty
        if (!fs.existsSync(PRODUCTS_FILE)) {
            // Optional: fallback to source code data if specific ENV is not set?
            // For now, we stick to the architecture: Data is in DATA_DIR.
            return res.json([]);
        }
        res.json(readJson(PRODUCTS_FILE));
    } catch (err) {
        res.status(500).json({ error: 'Failed to read products' });
    }
});

// GET /api/cart
apiRouter.get('/cart', (req, res) => res.json(readJson(CART_FILE)));

// POST /api/cart/add
apiRouter.post('/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'Missing productId' });

    try {
        const products = readJson(PRODUCTS_FILE);
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) return res.status(404).json({ error: 'Product not found' });

        const product = products[productIndex];
        const currentStock = product.stock ?? 0;

        if (currentStock < quantity) {
            return res.status(409).json({ error: 'Insufficient stock', available: currentStock });
        }

        // Update Stock
        products[productIndex].stock = currentStock - quantity;
        writeJsonAtomic(PRODUCTS_FILE, products);

        // Update Cart
        const cart = readJson(CART_FILE);
        const cartItem = cart.find(c => c.productId === productId);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }
        writeJsonAtomic(CART_FILE, cart);

        res.json({ message: 'Added to cart', product: products[productIndex], cart });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/cart/:productId
apiRouter.delete('/cart/:productId', (req, res) => {
    const { productId } = req.params;
    try {
        const cart = readJson(CART_FILE);
        const cartIndex = cart.findIndex(c => c.productId === productId);

        if (cartIndex === -1) return res.status(404).json({ error: 'Item not in cart' });

        const removedQty = cart[cartIndex].quantity;
        cart.splice(cartIndex, 1);
        writeJsonAtomic(CART_FILE, cart);

        // Restore Stock
        const products = readJson(PRODUCTS_FILE);
        const prodIndex = products.findIndex(p => p.id === productId);
        if (prodIndex !== -1) {
            products[prodIndex].stock = (products[prodIndex].stock ?? 0) + removedQty;
            writeJsonAtomic(PRODUCTS_FILE, products);
        }

        res.json({ message: 'Removed from cart', restoredStock: removedQty });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PATCH /api/cart/:productId
apiRouter.patch('/cart/:productId', (req, res) => {
    const { productId } = req.params;
    const { delta } = req.body;

    if (typeof delta !== 'number') return res.status(400).json({ error: 'delta must be a number' });

    try {
        const cart = readJson(CART_FILE);
        const cartIndex = cart.findIndex(c => c.productId === productId);

        if (cartIndex === -1) return res.status(404).json({ error: 'Item not in cart' });

        const products = readJson(PRODUCTS_FILE);
        const prodIndex = products.findIndex(p => p.id === productId);
        const product = prodIndex !== -1 ? products[prodIndex] : null;

        const currentQty = cart[cartIndex].quantity;
        const newQty = currentQty + delta;

        if (newQty < 1) return res.status(409).json({ error: 'Quantity cannot be less than 1' });

        if (delta > 0) {
            const currentStock = product ? (product.stock ?? 0) : 0;
            if (currentStock < delta) return res.status(409).json({ error: 'Insufficient stock' });
            if (product) product.stock = currentStock - delta;
        } else {
            if (product) product.stock = (product.stock ?? 0) + Math.abs(delta);
        }

        cart[cartIndex].quantity = newQty;

        if (product) writeJsonAtomic(PRODUCTS_FILE, products);
        writeJsonAtomic(CART_FILE, cart);

        res.json({ message: 'Cart updated', cartItem: cart[cartIndex], product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/cart/clear
apiRouter.post('/cart/clear', (req, res) => {
    try {
        const cart = readJson(CART_FILE);
        const products = readJson(PRODUCTS_FILE);

        // Restore all stock
        for (const item of cart) {
            const p = products.find(p => p.id === item.productId);
            if (p) p.stock = (p.stock ?? 0) + item.quantity;
        }

        writeJsonAtomic(PRODUCTS_FILE, products);
        writeJsonAtomic(CART_FILE, []);
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register API Router
app.use('/api', apiRouter);

// 4. Static Files (Frontend)
console.log(`Serving static files from: ${DIST_DIR}`);
app.use(express.static(DIST_DIR));

// 5. SPA Fallback
// For any route not handled above (not /api, not static file), serve index.html
app.get('{*path}', (req, res) => {
    // Verify file exists to avoid infinite loops if build failed
    const indexHtml = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
    } else {
        res.status(404).send('Frontend not built. Run `npm run build`.');
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`
      🌿 Plantas Server Running!
      --------------------------
      User:  http://localhost:${PORT}
      API:   http://localhost:${PORT}/api/products
      Data:  ${DATA_DIR}
    `);
});
