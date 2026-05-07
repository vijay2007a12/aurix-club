# Aurix - Premium AI Startup Website

## Project Overview

Aurix is a premium, cinematic AI startup website built with modern React, 3D graphics, and advanced animations. The website features an immersive user experience with cutting-edge visual effects and interactive components.

## Technology Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animation Library
- **GSAP** - Advanced Animations
- **Three.js** - 3D Graphics
- **react-three-fiber** - React for Three.js
- **Lucide React** - Icons
- **Vite** - Build Tool

## Project Structure

```
src/
├── components/
│   ├── 3d/              # 3D scene components
│   ├── sections/        # Page sections
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── App.tsx              # Main component
└── index.css            # Global styles
```

## Key Features

### 3D Visualization
- Holographic orb with dynamic lighting
- Neural network visualization
- Particle systems
- Animated grid backgrounds

### UI/UX
- Glassmorphism design
- Smooth scroll animations
- Magnetic cursor effects
- Responsive design

### Functionality
- Dynamic event management system
- Professional apply form
- Event registration system
- Animated statistics counters

## Setup Instructions

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## Component Guide

### 3D Components
Located in `src/components/3d/`
- `HeroScene.tsx` - Main 3D scene
- `Effects.tsx` - 3D visual effects

### Sections
Located in `src/components/sections/`
- `Hero.tsx` - Hero section with 3D scene
- `Features.tsx` - Feature showcase
- `Events.tsx` - Event listing and registration
- `Stats.tsx` - Statistics display
- `Domains.tsx` - AI domain cards
- `Apply.tsx` - Application form
- `Footer.tsx` - Footer component

### UI Components
Located in `src/components/ui/`
- `Button.tsx` - Magnetic buttons
- `Card.tsx` - Card variants
- `Form.tsx` - Form elements
- `Common.tsx` - Common UI elements

## Customization

### Colors
Edit `tailwind.config.js` to change theme colors:
- `accent: '#00d9ff'` (Cyan primary)
- `primary: '#0a0e27'` (Dark background)
- `secondary: '#1a1f3a'` (Secondary dark)

### Events
Modify events in `src/utils/eventManager.ts` by adding/editing event data

### Content
Edit individual section components to update text, images, and data

## Performance Notes

- Optimized Three.js rendering
- Efficient particle systems
- Smooth scroll performance
- CSS animations preferred over JS
- Lazy loading where applicable

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)

## Development Notes

- Use TypeScript for type safety
- Follow component composition patterns
- Keep animations performant
- Test responsiveness on multiple devices
- Use Tailwind for styling consistency

## Future Enhancements

- Backend integration for events
- User authentication
- Analytics integration
- Accessibility improvements
- PWA capabilities

## Troubleshooting

If 3D scene doesn't render:
- Check WebGL support in browser
- Update graphics drivers
- Try incognito/private mode

If animations feel janky:
- Reduce particle count
- Disable some effects on mobile
- Check for performance bottlenecks

## Resources

- React Documentation: https://react.dev
- Three.js Documentation: https://threejs.org
- Framer Motion: https://www.framer.com/motion
- GSAP Documentation: https://greensock.com
- Tailwind CSS: https://tailwindcss.com
