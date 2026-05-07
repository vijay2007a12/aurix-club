import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import { Button, IconButton } from '../ui/Button';
import { Logo } from '../ui/Logo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', tooltip: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', tooltip: 'LinkedIn' },
    { icon: <Github className="w-5 h-5" />, href: '#', tooltip: 'GitHub' },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@aurixclub.edu', tooltip: 'Email' },
  ];

  const footerLinks = [
    { title: 'Club', items: ['About Aurix', 'Membership', 'Events', 'Teams'] },
    { title: 'Programs', items: ['Hackathons', 'Workshops', 'Projects', 'Challenges'] },
    { title: 'Connect', items: ['Mentors', 'Partners', 'Alumni', 'Contact'] },
    { title: 'Legal', items: ['Code of Conduct', 'Privacy', 'Terms', 'Campus Policy'] },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative bg-gradient-to-b from-primary to-black border-t border-accent/10 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <div className="mb-4 inline-flex items-center gap-3">
              <Logo size={44} hideText={false} />
            </div>
            <p className="text-sm text-[#d6c684]">
              A premium student innovation club creating immersive learning and leadership opportunities.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <IconButton
                  key={index}
                  icon={link.icon}
                  tooltip={link.tooltip}
                  onClick={() => link.href && window.open(link.href)}
                />
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div
              key={colIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-white">{column.title}</h4>
              <ul className="space-y-2">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      {item}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-8"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-[#d6c684]">
            © {currentYear} Aurix Club. All rights reserved. Proudly built for student innovators.
          </div>

          <Button onClick={scrollToTop} variant="secondary" size="sm">
            Back to Top ↑
          </Button>
        </motion.div>
      </div>
    </footer>
  );
};
