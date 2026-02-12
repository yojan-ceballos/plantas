import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import Swal from 'sweetalert2';
import type { Product } from '../Data/products';

interface ProductsContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            // Try API first (live stock), fall back to static JSON
            try {
                const apiRes = await fetch('/api/products');
                if (apiRes.ok) {
                    const data = await apiRes.json();
                    setProducts(data);
                    setError(null);
                    setLoading(false);
                    return;
                }
            } catch {
                console.warn('API not available, loading from static JSON');
            }

            // Fallback: load from static file
            const response = await fetch('/data/products.json');
            if (!response.ok) {
                throw new Error('Failed to fetch products.json');
            }
            const data: Product[] = await response.json();
            setProducts(data);
            setError(null);
            setLoading(false);
        } catch (err: unknown) {
            console.error('Fetch error:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Failed to connect to the database.',
            });
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const refreshProducts = useCallback(async () => {
        try {
            const apiRes = await fetch('/api/products');
            if (apiRes.ok) {
                const data = await apiRes.json();
                setProducts(data);
            }
        } catch {
            console.warn('Silent refresh failed');
        }
    }, []);

    return (
        <ProductsContext.Provider value={{ products, loading, error, refreshProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = (): ProductsContextType => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};
