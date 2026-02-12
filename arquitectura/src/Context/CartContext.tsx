import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import Swal from 'sweetalert2';
import { type Product } from '../Data/products';
import { useProducts } from './ProductsContext';

// --- Types ---
export interface CartItem {
    product: Product;
    quantity: number;
    potStyle?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    clearCart: () => void;
    subtotal: number;
    cartCount: number;
    loading: boolean;
}

// --- Constants ---
export const FREE_SHIPPING_THRESHOLD = 120;
const STORAGE_KEY = 'plantas_cart';

// --- Context ---
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { products, refreshProducts } = useProducts();

    // --- Load cart from API on mount ---
    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await fetch('/api/cart');
                if (!res.ok) throw new Error('Failed to load cart');
                const csvCartItems = await res.json();

                // Map cart CSV rows to CartItem[] by enriching with product data
                const enriched: CartItem[] = [];
                for (const row of csvCartItems) {
                    const product = products.find(p => p.id === row.productId);
                    if (product) {
                        enriched.push({
                            product,
                            quantity: Number(row.quantity) || 1,
                            potStyle: 'Standard Pot',
                        });
                    }
                }
                setCartItems(enriched);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
            } catch {
                // Fallback: load from LocalStorage
                console.warn('API cart load failed, using LocalStorage fallback');
                try {
                    const stored = localStorage.getItem(STORAGE_KEY);
                    if (stored) setCartItems(JSON.parse(stored));
                } catch (e) {
                    console.error('LocalStorage parse error', e);
                }
            }
        };

        if (products.length > 0) {
            loadCart();
        }
    }, [products]);

    // Keep LocalStorage in sync as cache
    useEffect(() => {
        if (cartItems.length > 0 || localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Helpers
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    // --- Add to Cart (API-backed with SweetAlert2 flow) ---
    const addToCart = useCallback(async (product: Product, quantity = 1) => {
        // Show loading state
        Swal.fire({
            title: 'Adding to cart...',
            text: product.name,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const res = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity }),
            });

            const data = await res.json();

            if (res.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Product Not Found',
                    text: 'This product does not exist in our catalog.',
                    timer: 3000,
                    timerProgressBar: true,
                });
                return;
            }

            if (res.status === 409) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Out of Stock',
                    text: data.available > 0
                        ? `Only ${data.available} items available.`
                        : 'This product is out of stock.',
                    timer: 3000,
                    timerProgressBar: true,
                });
                return;
            }

            if (!res.ok) {
                throw new Error(data.error || 'Server error');
            }

            // Success — update local state
            setCartItems(prev => {
                const existing = prev.find(item => item.product.id === product.id);
                if (existing) {
                    return prev.map(item =>
                        item.product.id === product.id
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                }
                return [...prev, { product, quantity, potStyle: 'Standard Pot' }];
            });

            // Refresh product list to reflect stock changes
            await refreshProducts();

            // Success SweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡Producto agregado!',
                text: `${quantity} x ${product.name}`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                background: '#1a2e1a',
                color: '#e8f5e8',
                iconColor: '#4caf50',
            });
        } catch (err) {
            console.error('addToCart error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not add product. Please try again.',
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [refreshProducts]);

    // --- Remove from Cart (API-backed) ---
    const removeFromCart = useCallback(async (productId: string) => {
        try {
            const res = await fetch(`/api/cart/${productId}`, { method: 'DELETE' });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Server error');
            }

            setCartItems(prev => prev.filter(item => item.product.id !== productId));
            await refreshProducts();
        } catch (err) {
            console.error('removeFromCart error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not remove product.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }, [refreshProducts]);

    // --- Update Quantity (API-backed) ---
    const updateQuantity = useCallback(async (productId: string, delta: number) => {
        try {
            const res = await fetch(`/api/cart/${productId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ delta }),
            });

            const data = await res.json();

            if (res.status === 409) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stock Limit',
                    text: data.error || 'Cannot update quantity.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                });
                return;
            }

            if (!res.ok) {
                throw new Error(data.error || 'Server error');
            }

            // Update local state
            setCartItems(prev => prev.map(item => {
                if (item.product.id !== productId) return item;
                return { ...item, quantity: item.quantity + delta };
            }));

            await refreshProducts();
        } catch (err) {
            console.error('updateQuantity error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not update quantity.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }, [refreshProducts]);

    // --- Clear Cart (API-backed) ---
    const clearCart = useCallback(async () => {
        try {
            const res = await fetch('/api/cart/clear', { method: 'POST' });
            if (!res.ok) throw new Error('Failed to clear cart');

            setCartItems([]);
            await refreshProducts();
        } catch (err) {
            console.error('clearCart error:', err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not clear cart.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    }, [refreshProducts]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            subtotal,
            cartCount,
            loading,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
