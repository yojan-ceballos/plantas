import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import '../../index.css'; // Ensure variables are available

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-[var(--btn-bg-primary)] text-[var(--btn-text-primary)] hover:bg-[var(--btn-bg-primary-hover)] shadow-lg hover:shadow-[var(--shadow-primary)]",
        secondary: "bg-[var(--btn-bg-secondary)] text-[var(--btn-text-secondary)] hover:bg-[var(--btn-bg-secondary-hover)] shadow-md",
        outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
        ghost: "text-[var(--text-primary)] hover:bg-[var(--bg-muted)]",
    };

    const sizes = {
        sm: "px-4 py-2 text-[var(--font-size-xs)]",
        md: "px-6 py-3 text-[var(--font-size-sm)]",
        lg: "px-8 py-4 text-[var(--font-size-md)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 animate-spin">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;
