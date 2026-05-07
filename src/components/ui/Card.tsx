import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useAnimations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = true,
  onClick,
}) => {
  const ref = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className={`
        glass-dark rounded-xl p-6 transition-all duration-500
        ${hoverable ? 'hover:shadow-glow-cyan cursor-pointer hover:scale-105 hover:border-accent/50' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

interface GradientCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  stats?: { label: string; value: string }[];
  className?: string;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  title,
  description,
  icon,
  image,
  stats,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className={`
        relative rounded-xl overflow-hidden group
        ${className}
      `}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary to-purple-900/20" />

      <div className="relative z-10 glass-dark rounded-xl p-6 h-full">
        {icon && <div className="mb-4 text-2xl text-accent">{icon}</div>}

        <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>

        {stats && (
          <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-accent/20">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xs text-gray-400">{stat.label}</p>
                <p className="text-lg font-bold text-accent">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      transition={{ delay }}
      className={`
        glass-dark rounded-xl overflow-hidden
        hover:shadow-glow-cyan transition-all duration-300
        ${className}
      `}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export const DomainCard: React.FC<{
  title: string;
  description: string;
  icon?: React.ReactNode;
}> = ({ title, description, icon }) => {
  return (
    <GradientCard
      title={title}
      description={description}
      icon={icon}
      className="p-6 bg-gradient-to-br from-[#543a00]/20 to-[#2a1b00]/20 hover:from-[#6f5300]/30 hover:to-[#3b2600]/30"
    />
  );
};
