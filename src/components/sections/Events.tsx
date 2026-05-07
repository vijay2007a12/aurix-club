import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Badge, Divider } from '../ui/Common';
import { InteractiveCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { eventManager, Event } from '../../utils/eventManager';
import { Calendar, MapPin, Users } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [events] = useState<Event[]>(eventManager.getAllEvents());

  const categories = ['hackathon', 'workshop', 'seminar', 'community'];

  const filteredEvents = selectedCategory
    ? events.filter((e) => e.category === selectedCategory)
    : events;

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCapacityPercentage = (registered: number, capacity: number) => {
    return Math.round((registered / capacity) * 100);
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
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span>
                      {event.registered} / {event.capacity} registered
                    </span>
                  </div>
                </div>

                {/* Capacity Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">Capacity</span>
                    <span className="text-xs text-accent">
                      {getCapacityPercentage(event.registered, event.capacity)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${getCapacityPercentage(event.registered, event.capacity)}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-accent to-purple-500"
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">{event.description}</p>

                <Button
                  onClick={scrollToApply}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Apply Now
                </Button>
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
