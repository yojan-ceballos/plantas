import React from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../../Data/products';
import Button from './Button';

interface CardProps {
    product: Product;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ product, onClick }) => {
    return (
        <motion.div
            className="group relative bg-[var(--bg-surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
        >
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-gray-100)]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                {product.isNew && (
                    <div className="absolute top-3 left-3 bg-[var(--color-accent)] text-black text-[10px] uppercase font-bold px-2 py-1 rounded-full">
                        New
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* Quick Add Button - visible on hover */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                        className="w-full bg-white/90 backdrop-blur-sm text-black hover:bg-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Add to cart logic would go here
                            console.log('Quick add:', product.name);
                        }}
                    >
                        Add to Bag
                    </Button>
                </div>
            </div>

            <div className="p-4" onClick={onClick}>
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-medium text-[var(--color-black)] font-serif cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                        {product.name}
                    </h3>
                    <span className="text-lg font-semibold text-[var(--color-primary)]">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-[var(--color-gray-500)] mb-2">{product.category}</p>
            </div>
        </motion.div>
    );
};

export default Card;
