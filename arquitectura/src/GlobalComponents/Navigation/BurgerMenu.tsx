import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface BurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
    const location = useLocation();

    useEffect(() => { onClose(); }, [location, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const menuVariants = {
        closed: {
            opacity: 0, x: '100%',
            transition: { duration: 0.3, ease: 'easeInOut', staggerChildren: 0.05, staggerDirection: -1 } as const,
        },
        open: {
            opacity: 1, x: 0,
            transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1, delayChildren: 0.2 } as const,
        },
    };

    const itemVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 },
    };

    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/shop', label: 'Shop' },
        { path: '/about', label: 'Our Story' },
        { path: '/journal', label: 'Journal' },
        { path: '/auth', label: 'Account' },
    ];

    const backdropStyle: React.CSSProperties = {
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 80,
    };

    const panelStyle: React.CSSProperties = {
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '80%', maxWidth: '384px',
        background: 'var(--bg-surface)',
        zIndex: 90,
        boxShadow: 'var(--shadow-xl)',
        padding: '2rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
    };

    const closeStyle: React.CSSProperties = {
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        padding: '0.5rem', borderRadius: 'var(--radius-full)',
        transition: 'background 0.2s',
        display: 'flex', alignItems: 'center',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={backdropStyle}
                    />
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        style={panelStyle}
                    >
                        <button onClick={onClose} style={closeStyle} aria-label="Close Menu">
                            <span className="material-icons">close</span>
                        </button>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {menuItems.map(item => (
                                <motion.div key={item.path} variants={itemVariants}>
                                    <Link
                                        to={item.path}
                                        style={{
                                            fontSize: '1.875rem',
                                            fontWeight: 500,
                                            display: 'block',
                                            transition: 'color 0.3s',
                                            color: location.pathname === item.path
                                                ? 'var(--color-primary)'
                                                : 'var(--color-black)',
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <motion.div
                            variants={itemVariants}
                            style={{
                                marginTop: '3rem', paddingTop: '3rem',
                                borderTop: '1px solid var(--color-gray-100)',
                            }}
                        >
                            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)', marginBottom: '1rem' }}>
                                Follow us
                            </p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: 32, height: 32, background: 'var(--color-gray-100)', borderRadius: '50%' }} />
                                <div style={{ width: 32, height: 32, background: 'var(--color-gray-100)', borderRadius: '50%' }} />
                                <div style={{ width: 32, height: 32, background: 'var(--color-gray-100)', borderRadius: '50%' }} />
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BurgerMenu;
