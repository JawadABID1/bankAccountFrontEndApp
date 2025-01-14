import React from 'react';

// Define types for the Button component's props
interface ButtonProps {
    label: string;            // Text to display inside the button
    onClick: () => void;      // Click handler function
    type?: 'button' | 'submit' | 'reset'; // HTML button type, defaults to 'button'
    disabled?: boolean;       // Optional prop for disabling the button
    className?: string;       // Optional CSS class for custom styling
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // Bootstrap variant
    size?: 'sm' | 'lg';       // Optional size for the button
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           type = 'button',         // Default to 'button'
                                           disabled = false,        // Default to not disabled
                                           className = '',          // Default to empty class name
                                           variant = 'primary',     // Default to 'primary' variant
                                           size = '',               // Default to no size
                                       }) => {
    // Combine Bootstrap classes with additional class names
    const buttonClass = `btn btn-${variant} ${size ? `btn-${size}` : ''} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClass}
        >
            {label}
        </button>
    );
};

export default Button;
