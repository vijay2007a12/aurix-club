import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle, Divider } from '../ui/Common';
import { ApplyForm, ApplyFormData } from '../ui/Form';
import { CheckCircle2 } from 'lucide-react';

export const ApplySection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (data: ApplyFormData) => {
    console.log('Form submitted:', data);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="apply" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-primary overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle
          title="Join"
          highlight="Aurix Club"
          subtitle="Become part of a community of innovators, creators and future leaders."
        />

        <Divider className="mb-12" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-lg rounded-2xl p-8 md:p-12"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="text-6xl text-success mb-4"
                >
                  <CheckCircle2 />
                </motion.div>
                <h3 className="text-2xl font-bold text-center mb-2">Application Submitted!</h3>
                <p className="text-gray-400 text-center">
                  Thank you for your interest. We'll be in touch shortly.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ApplyForm onSubmit={handleFormSubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
