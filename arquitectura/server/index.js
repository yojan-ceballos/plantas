import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Setup ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'public', 'data');

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CART_FILE = path.join(DATA_DIR, 'cart.json');

const app = express();
app.use(express.json());

// --- Helpers ---

/** Read and parse a JSON file. */
function readJson(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
}

/** Atomic write: write to temp file, then rename. Prevents corruption. */
function writeJsonAtomic(filePath, data) {
    const json = JSON.stringify(data, null, 2);
    const tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, json, 'utf-8');
    fs.renameSync(tmpPath, filePath);
}

// --- Routes ---

// GET /api/products
app.get('/api/products', (_req, res) => {
    try {
        const products = readJson(PRODUCTS_FILE);
        res.json(products);
    } catch (err) {
        console.error('Error reading products:', err);
        res.status(500).json({ error: 'Error reading products file.' });
    }
});

// GET /api/cart
app.get('/api/cart', (_req, res) => {
    try {
        const cartItems = readJson(CART_FILE);
        res.json(cartItems);
    } catch (err) {
        console.error('Error reading cart:', err);
        res.status(500).json({ error: 'Error reading cart file.' });
    }
});

// POST /api/cart/add
app.post('/api/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'productId is required.' });
    }

    try {
        const products = readJson(PRODUCTS_FILE);
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        const product = products[productIndex];
        const currentStock = product.stock ?? 0;

        if (currentStock < quantity) {
            return res.status(409).json({
                error: 'Insufficient stock.',
                available: currentStock,
            });
        }

        // Decrement stock
        products[productIndex] = { ...product, stock: currentStock - quantity };
        writeJsonAtomic(PRODUCTS_FILE, products);

        // Upsert cart item
        const cartItems = readJson(CART_FILE);
        const cartIndex = cartItems.findIndex(c => c.productId === productId);

        if (cartIndex >= 0) {
            cartItems[cartIndex].quantity += quantity;
        } else {
            cartItems.push({ productId, quantity });
        }

        writeJsonAtomic(CART_FILE, cartItems);

        res.json({
            message: 'Product added to cart.',
            product: products[productIndex],
            cartItem: cartItems.find(c => c.productId === productId),
        });
    } catch (err) {
        console.error('Error in POST /api/cart/add:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// DELETE /api/cart/:productId
app.delete('/api/cart/:productId', (req, res) => {
    const { productId } = req.params;

    try {
        const cartItems = readJson(CART_FILE);
        const cartIndex = cartItems.findIndex(c => c.productId === productId);

        if (cartIndex === -1) {
            return res.status(404).json({ error: 'Item not in cart.' });
        }

        const removedQty = cartItems[cartIndex].quantity ?? 0;
        cartItems.splice(cartIndex, 1);
        writeJsonAtomic(CART_FILE, cartItems);

        // Restore stock
        const products = readJson(PRODUCTS_FILE);
        const productIndex = products.findIndex(p => p.id === productId);

        if (productIndex >= 0) {
            products[productIndex].stock = (products[productIndex].stock ?? 0) + removedQty;
            writeJsonAtomic(PRODUCTS_FILE, products);
        }

        res.json({ message: 'Item removed from cart.', restoredStock: removedQty });
    } catch (err) {
        console.error('Error in DELETE /api/cart/:productId:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// PATCH /api/cart/:productId
app.patch('/api/cart/:productId', (req, res) => {
    const { productId } = req.params;
    const { delta } = req.body;

    if (typeof delta !== 'number') {
        return res.status(400).json({ error: 'delta (number) is required.' });
    }

    try {
        const cartItems = readJson(CART_FILE);
        const cartIndex = cartItems.findIndex(c => c.productId === productId);

        if (cartIndex === -1) {
            return res.status(404).json({ error: 'Item not in cart.' });
        }

        const products = readJson(PRODUCTS_FILE);
        const productIndex = products.findIndex(p => p.id === productId);
        const product = productIndex >= 0 ? products[productIndex] : null;

        const currentQty = cartItems[cartIndex].quantity ?? 0;
        const newQty = currentQty + delta;

        if (newQty < 1) {
            return res.status(409).json({ error: 'Quantity cannot be less than 1. Use DELETE to remove.' });
        }

        if (delta > 0) {
            const currentStock = product ? (product.stock ?? 0) : 0;
            if (currentStock < delta) {
                return res.status(409).json({ error: 'Insufficient stock.', available: currentStock });
            }
            if (product) products[productIndex].stock = currentStock - delta;
        } else {
            if (product) products[productIndex].stock = (product.stock ?? 0) + Math.abs(delta);
        }

        cartItems[cartIndex].quantity = newQty;

        writeJsonAtomic(PRODUCTS_FILE, products);
        writeJsonAtomic(CART_FILE, cartItems);

        res.json({
            message: 'Cart updated.',
            cartItem: cartItems[cartIndex],
            product: products[productIndex],
        });
    } catch (err) {
        console.error('Error in PATCH /api/cart/:productId:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// POST /api/cart/clear
app.post('/api/cart/clear', (_req, res) => {
    try {
        const cartItems = readJson(CART_FILE);
        const products = readJson(PRODUCTS_FILE);

        for (const item of cartItems) {
            const idx = products.findIndex(p => p.id === item.productId);
            if (idx >= 0) {
                products[idx].stock = (products[idx].stock ?? 0) + (item.quantity ?? 0);
            }
        }

        writeJsonAtomic(PRODUCTS_FILE, products);
        writeJsonAtomic(CART_FILE, []);

        res.json({ message: 'Cart cleared.' });
    } catch (err) {
        console.error('Error in POST /api/cart/clear:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// --- Start ---
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`🌿 Plantas API server running on http://localhost:${PORT}`);
    console.log(`   Data directory: ${DATA_DIR}`);
});
