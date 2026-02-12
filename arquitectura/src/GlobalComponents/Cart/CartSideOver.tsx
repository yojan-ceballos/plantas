import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../Context/ProductsContext';
import { useCart, FREE_SHIPPING_THRESHOLD } from '../../Context/CartContext';
import './CartSideOver.css';

interface CartSideOverProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartSideOver: React.FC<CartSideOverProps> = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart, updateQuantity, subtotal, addToCart } = useCart();

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

    // Upsell products (not in cart)
    const { products: availableProducts } = useProducts();
    const cartIds = cartItems.map(i => i.product.id);
    const upsellProducts = availableProducts.filter(p => !cartIds.includes(p.id)).slice(0, 2);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="cart-overlay">
                    {/* Backdrop */}
                    <motion.div
                        className="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="cart-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Header */}
                        <div className="cart-drawer__header">
                            <h2 className="cart-drawer__title">Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                            <button className="cart-drawer__close" onClick={onClose}>
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="cart-drawer__content">
                            {/* Shipping Progress */}
                            <div className="cart-shipping">
                                <div className="cart-shipping__info">
                                    <span>
                                        {remaining > 0
                                            ? `$${remaining.toFixed(2)} away from free shipping`
                                            : '🎉 You qualify for free shipping!'
                                        }
                                    </span>
                                    <span className="cart-shipping__percent">{Math.round(shippingProgress)}%</span>
                                </div>
                                <div className="cart-shipping__bar">
                                    <div
                                        className="cart-shipping__bar-fill"
                                        style={{ width: `${shippingProgress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Items */}
                            <ul className="cart-items">
                                {cartItems.map((item, index) => (
                                    <motion.li
                                        key={item.product.id}
                                        className="cart-item"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                    >
                                        <div className="cart-item__image-box">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="cart-item__image"
                                            />
                                        </div>
                                        <div className="cart-item__details">
                                            <div>
                                                <div className="cart-item__top">
                                                    <h3 className="cart-item__name">{item.product.name}</h3>
                                                    <p className="cart-item__price">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                                {item.potStyle && (
                                                    <p className="cart-item__variant">{item.potStyle}</p>
                                                )}
                                            </div>
                                            <div className="cart-item__bottom">
                                                <div className="cart-qty">
                                                    <button className="cart-qty__btn" onClick={() => updateQuantity(item.product.id, -1)}>
                                                        <span className="material-icons">remove</span>
                                                    </button>
                                                    <span className="cart-qty__value">{item.quantity}</span>
                                                    <button className="cart-qty__btn" onClick={() => updateQuantity(item.product.id, 1)}>
                                                        <span className="material-icons">add</span>
                                                    </button>
                                                </div>
                                                <button
                                                    className="cart-item__remove"
                                                    onClick={() => removeFromCart(item.product.id)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Upsell */}
                            {upsellProducts.length > 0 && (
                                <div className="cart-upsell">
                                    <h4 className="cart-upsell__title">Complete your care routine</h4>
                                    <div className="cart-upsell__scroll">
                                        {upsellProducts.map(p => (
                                            <div key={p.id} className="cart-upsell__item">
                                                <img src={p.image} alt={p.name} className="cart-upsell__img" />
                                                <p className="cart-upsell__name">{p.name}</p>
                                                <div className="cart-upsell__footer">
                                                    <span className="cart-upsell__price">${p.price.toFixed(2)}</span>
                                                    <button className="cart-upsell__add" onClick={() => addToCart(p)}>
                                                        <span className="material-icons">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="cart-drawer__footer">
                            <div className="cart-summary__row">
                                <p>Subtotal</p>
                                <p className="cart-summary__price">${subtotal.toFixed(2)}</p>
                            </div>
                            <p className="cart-summary__shipping">
                                <span className="material-icons">local_shipping</span>
                                Shipping and taxes calculated at checkout.
                            </p>
                            <button className="cart-checkout-btn">Checkout</button>
                            <div className="cart-payment-icons">
                                <span className="cart-payment-icon">VISA</span>
                                <span className="cart-payment-icon">MC</span>
                                <span className="cart-payment-icon">PAYPAL</span>
                                <span className="cart-payment-icon">APPLE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CartSideOver;
