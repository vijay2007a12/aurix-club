import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { HeroSection } from './components/sections/Hero';
import { AboutSection } from './components/sections/About';
import { FeaturesSection } from './components/sections/Features';
import { EventsSection } from './components/sections/Events';
import { DomainsSection } from './components/sections/Domains';
import { ApplySection } from './components/sections/Apply';
import { Footer } from './components/sections/Footer';
import { PremiumLoading } from './components/ui/Common';
import { Button } from './components/ui/Button';
import { Logo } from './components/ui/Logo';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X } from 'lucide-react';
import { AdminDashboard } from './admin/AdminDashboard';
import { AuthPage } from './pages/AuthPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { Toast } from './components/ui/Toast';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/admin-login" element={<AuthPage mode="login" admin />} />
      <Route element={<ProtectedRoute role="student" />}>
        <Route path="/dashboard" element={<StudentDashboard />} />
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="/admin" element={<AdminRoutePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AdminRoutePage() {
  const { user } = useAuth();
  const [error, setError] = useState('');

  if (!user) {
    return null;
  }

  return (
    <>
      <Toast message={error} type="error" onClose={() => setError('')} />
      <AdminDashboard user={user} onError={setError} />
    </>
  );
}

function PublicSite() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Domains', id: 'domains' },
    { label: 'Events', id: 'events' },
    { label: 'Join', id: 'apply' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <PremiumLoading show={isLoading} />

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-2xl border-b border-[#d4af37]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-3 text-[#f7e082] cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo size={34} hideText />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#d9c77c] hover:text-[#fff1a8] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
              </motion.button>
            ))}
            <Button variant="secondary" size="sm" onClick={() => navigate('/signup')}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#f7e082]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#d4af37]/20 p-4 space-y-3"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-[#d9c77c] hover:text-[#fff1a8] transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
            <Button size="sm" className="w-full" onClick={() => navigate('/signup')}>
              Get Started
            </Button>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <EventsSection />
        <DomainsSection />
        <ApplySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 z-30"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Button
            onClick={() => scrollToSection('apply')}
            className="shadow-2xl shadow-accent/50"
          >
            Start Application
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll to top indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="fixed bottom-32 right-8 z-20 text-accent text-2xl pointer-events-none"
      >
        ↑
      </motion.div>
    </>
  );
}
