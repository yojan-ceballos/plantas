import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero__container">
                <div className="hero__grid">
                    {/* Text Content */}
                    <motion.div
                        className="hero__content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero__badge">
                            <span className="hero__badge-dot"></span>
                            New Collection
                        </div>

                        <h1 className="hero__title">
                            Naturaleza en su <br />
                            <span className="hero__title-muted">estado más puro</span>
                        </h1>

                        <p className="hero__description">
                            Elevate your living space with sustainably grown botanicals.
                            We curate the rarest specimens for the modern home.
                        </p>

                        <div className="hero__buttons">
                            <Link to="/shop" className="hero__btn-primary">
                                Shop Collection
                            </Link>
                            <Link to="/about" className="hero__btn-secondary">
                                View Lookbook
                            </Link>
                        </div>

                        <div className="hero__trust">
                            <div className="hero__trust-item">
                                <span className="material-icons hero__trust-icon">verified</span>
                                <span>Ethically Sourced</span>
                            </div>
                            <div className="hero__trust-item">
                                <span className="material-icons hero__trust-icon">local_shipping</span>
                                <span>Express Delivery</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image */}
                    <motion.div
                        className="hero__image-wrapper"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="hero__glow"></div>
                        <div className="hero__image-box">
                            <img
                                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=800"
                                alt="Monstera Deliciosa plant"
                                className="hero__image"
                            />
                            {/* Floating Card */}
                            <div className="hero__floating-card">
                                <div className="hero__floating-inner">
                                    <div className="hero__floating-icon-box">
                                        <span className="material-icons hero__floating-icon">water_drop</span>
                                    </div>
                                    <div>
                                        <p className="hero__floating-label">Care Level</p>
                                        <p className="hero__floating-value">Beginner Friendly</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
