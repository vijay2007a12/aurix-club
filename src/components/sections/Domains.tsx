import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Divider } from '../ui/Common';
import { DomainCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { Cpu, Megaphone, Image, HardDrive, BarChart2 } from 'lucide-react';

export const DomainsSection: React.FC = () => {
  const [domains] = useState([
    {
      title: 'Tech',
      description: 'Build software, systems, and product prototypes with guided peer mentorship.',
      icon: <Cpu className="w-8 h-8" />,
    },
    {
      title: 'PR & Outreach',
      description: 'Amplify Aurix through campus campaigns, community events, and partner relations.',
      icon: <Megaphone className="w-8 h-8" />,
    },
    {
      title: 'Media & Design',
      description: 'Create striking visuals, video content and branding for club projects and showcases.',
      icon: <Image className="w-8 h-8" />,
    },
    {
      title: 'Hardware',
      description: 'Design embedded systems, robotics experiments, and hands-on engineering builds.',
      icon: <HardDrive className="w-8 h-8" />,
    },
    {
      title: 'Marketing',
      description: 'Shape the club story, recruit talent, and launch campaigns that attract future leaders.',
      icon: <BarChart2 className="w-8 h-8" />,
    },
  ]);

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Aurix"
          highlight="Domains"
          subtitle="Live your role in a student-led innovation community."
        />

        <Divider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <DomainCard {...domain} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button size="lg" onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}>
            Join a Domain
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
