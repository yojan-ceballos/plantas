import React, { useState } from 'react';
import MainLayout from '../../GlobalComponents/Layout/MainLayout';
import Section from '../../GlobalComponents/UI/Section';
import Login from './Components/Login';
import Register from './Components/Register';
import { AnimatePresence } from 'framer-motion';

const PagesAuth: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <MainLayout>
            <div className="bg-[var(--bg-muted)] min-h-[calc(100vh-80px-300px)] flex items-center justify-center py-12 md:py-20">
                <Section className="!py-0">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <Login key="login" onSwitch={() => setIsLogin(false)} />
                        ) : (
                            <Register key="register" onSwitch={() => setIsLogin(true)} />
                        )}
                    </AnimatePresence>
                </Section>
            </div>
        </MainLayout>
    );
};

export default PagesAuth;
