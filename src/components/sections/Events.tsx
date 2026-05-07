import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SectionTitle, Badge, Divider } from '../ui/Common';
import { InteractiveCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { useAuth } from '../../context/AuthContext';

export const EventsSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { events } = useEvents();

  const categories = Array.from(new Set(events.map((event) => event.category))).filter(Boolean);

  const filteredEvents = selectedCategory
    ? events.filter((e) => e.category === selectedCategory)
    : events;

  const openRegistration = () => {
    if (user) {
      navigate('/dashboard');
      return;
    }

    navigate('/signup');
  };

  return (
    <section id="events" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary to-secondary">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Upcoming" highlight="Events" subtitle="Join our community of innovators" />

        <Divider className="mb-12" />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex gap-3 justify-center flex-wrap mb-12"
        >
          <Button
            variant={selectedCategory === null ? 'primary' : 'secondary'}
            onClick={() => setSelectedCategory(null)}
            size="sm"
          >
            All Events
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'primary' : 'secondary'}
              onClick={() => setSelectedCategory(cat)}
              size="sm"
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <InteractiveCard key={event.id} delay={index * 0.1}>
              <div className="relative h-48 overflow-hidden rounded-t-xl mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Badge label={event.category} className="absolute top-4 left-4 capitalize" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>

                <div className="space-y-3 mb-4 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{event.registrationOpen ? 'Registration open' : 'Registration closed'}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Status</span>
                    <span className="text-xs text-accent">{event.registrationOpen ? 'Live' : 'Closed'}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: event.registrationOpen ? '82%' : '28%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-accent to-purple-500"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">{event.description}</p>

                <motion.button
                  type="button"
                  disabled={!event.registrationOpen}
                  onClick={openRegistration}
                  whileHover={event.registrationOpen ? { scale: 1.02 } : undefined}
                  whileTap={event.registrationOpen ? { scale: 0.98 } : undefined}
                  className={`w-full rounded-lg border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    event.registrationOpen
                      ? 'border-[#f8e68f]/70 bg-gradient-to-r from-[#fff1a8] via-[#d4af37] to-[#b08a1f] text-[#090701] shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/35'
                      : 'border-[#d4af37]/20 bg-[#d4af37]/10 text-[#8a7a47] cursor-not-allowed'
                  }`}
                >
                  {event.registrationOpen ? 'Apply/Register' : 'Registration Closed'}
                </motion.button>
              </div>
            </InteractiveCard>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">No events found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
