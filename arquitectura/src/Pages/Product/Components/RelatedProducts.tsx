import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { products } from '../../../Data/products';

interface RelatedProductsProps {
    currentProductId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
    const navigate = useNavigate();

    const related = products.filter(p => p.id !== currentProductId).slice(0, 4);

    if (related.length === 0) return null;

    return (
        <section className="pdp-related">
            <div className="pdp-related__header">
                <h2 className="pdp-related__title">Complete Your Jungle</h2>
                <button className="pdp-related__link" onClick={() => navigate('/shop')}>
                    View all →
                </button>
            </div>
            <div className="pdp-related__grid">
                {related.map((product, index) => (
                    <motion.div
                        key={product.id}
                        className="shop-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        <div className="shop-card__image-box">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="shop-card__image"
                            />
                            {product.tag && (
                                <div className={`shop-card__badge ${product.tag === 'Best Seller' ? 'shop-card__badge--best' :
                                    product.tag === 'Sale' ? 'shop-card__badge--sale' :
                                        'shop-card__badge--new'
                                    }`}>
                                    {product.tag}
                                </div>
                            )}
                        </div>
                        <div className="shop-card__info">
                            <h3 className="shop-card__name">{product.name}</h3>
                            <div className="shop-card__prices">
                                <span className="shop-card__price">${product.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RelatedProducts;
