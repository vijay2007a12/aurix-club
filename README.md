# AURIX - Premium AI Startup Website

A cutting-edge, cinematic, and premium AI startup website built with React, Three.js, and modern web technologies.

## 🌟 Features

### Visual Excellence
- **Advanced 3D Hero Section** - Using react-three-fiber with holographic orbs and neural networks
- **Floating Holographic Orb** - Animated 3D sphere with glowing effects
- **Animated Neural Network** - Dynamic network visualization with particle connections
- **Dynamic Lighting** - Multi-point lighting system with cyan and magenta accents
- **Premium Glassmorphism UI** - Frosted glass effect components with backdrop blur
- **Smooth GSAP Scroll Animations** - Parallax scrolling and scroll-triggered animations
- **Cinematic Transitions** - Smooth reveal-on-scroll effects and transitions between sections
- **Floating Interactive Cards** - Hover animations with magnetic cursor effects
- **Animated Grid Backgrounds** - Dynamic grid visualization in 3D space
- **Mouse-Following Glow Effect** - Dynamic lighting that follows your cursor
- **Aurora Gradient Backgrounds** - Beautiful gradient overlays throughout
- **Premium Loading Animation** - Stylish loading screen on page start

### Interactive Components
- **Magnetic Buttons** - Buttons that follow your cursor for engaging interactions
- **Event Management System** - Dynamic event list with filtering and registration
- **Modern Apply Form** - Professional form with validation and success feedback
- **Animated Stats Counters** - Numbers that count up on scroll reveal
- **Interactive Domain Cards** - Showcasing different AI domain applications
- **Responsive Navigation** - Mobile-friendly navigation with smooth transitions

### Technology Stack
- **React 18** - Modern component-based UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Advanced animation library
- **GSAP** - Professional animation library
- **Three.js** - 3D graphics library
- **react-three-fiber** - React renderer for Three.js
- **Lucide React** - Beautiful icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Aurix
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/                 # 3D components
│   │   ├── Effects.tsx     # Holographic orb, neural network, particles
│   │   └── HeroScene.tsx   # Main 3D scene setup
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Features.tsx    # Features showcase
│   │   ├── Events.tsx      # Events listing
│   │   ├── Stats.tsx       # Statistics display
│   │   ├── Domains.tsx     # Domain cards
│   │   ├── Apply.tsx       # Apply form section
│   │   └── Footer.tsx      # Footer component
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx      # Button components
│       ├── Card.tsx        # Card components
│       ├── Form.tsx        # Form components
│       └── Common.tsx      # Common UI elements
├── hooks/
│   └── useAnimations.ts    # Custom animation hooks
├── utils/
│   ├── animations.ts       # Animation utilities
│   └── eventManager.ts     # Event management system
├── App.tsx                 # Main app component
├── main.tsx                # Entry point
└── index.css               # Global styles
```

## 🎨 Component Overview

### 3D Components
- **HolographicOrb** - Animated 3D sphere with rotating rings and trail effects
- **NeuralNetwork** - Procedurally generated neural network visualization
- **ParticleCloud** - Animated particle system with scrolling effects
- **AnimatedGridBackground** - Animated grid for depth perception

### UI Components
- **Button** - Magnetic buttons with gradient backgrounds
- **Card** - Glass-effect cards with hover animations
- **Form** - Input, textarea, select, and checkbox components
- **ApplyForm** - Professional application form with validation

### Sections
- **HeroSection** - 3D animated hero with call-to-action
- **FeaturesSection** - Showcase of key features
- **EventsSection** - Event listing with filtering and registration
- **StatsSection** - Impressive statistics display
- **DomainsSection** - AI domain cards
- **ApplySection** - Application form section
- **Footer** - Comprehensive footer with links

## 🎬 Animation Features

### GSAP Animations
- Scroll-triggered reveals
- Parallax scrolling effects
- Count-up animations for stats
- Floating animations
- Pulse effects
- Magnetic cursor tracking

### Framer Motion
- Page transitions
- Stagger animations
- Hover effects
- Scroll-based animations
- Exit animations

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (375px - 767px)

## ⚙️ Configuration

### Tailwind CSS
Configured with custom theme extensions:
- Custom colors (cyan, purple, pink)
- Custom animations (glow, float, spin-slow)
- Custom shadows and blur effects
- Aurora gradient backgrounds

### GSAP Plugins
- ScrollTrigger - Scroll-based animations

## 🎯 Event Management System

The `eventManager` provides a complete event management solution:
- Create, read, update, delete events
- Filter events by category or date
- Manage event registration
- Get event statistics

Example usage:
```typescript
import { eventManager } from './utils/eventManager';

// Get all events
const events = eventManager.getAllEvents();

// Filter by category
const conferences = eventManager.getEventsByCategory('conference');

// Register for event
eventManager.registerEvent('event-id');

// Get stats
const stats = eventManager.getEventStats();
```

## 🎨 Customization

### Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      accent: '#00d9ff',  // Cyan
      primary: '#0a0e27', // Dark blue
    }
  }
}
```

### Typography
Change fonts in `tailwind.config.js` or use custom fonts via Google Fonts in `index.html`

### 3D Effects
Customize 3D scene in `src/components/3d/HeroScene.tsx` and `Effects.tsx`

## 📊 Performance Optimization

- Lazy loading of components
- Optimized Three.js rendering with `powerPreference: 'high-performance'`
- CSS animations preferred over JavaScript where possible
- Efficient particle system
- Optimized images and assets

## 🔧 Development

### Build Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Browser Support
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Contact

For inquiries, reach out to hello@aurix.ai

---

**AURIX** - Transforming the Future with Advanced AI Intelligence
