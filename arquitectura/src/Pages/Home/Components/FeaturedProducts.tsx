import React from 'react';
import { motion } from 'framer-motion';
import { useProducts } from '../../../Context/ProductsContext';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts: React.FC = () => {
    const navigate = useNavigate();
    const { products } = useProducts();
    const featured = products.slice(0, 4);

    return (
        <section className="products-section">
            <div className="products-section__container">
                <h2 className="products-section__title">Weekly Favorites</h2>
                <div className="products-section__grid">
                    {featured.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="product-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <div className="product-card__image-wrapper">
                                {product.isNew && (
                                    <span className="product-card__tag">Best Seller</span>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-card__image"
                                />
                                <button
                                    className="product-card__add-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // quick add logic
                                    }}
                                >
                                    <span className="material-icons">add</span>
                                </button>
                            </div>
                            <h3 className="product-card__name">{product.name}</h3>
                            <p className="product-card__species">{product.category}</p>
                            <p className="product-card__price">${product.price.toFixed(2)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
