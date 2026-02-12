import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface CategoryItem {
    title: string;
    cta: string;
    image: string;
    link: string;
}

const categoriesData: CategoryItem[] = [
    {
        title: 'Live Plants',
        cta: 'Explore Collection',
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800',
        link: '/shop',
    },
    {
        title: 'Nutrition & Care',
        cta: 'Shop Essentials',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
        link: '/shop',
    },
    {
        title: 'Designer Pots',
        cta: 'View Ceramics',
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800',
        link: '/shop',
    },
];

const Categories: React.FC = () => {
    return (
        <section className="categories">
            <div className="categories__container">
                <div className="categories__header">
                    <div>
                        <h2 className="categories__title">Curated Categories</h2>
                        <p className="categories__subtitle">Everything you need to create your personal sanctuary.</p>
                    </div>
                    <Link to="/shop" className="categories__view-all">
                        View all collections
                        <span className="material-icons">arrow_forward</span>
                    </Link>
                </div>

                <div className="categories__grid">
                    {categoriesData.map((cat, index) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <Link to={cat.link} className="category-card">
                                <img src={cat.image} alt={cat.title} className="category-card__image" />
                                <div className="category-card__overlay"></div>
                                <div className="category-card__content">
                                    <div>
                                        <h3 className="category-card__title">{cat.title}</h3>
                                        <p className="category-card__cta">{cat.cta}</p>
                                    </div>
                                    <div className="category-card__arrow">
                                        <span className="material-icons">arrow_forward</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="categories__view-all-mobile">
                    <Link to="/shop">
                        View all collections
                        <span className="material-icons" style={{ fontSize: '1rem', marginLeft: '0.25rem' }}>arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Categories;
