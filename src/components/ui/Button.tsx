import React from 'react';
import { useMagneticCursor } from '../../hooks/useAnimations';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  magnetic = true,
}) => {
  const ref = useMagneticCursor<HTMLButtonElement>();

  const baseStyles = 'font-semibold rounded-lg transition-all duration-300 font-display relative overflow-hidden group';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-[#f8e68f] via-[#d4af37] to-[#b08a1f] text-black hover:shadow-glow-cyan-lg transform hover:scale-105',
    secondary: 'glass text-[#f9e9ae] border border-[#d4af37]/30 hover:border-[#d4af37] hover:shadow-glow-cyan',
    ghost: 'text-[#f8e6ad] hover:text-white hover:bg-[#d4af37]/10',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      ref={magnetic ? ref : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-500" />
    </button>
  );
};

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  tooltip?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = '',
  tooltip,
}) => {
  const ref = useMagneticCursor<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      onClick={onClick}
      title={tooltip}
      className={`
        p-2 rounded-lg glass text-accent hover:text-white
        hover:shadow-glow-cyan transition-all duration-300
        hover:scale-110 ${className}
      `}
    >
      {icon}
    </button>
  );
};
