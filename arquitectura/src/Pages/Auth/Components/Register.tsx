import React, { useState } from 'react';
import Button from '../../../GlobalComponents/UI/Button';
import { motion } from 'framer-motion';

interface RegisterProps {
    onSwitch: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitch }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('Registration simulated!');
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto p-8 bg-[var(--bg-surface)] rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]"
        >
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-md border border-[var(--color-gray-300)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-md border border-[var(--color-gray-300)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">Password</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-md border border-[var(--color-gray-300)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <Button type="submit" className="w-full" isLoading={loading}>
                    Sign Up
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-[var(--color-gray-500)]">
                Already have an account?{' '}
                <button
                    onClick={onSwitch}
                    className="text-[var(--color-primary)] font-medium hover:underline"
                >
                    Log in
                </button>
            </div>
        </motion.div>
    );
};

export default Register;
