import React, { useState } from 'react';
import { useCart } from '../../../Context/CartContext';
import { type Product } from '../../../Data/products';

interface ProductInfoProps {
    product: Product;
}

const accordionItems = [
    {
        title: 'Shipping & Delivery',
        content: 'Free shipping on orders over $120. Standard delivery takes 3-5 business days. Express options available at checkout.',
    },
    {
        title: '30-Day Guarantee',
        content: 'Every plant is backed by our 30-day health guarantee. If your plant doesn\'t thrive, we\'ll replace it free of charge.',
    },
    {
        title: 'Care Instructions',
        content: 'Detailed care card included with every order. Our plant experts are available via chat for personalized care advice.',
    },
];

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    const [selectedPot, setSelectedPot] = useState(0);
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const { addToCart } = useCart();

    const potOptions = [
        { name: 'Ceramic White', color: '#f1f5f9' },
        { name: 'Matte Black', color: '#1e293b' },
    ];

    return (
        <div className="pdp-info">
            <p className="pdp-info__category">{product.category}</p>
            <h1 className="pdp-info__title">{product.name}</h1>
            <p className="pdp-info__subtitle">{product.description}</p>

            {/* Rating */}
            <div className="pdp-rating">
                <div className="pdp-rating__stars">
                    {[1, 2, 3, 4, 5].map(i => (
                        <span key={i} className="material-icons pdp-rating__star">
                            {i <= 4 ? 'star' : 'star_half'}
                        </span>
                    ))}
                </div>
                <span className="pdp-rating__count">4.8 (127 reviews)</span>
            </div>

            {/* Price */}
            <p className="pdp-info__price">${product.price.toFixed(2)}</p>

            {/* Care Stats */}
            <div className="pdp-care">
                <div className="pdp-care__card">
                    <span className="material-icons pdp-care__icon">wb_sunny</span>
                    <span className="pdp-care__label">Light</span>
                    <span className="pdp-care__value">Bright Indirect</span>
                </div>
                <div className="pdp-care__card">
                    <span className="material-icons pdp-care__icon">water_drop</span>
                    <span className="pdp-care__label">Water</span>
                    <span className="pdp-care__value">Weekly</span>
                </div>
                <div className="pdp-care__card">
                    <span className="material-icons pdp-care__icon">pets</span>
                    <span className="pdp-care__label">Safety</span>
                    <span className="pdp-care__value">Pet Safe</span>
                </div>
            </div>

            {/* Pot Selector */}
            <div className="pdp-pots">
                <h3 className="pdp-pots__title">Choose your pot</h3>
                <div className="pdp-pots__options">
                    {potOptions.map((pot, i) => (
                        <button
                            key={pot.name}
                            className={`pdp-pots__option ${i === selectedPot ? 'pdp-pots__option--active' : ''}`}
                            onClick={() => setSelectedPot(i)}
                        >
                            <span
                                className="pdp-pots__swatch"
                                style={{ background: pot.color }}
                            />
                            {pot.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="pdp-actions">
                <button
                    className="pdp-btn-primary"
                    onClick={() => addToCart(product)}
                >
                    <span className="material-icons">shopping_bag</span>
                    Add to Cart — ${product.price.toFixed(2)}
                </button>
                <button className="pdp-btn-secondary">
                    <span className="material-icons">menu_book</span>
                    Care Guide
                </button>
            </div>

            {/* Accordion */}
            <div className="pdp-accordion">
                {accordionItems.map((item, i) => (
                    <div className="pdp-accordion__item" key={i}>
                        <button
                            className={`pdp-accordion__trigger ${openAccordion === i ? 'pdp-accordion__trigger--open' : ''}`}
                            onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                        >
                            {item.title}
                            <span className="material-icons">expand_more</span>
                        </button>
                        {openAccordion === i && (
                            <div className="pdp-accordion__body">{item.content}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductInfo;
