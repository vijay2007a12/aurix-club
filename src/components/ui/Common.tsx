import React from 'react';
import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useAnimations';

interface StatsProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: React.ReactNode;
}

export const StatCounter: React.FC<StatsProps> = ({ label, value, suffix = '', icon }) => {
  const ref = useCountUp(typeof value === 'string' ? parseInt(value) : value, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      {icon && <div className="mb-3 text-3xl text-accent">{icon}</div>}
      <div className="text-4xl font-bold gradient-text mb-2">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  );
};

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  highlight?: string;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  highlight,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        {title}
        {highlight && <span className="gradient-text"> {highlight}</span>}
      </h2>
      {subtitle && <p className="text-xl text-gray-400">{subtitle}</p>}
    </motion.div>
  );
};

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  icon,
  className = '',
}) => {
  const variants = {
    primary: 'bg-accent/20 text-accent border border-accent/30',
    secondary: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    success: 'bg-success/20 text-success border border-success/30',
  };

  return (
    <span
      className={`
        inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </span>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="glass-dark rounded-xl p-6 hover:shadow-glow-cyan transition-all duration-300"
    >
      <div className="text-3xl text-accent mb-3">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

interface TimelineItemProps {
  title: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  date,
  icon,
  isLast = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full glass-dark flex items-center justify-center text-accent text-xl mb-4">
          {icon}
        </div>
        {!isLast && <div className="w-0.5 h-24 bg-gradient-to-b from-accent to-transparent" />}
      </div>
      <div className="pb-12">
        <p className="text-sm text-accent font-semibold mb-1">{date}</p>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-2 border-accent/30 border-t-accent rounded-full`}
    />
  );
};

interface PremiumLoadingProps {
  show: boolean;
}

export const PremiumLoading: React.FC<PremiumLoadingProps> = ({ show }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/80 backdrop-blur-lg"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent to-purple-500 blur-xl opacity-50" />
        <div className="w-20 h-20 rounded-full border-2 border-transparent border-t-accent border-r-purple-500 absolute inset-0 animate-spin" />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center mt-12 text-accent font-semibold"
        >
          Loading...
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Divider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 0.8 }}
      className={`h-px bg-gradient-to-r from-transparent via-accent to-transparent ${className}`}
    />
  );
};
