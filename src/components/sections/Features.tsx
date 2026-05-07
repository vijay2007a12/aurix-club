import React from 'react';
import { SectionTitle, FeatureItem, Divider } from '../ui/Common';
import { Zap, BookOpen, Layers, Users, Sparkles, Globe } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Hackathons',
      description: 'Organized coding competitions that challenge students to solve real problems under pressure.',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Technical Workshops',
      description: 'Hands-on sessions led by student mentors and industry guests across emerging technologies.',
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Real-world Projects',
      description: 'Collaborative build labs where members design polished applications, systems, and prototypes.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Collaboration',
      description: 'Cross-functional teams work together on creative solutions and peer-led innovation.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Networking Opportunities',
      description: 'Connect with student leaders, alumni, and mentors through curated club events.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Innovation Challenges',
      description: 'Themed sprints designed to unlock new ideas and build prototypes in fast-paced cycles.',
    },
  ];

  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-primary overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle title="What We" highlight="Do" subtitle="Student-driven labs, competitions, and engineering experiences." />

        <Divider className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
