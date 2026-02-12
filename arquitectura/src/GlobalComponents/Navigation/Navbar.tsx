import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import { useCart } from '../../Context/CartContext';
import './Navbar.css';

interface NavbarProps {
    onCartOpen?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();

    const navLinks = [
        { path: '/shop', label: 'Shop' },
        { path: '/about', label: 'Care Guide' },
        { path: '/journal', label: 'About' },
    ];

    return (
        <>
            <nav className="navbar">
                <div className="navbar__container">
                    {/* Mobile Menu Button */}
                    <button
                        className="navbar__burger"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span className="material-icons">menu</span>
                    </button>

                    {/* Logo */}
                    <Link to="/" className="navbar__logo">
                        <div className="navbar__logo-icon">
                            <span className="material-icons" style={{ color: 'white', fontSize: '18px' }}>local_florist</span>
                        </div>
                        <span className="navbar__logo-text">Botanica</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="navbar__links">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="navbar__actions">
                        <button className="navbar__action-btn" aria-label="Search">
                            <span className="material-icons">search</span>
                        </button>
                        <button
                            className="navbar__action-btn navbar__cart-btn"
                            onClick={onCartOpen}
                            aria-label="Cart"
                        >
                            <span className="material-icons">shopping_bag</span>
                            {cartCount > 0 && (
                                <span className="navbar__cart-badge">{cartCount}</span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
            <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Navbar;
