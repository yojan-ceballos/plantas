import React from 'react';
import { motion } from 'framer-motion';

const Newsletter: React.FC = () => {
    return (
        <section className="newsletter">
            <motion.div
                className="newsletter__container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <span className="material-icons newsletter__icon">mail_outline</span>
                <h2 className="newsletter__title">Join the Green Club</h2>
                <p className="newsletter__description">
                    Receive care tips, exclusive offers, and first access to rare plant drops.
                </p>
                <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        className="newsletter__input"
                        placeholder="Your email address"
                    />
                    <button type="submit" className="newsletter__submit">
                        Subscribe
                    </button>
                </form>
                <p className="newsletter__disclaimer">We respect your privacy. Unsubscribe at any time.</p>
            </motion.div>
        </section>
    );
};

export default Newsletter;
