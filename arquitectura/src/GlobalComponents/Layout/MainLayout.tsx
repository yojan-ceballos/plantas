import React, { useState } from 'react';
import Navbar from '../Navigation/Navbar';
import Footer from './Footer';
import CartSideOver from '../Cart/CartSideOver';
import '../../Pages/Home/Components/HomeSections.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-body)' }}>
            <Navbar onCartOpen={() => setIsCartOpen(true)} />
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            <Footer />
            <CartSideOver isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
};

export default MainLayout;
