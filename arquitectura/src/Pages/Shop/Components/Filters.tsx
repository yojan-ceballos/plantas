import React from 'react';
import { categories } from '../../../Data/categories';
import { useProducts } from '../../../Context/ProductsContext';

interface FiltersProps {
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ activeCategory, onSelectCategory }) => {
    const { products } = useProducts();
    // Count products per category
    const allCount = products.length;
    const getCategoryCount = (name: string) => products.filter(p => p.category === name).length;

    return (
        <aside className="shop-sidebar">
            {/* Categories */}
            <div className="shop-sidebar__section">
                <h3 className="shop-sidebar__title">Categories</h3>
                <div className="shop-categories">
                    <button
                        onClick={() => onSelectCategory('All')}
                        className={`shop-category ${activeCategory === 'All' ? 'shop-category--active' : ''}`}
                    >
                        <span>All Plants</span>
                        <span className="shop-category__count">{allCount}</span>
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => onSelectCategory(cat.name)}
                            className={`shop-category ${activeCategory === cat.name ? 'shop-category--active' : ''}`}
                        >
                            <span>{cat.name}</span>
                            <span className="shop-category__count">{getCategoryCount(cat.name)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="shop-sidebar__section">
                <h3 className="shop-sidebar__title">Price Range</h3>
                <div className="shop-price-range">
                    <div className="shop-price-bar">
                        <div className="shop-price-bar__fill" style={{ width: '66%' }} />
                        <div className="shop-price-bar__thumb" style={{ left: '66%' }} />
                    </div>
                    <div className="shop-price-labels">
                        <span>$0</span>
                        <span>$120</span>
                    </div>
                </div>
            </div>

            {/* Care Level */}
            <div className="shop-sidebar__section">
                <h3 className="shop-sidebar__title">Care Level</h3>
                <div className="shop-checkboxes">
                    <label className="shop-checkbox-label">
                        <input type="checkbox" defaultChecked />
                        Beginner Friendly
                    </label>
                    <label className="shop-checkbox-label">
                        <input type="checkbox" />
                        Intermediate
                    </label>
                    <label className="shop-checkbox-label">
                        <input type="checkbox" />
                        Expert
                    </label>
                </div>
            </div>

            {/* Size */}
            <div className="shop-sidebar__section">
                <h3 className="shop-sidebar__title">Size</h3>
                <div className="shop-sizes">
                    <button className="shop-size-btn">S</button>
                    <button className="shop-size-btn shop-size-btn--active">M</button>
                    <button className="shop-size-btn">L</button>
                    <button className="shop-size-btn">XL</button>
                </div>
            </div>
        </aside>
    );
};

export default Filters;
