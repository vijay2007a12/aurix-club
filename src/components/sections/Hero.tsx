import React from 'react';
import { motion } from 'framer-motion';
import { HeroScene } from '../3d/HeroScene';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';
import { useMouseFollowGlow } from '../../hooks/useAnimations';

export const HeroSection: React.FC = () => {
  const glowRef = useMouseFollowGlow();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Dynamic glow follow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-96 h-96 rounded-full bg-gradient-to-r from-accent/20 to-purple-500/20 blur-3xl -z-10"
      />

      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <HeroScene className="w-full h-full" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <div className="relative inline-flex items-center justify-center w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-black/75 border border-[#d4af37]/30 shadow-[0_0_90px_rgba(212,175,55,0.3)]" />
            <div className="liquid-drop liquid-drop-1" />
            <div className="liquid-drop liquid-drop-2" />
            <div className="liquid-drop liquid-drop-3" />
            <Logo size={96} hideText />
          </div>

          <div className="text-sm uppercase tracking-[0.45em] text-[#f4e9b2] mb-4">
            AURIX CLUB
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-display leading-tight"
          >
            Build. Innovate. Lead.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[#d9c77d] mb-10 max-w-3xl mx-auto"
          >
            Aurix Club empowers students through hackathons, workshops, technical projects,
            innovation challenges and collaborative learning experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button onClick={() => scrollToSection('events')} size="lg">
              Explore Events
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('apply')} size="lg">
              Join Aurix
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-[#f7e082] text-2xl"
        >
          ↓
        </motion.div>
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#1a150e]/70 to-black pointer-events-none" />
    </section>
  );
};
