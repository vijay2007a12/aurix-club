import React from 'react';
import { SectionTitle, Divider } from '../ui/Common';
import { Card } from '../ui/Card';
import { Sparkles, Users, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="About"
          highlight="Aurix Club"
          subtitle="A student-led innovation community for learning, building and leading together."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="glass-dark p-8">
            <div className="text-4xl text-accent mb-4">
              <Users />
            </div>
            <h3 className="text-2xl font-bold mb-3">Community First</h3>
            <p className="text-gray-400">
              Aurix is built by students, for students — creating a space where collaborators, makers and leaders thrive.
            </p>
          </Card>

          <Card className="glass-dark p-8">
            <div className="text-4xl text-accent mb-4">
              <BookOpen />
            </div>
            <h3 className="text-2xl font-bold mb-3">Learn by Doing</h3>
            <p className="text-gray-400">
              We run workshops, hackathons and project sprints that help members gain practical technical and leadership experience.
            </p>
          </Card>

          <Card className="glass-dark p-8">
            <div className="text-4xl text-accent mb-4">
              <Sparkles />
            </div>
            <h3 className="text-2xl font-bold mb-3">Mission & Vision</h3>
            <p className="text-gray-400">
              Our mission is to empower campus innovators through elite programming, teamwork and future-ready club experiences.
            </p>
          </Card>
        </div>

        <Divider className="mt-16" />
      </div>
    </section>
  );
};
