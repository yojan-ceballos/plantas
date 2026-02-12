import React from 'react';
import type { Product } from '../../../Data/products';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductGridProps {
    products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const navigate = useNavigate();

    if (products.length === 0) {
        return <div className="shop-empty">No products found in this category.</div>;
    }

    const getBadgeClass = (tag?: string) => {
        switch (tag) {
            case 'Best Seller': return 'shop-card__badge shop-card__badge--best';
            case 'Sale': return 'shop-card__badge shop-card__badge--sale';
            case 'New': return 'shop-card__badge shop-card__badge--new';
            default: return '';
        }
    };

    return (
        <div className="shop-grid">
            <div className="shop-grid__products">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="shop-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <div className="shop-card__image-box">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="shop-card__image"
                            />
                            {product.tag && (
                                <div className={getBadgeClass(product.tag)}>
                                    {product.tag}
                                </div>
                            )}
                            <div className="shop-card__add-overlay">
                                <button
                                    className="shop-card__add-btn"
                                    onClick={e => { e.stopPropagation(); }}
                                >
                                    <span className="material-icons">add_shopping_cart</span>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div className="shop-card__info">
                            <h3 className="shop-card__name">{product.name}</h3>
                            <p className="shop-card__care">{product.careLevel}</p>
                            <div className="shop-card__prices">
                                {product.oldPrice ? (
                                    <>
                                        <span className="shop-card__price shop-card__price--sale">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="shop-card__price--old">
                                            ${product.oldPrice.toFixed(2)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="shop-card__price">${product.price.toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pagination */}
            <div className="shop-pagination">
                <button className="shop-pagination__btn">
                    <span className="material-icons">arrow_back</span>
                    Previous
                </button>
                <div className="shop-pagination__pages">
                    <button className="shop-pagination__page shop-pagination__page--active">1</button>
                    <button className="shop-pagination__page">2</button>
                    <button className="shop-pagination__page">3</button>
                    <span className="shop-pagination__dots">...</span>
                    <button className="shop-pagination__page">8</button>
                </div>
                <button className="shop-pagination__btn">
                    Next
                    <span className="material-icons">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default ProductGrid;
