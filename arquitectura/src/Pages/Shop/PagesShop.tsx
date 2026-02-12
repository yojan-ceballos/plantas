import React, { useState, useMemo } from 'react';
import MainLayout from '../../GlobalComponents/Layout/MainLayout';
import Filters from './Components/Filters';
import ProductGrid from './Components/ProductGrid';
import { useProducts } from '../../Context/ProductsContext';
import './Shop.css';

const PagesShop: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const { products, loading } = useProducts();

    const filteredProducts = useMemo(() => {
        if (loading) return [];
        let result = activeCategory === 'All'
            ? products
            : products.filter(p => p.category === activeCategory);

        switch (sortBy) {
            case 'price-asc':
                return [...result].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...result].sort((a, b) => b.price - a.price);
            case 'newest':
                return [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            default:
                return result;
        }
    }, [activeCategory, sortBy]);

    return (
        <MainLayout>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1rem', paddingTop: '5rem', width: '100%' }}>
                {/* Page Header */}
                <div className="shop-header">
                    <div className="shop-header__inner">
                        <div>
                            <h1 className="shop-header__title">Indoor Jungle</h1>
                            <p className="shop-header__subtitle">Curated selection of premium foliage for modern spaces.</p>
                        </div>
                        <div className="shop-header__sort">
                            <span className="shop-header__sort-label">Sort by:</span>
                            <select
                                className="shop-header__select"
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                            >
                                <option value="featured">Featured</option>
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="shop-layout">
                    <Filters
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />
                    <ProductGrid products={filteredProducts} />
                </div>
            </div>
        </MainLayout>
    );
};

export default PagesShop;
