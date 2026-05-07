import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Divider } from '../ui/Common';
import { Zap, Users, Rocket, BookOpen } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: <Zap />,
      label: 'Hackathons Hosted',
      value: 12,
      suffix: '+',
    },
    {
      icon: <Users />,
      label: 'Active Members',
      value: 180,
      suffix: '+',
    },
    {
      icon: <Rocket />,
      label: 'Projects Launched',
      value: 27,
      suffix: '+',
    },
    {
      icon: <BookOpen />,
      label: 'Workshops Delivered',
      value: 45,
      suffix: '+',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-secondary to-primary overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle title="Our" highlight="Impact" subtitle="Creating opportunities for students to learn, build and grow." />

        <Divider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-xl p-8 text-center hover:shadow-glow-cyan transition-all duration-300"
            >
              <div className="text-4xl text-accent mb-4 flex justify-center">{stat.icon}</div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
