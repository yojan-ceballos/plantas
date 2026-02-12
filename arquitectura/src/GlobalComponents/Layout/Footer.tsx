import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div>
                        <h4 className="footer__col-title">Shop</h4>
                        <div className="footer__links">
                            <Link to="/shop" className="footer__link">New Arrivals</Link>
                            <Link to="/shop" className="footer__link">Plants</Link>
                            <Link to="/shop" className="footer__link">Pots</Link>
                            <Link to="/shop" className="footer__link">Care</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="footer__col-title">Company</h4>
                        <div className="footer__links">
                            <Link to="/about" className="footer__link">About Us</Link>
                            <Link to="/about" className="footer__link">Sustainability</Link>
                            <Link to="/about" className="footer__link">Careers</Link>
                            <Link to="/about" className="footer__link">Press</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="footer__col-title">Support</h4>
                        <div className="footer__links">
                            <Link to="/about" className="footer__link">FAQ</Link>
                            <Link to="/about" className="footer__link">Shipping & Returns</Link>
                            <Link to="/about" className="footer__link">Plant Care Guide</Link>
                            <Link to="/about" className="footer__link">Contact</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="footer__col-title">Follow Us</h4>
                        <div className="footer__social">
                            <a href="#" className="footer__social-link">📷</a>
                            <a href="#" className="footer__social-link">🐦</a>
                            <a href="#" className="footer__social-link">📌</a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">© 2026 Botanica Premium Store. All rights reserved.</p>
                    <div className="footer__legal">
                        <a href="#" className="footer__legal-link">Privacy Policy</a>
                        <a href="#" className="footer__legal-link">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
