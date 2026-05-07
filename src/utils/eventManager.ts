export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: 'workshop' | 'hackathon' | 'seminar' | 'community';
  capacity: number;
  registered: number;
  image: string;
}

export interface EventFilter {
  category?: string;
  month?: string;
}

class EventManager {
  private events: Event[] = [
    {
      id: '1',
      title: 'Aurix Internal Hackathon',
      date: 'May 20, 2026',
      time: '10:00 AM',
      location: 'Campus Innovation Lab',
      description: 'A fast-paced build sprint for student teams to prototype bold campus tech solutions in 24 hours.',
      category: 'hackathon',
      capacity: 120,
      registered: 86,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    },
    {
      id: '2',
      title: 'Web Development Workshop',
      date: 'May 28, 2026',
      time: '02:00 PM',
      location: 'Engineering Commons',
      description: 'Learn modern web tools, component-driven design and collaboration techniques for student projects.',
      category: 'workshop',
      capacity: 80,
      registered: 54,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
    },
    {
      id: '3',
      title: 'Robotics & Automation Bootcamp',
      date: 'June 5, 2026',
      time: '11:00 AM',
      location: 'Robotics Lab',
      description: 'Hands-on robotics design with sensors, automation firmware, and student-led prototypes.',
      category: 'seminar',
      capacity: 50,
      registered: 38,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    },
    {
      id: '4',
      title: 'UI/UX Design Sprint',
      date: 'June 12, 2026',
      time: '03:00 PM',
      location: 'Design Studio',
      description: 'A creative sprint where design and product teams refine interfaces for real campus use cases.',
      category: 'community',
      capacity: 60,
      registered: 44,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop',
    },
    {
      id: '5',
      title: 'Innovation Ideathon',
      date: 'June 22, 2026',
      time: '05:00 PM',
      location: 'Innovation Hub',
      description: 'Concept pitch event where teams shape ideas, receive mentorship, and explore campus innovation pathways.',
      category: 'community',
      capacity: 70,
      registered: 61,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop',
    },
  ];

  getAllEvents(): Event[] {
    return this.events;
  }

  getEventById(id: string): Event | undefined {
    return this.events.find((event) => event.id === id);
  }

  getEventsByCategory(category: string): Event[] {
    return this.events.filter((event) => event.category === category);
  }

  getUpcomingEvents(days: number = 30): Event[] {
    const now = new Date();
    const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    return this.events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= now && eventDate <= futureDate;
    });
  }

  filterEvents(filters: EventFilter): Event[] {
    return this.events.filter((event) => {
      if (filters.category && event.category !== filters.category) {
        return false;
      }
      if (filters.month) {
        const eventMonth = new Date(event.date).toLocaleDateString('en-US', { month: 'long' });
        if (eventMonth !== filters.month) {
          return false;
        }
      }
      return true;
    });
  }

  registerEvent(eventId: string): boolean {
    const event = this.getEventById(eventId);
    if (!event) return false;

    if (event.registered < event.capacity) {
      event.registered += 1;
      return true;
    }
    return false;
  }

  unregisterEvent(eventId: string): boolean {
    const event = this.getEventById(eventId);
    if (!event) return false;

    if (event.registered > 0) {
      event.registered -= 1;
      return true;
    }
    return false;
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }

  removeEvent(id: string): void {
    this.events = this.events.filter((event) => event.id !== id);
  }

  updateEvent(id: string, updates: Partial<Event>): void {
    const event = this.getEventById(id);
    if (event) {
      Object.assign(event, updates);
    }
  }

  getSortedEvents(sortBy: 'date' | 'popularity' = 'date'): Event[] {
    const sorted = [...this.events];

    if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => b.registered - a.registered);
    }

    return sorted;
  }

  getEventStats() {
    return {
      total: this.events.length,
      totalRegistered: this.events.reduce((sum, event) => sum + event.registered, 0),
      totalCapacity: this.events.reduce((sum, event) => sum + event.capacity, 0),
      categories: Array.from(
        new Set(this.events.map((event) => event.category))
      ),
    };
  }
}

export const eventManager = new EventManager();
