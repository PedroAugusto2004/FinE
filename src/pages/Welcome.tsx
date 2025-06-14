import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Star, 
  Users, 
  Target,
  BookOpen,
  Award,
  ChevronRight,
  Play,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { learningJourney } from '@/data/learningJourney';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { flags } from '@/assets/flags';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const;

// Animation variants with proper types for Framer Motion
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: easeOut } 
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: easeOut } 
  },
};

const CIRCLES = [
  { baseX: 400, r: 120, color: '#fde04722', speed: 18, xMul: 40, delay: 0 },
  { baseX: 1500, r: 90, color: '#fbbf2422', speed: 22, xMul: 60, delay: 1.5 },
  { baseX: 1000, r: 60, color: '#fffde422', speed: 25, xMul: 20, delay: 2.5 },
  { baseX: 800, r: 70, color: '#fde04718', speed: 20, xMul: 30, delay: 0.7 },
  { baseX: 1700, r: 50, color: '#fbbf2420', speed: 28, xMul: 50, delay: 2.2 },
  { baseX: 300, r: 40, color: '#fffde418', speed: 30, xMul: 25, delay: 1.1 },
];

// AnimatedNumber component for counting up
import React from 'react';
const AnimatedNumber = ({ value, duration = 1200, format = (v: number) => v }: { value: number, duration?: number, format?: (v: number) => string | number }) => {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);
  useEffect(() => {
    let start = 0;
    let startTime: number | null = null;
    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplay(Math.floor(progress * (value - start) + start));
      if (progress < 1) {
        frame.current = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    }
    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, duration]);
  return <span>{format(display)}</span>;
};

const Welcome = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [bgCoords, setBgCoords] = useState({ x: 0, y: 0 });
  const [idleCoords, setIdleCoords] = useState({ x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(true);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const selectedLang = LANGUAGES.find(l => l.code === i18n.language);

  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in to FinE.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}`,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Check your email to confirm your account and complete the registration.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Features (now using translation keys)
  const features = [
    {
      icon: TrendingUp,
      title: t('features.smartProgress.title'),
      description: t('features.smartProgress.description'),
      details: [
        t('features.smartProgress.details.0'),
        t('features.smartProgress.details.1'),
        t('features.smartProgress.details.2'),
      ]
    },
    {
      icon: Target,
      title: t('features.goalOriented.title'),
      description: t('features.goalOriented.description'),
      details: [
        t('features.goalOriented.details.0'),
        t('features.goalOriented.details.1'),
        t('features.goalOriented.details.2'),
      ]
    },
    {
      icon: BookOpen,
      title: t('features.interactiveLessons.title'),
      description: t('features.interactiveLessons.description'),
      details: [
        t('features.interactiveLessons.details.0'),
        t('features.interactiveLessons.details.1'),
        t('features.interactiveLessons.details.2'),
      ]
    },
    {
      icon: Award,
      title: t('features.gamified.title'),
      description: t('features.gamified.description'),
      details: [
        t('features.gamified.details.0'),
        t('features.gamified.details.1'),
        t('features.gamified.details.2'),
      ]
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
      details: [
        t('features.secure.details.0'),
        t('features.secure.details.1'),
        t('features.secure.details.2'),
      ]
    },
    {
      icon: Users,
      title: t('features.community.title'),
      description: t('features.community.description'),
      details: [
        t('features.community.details.0'),
        t('features.community.details.1'),
        t('features.community.details.2'),
      ]
    },
    {
      icon: PiggyBank,
      title: t('features.savings.title'),
      description: t('features.savings.description'),
      details: [
        t('features.savings.details.0'),
        t('features.savings.details.1'),
        t('features.savings.details.2'),
      ]
    },
    {
      icon: DollarSign,
      title: t('features.expert.title'),
      description: t('features.expert.description'),
      details: [
        t('features.expert.details.0'),
        t('features.expert.details.1'),
        t('features.expert.details.2'),
      ]
    }
  ];

  // Learning Journey (now using translation keys)
  const learningJourney = [
    {
      icon: DollarSign,
      step: 1,
      title: t('journey.0.title'),
      desc: t('journey.0.desc'),
      details: [
        t('journey.0.details.0'),
        t('journey.0.details.1'),
        t('journey.0.details.2'),
      ]
    },
    {
      icon: PiggyBank,
      step: 2,
      title: t('journey.1.title'),
      desc: t('journey.1.desc'),
      details: [
        t('journey.1.details.0'),
        t('journey.1.details.1'),
        t('journey.1.details.2'),
      ]
    },
    {
      icon: TrendingUp,
      step: 3,
      title: t('journey.2.title'),
      desc: t('journey.2.desc'),
      details: [
        t('journey.2.details.0'),
        t('journey.2.details.1'),
        t('journey.2.details.2'),
      ]
    },
    {
      icon: Star,
      step: 4,
      title: t('journey.3.title'),
      desc: t('journey.3.desc'),
      details: [
        t('journey.3.details.0'),
        t('journey.3.details.1'),
        t('journey.3.details.2'),
      ]
    }
  ];

  // Testimonials (now using translation keys)
  const testimonials = [
    {
      name: t('testimonials.0.name'),
      role: t('testimonials.0.role'),
      content: t('testimonials.0.content'),
      rating: 5
    },
    {
      name: t('testimonials.1.name'),
      role: t('testimonials.1.role'),
      content: t('testimonials.1.content'),
      rating: 5
    },
    {
      name: t('testimonials.2.name'),
      role: t('testimonials.2.role'),
      content: t('testimonials.2.content'),
      rating: 5
    }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    if (langOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  // Animate idle floating
  useEffect(() => {
    let frame: number;
    function animate() {
      const t = Date.now() / 2000;
      setIdleCoords({
        x: Math.sin(t) * 0.7 + Math.cos(t * 0.7) * 0.5,
        y: Math.cos(t * 0.9) * 0.7 + Math.sin(t * 0.5) * 0.5,
      });
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Handle mouse movement and idle state
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setBgCoords({ x, y });
    setIsIdle(false);
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = setTimeout(() => setIsIdle(true), 2200);
  };

  const [bubbleStates, setBubbleStates] = useState(
    CIRCLES.map((circle, idx) => ({
      y: 1080 + Math.random() * 400, // start below the viewport
      xOffset: Math.random() * 100 - 50, // slight horizontal offset
      t: Math.random() * 1000, // randomize start
    }))
  );

  // Animate bubbles rising
  useEffect(() => {
    let running = true;
    function animate() {
      setBubbleStates(prev => prev.map((bubble, idx) => {
        const speed = CIRCLES[idx].speed;
        let newY = bubble.y - (0.7 + speed * 0.03);
        // If above the top, reset to below
        if (newY < -CIRCLES[idx].r * 2) {
          newY = 1080 + CIRCLES[idx].r + Math.random() * 200;
        }
        // Gentle horizontal sway
        const t = bubble.t + 0.01;
        const sway = Math.sin(t + idx) * 30;
        return {
          y: newY,
          xOffset: sway,
          t,
        };
      }));
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; };
  }, []);

  return (
    <div
      className="min-h-screen bg-neutral-900 text-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Minimalistic Interactive Background Animation */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{ filter: 'blur(0.5px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full absolute">
          {CIRCLES.map((circle, idx) => {
            // Blend idle/interactive for x
            const x = circle.baseX + ((isIdle ? idleCoords.x : bgCoords.x) * circle.xMul) + bubbleStates[idx].xOffset;
            const y = bubbleStates[idx].y + ((isIdle ? idleCoords.y : bgCoords.y) * 10);
            return (
              <motion.circle
                key={idx}
                cx={x}
                cy={y}
                r={circle.r}
                fill={circle.color}
                animate={{
                  opacity: [0.12, 0.22, 0.12],
                  scale: [1, 1.08, 1],
                }}
                transition={{ repeat: Infinity, duration: 6 + idx, ease: 'easeInOut', delay: circle.delay }}
              />
            );
          })}
        </svg>
      </motion.div>
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-neutral-900/80 backdrop-blur-sm">
        <motion.header 
          className="relative flex items-center justify-between max-w-7xl mx-auto p-4 sm:p-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg">
              <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-400 font-bold" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">FinE</h1>
          </div>
          {/* Language Switcher */}
          <div ref={langRef} className="relative">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-white font-semibold transition-all duration-200 shadow-lg border border-transparent hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 min-w-[120px]"
              onClick={() => setLangOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={langOpen}
              aria-label={t('language.select')}
              type="button"
            >
              <img
                src={flags[selectedLang?.code ?? 'en']}
                alt=""
                className="w-5 h-5 rounded-sm object-cover"
                aria-hidden="true"
              />
              <span className="text-base">{selectedLang?.label}</span>
              <svg 
                className={`ml-1 w-4 h-4 text-white transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="fixed inset-0 z-[100]"
                  onClick={() => setLangOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    role="listbox"
                    aria-label={t('language.select')}
                    className="absolute right-4 sm:right-6 top-16 w-36 rounded-xl bg-neutral-800/95 backdrop-blur-md shadow-xl border border-neutral-700/30 overflow-hidden"
                    onClick={e => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                  >
                    {LANGUAGES.map(lang => (
                      <motion.div
                        key={lang.code}
                        role="option"
                        aria-selected={i18n.language === lang.code ? "true" : "false"}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-left text-white hover:bg-yellow-400/20 focus:bg-yellow-400/30 transition-all duration-150 cursor-pointer ${i18n.language === lang.code ? 'bg-yellow-400/10 font-bold' : ''}`}
                        onClick={() => {
                          i18n.changeLanguage(lang.code);
                          setLangOpen(false);
                        }}
                      >
                        <img
                          src={flags[lang.code]}
                          alt=""
                          className="w-5 h-5 rounded-sm object-cover"
                          aria-hidden="true"
                        />
                        <span className="text-base">{lang.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      </div>
      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 py-8 sm:py-12 space-y-24 sm:space-y-32">
          {/* Hero Section */}
          <motion.section
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center min-h-[70vh]"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Left Side - Hero Content */}
            <motion.div className="space-y-8" variants={staggerContainer}>
              <motion.div className="space-y-6" variants={fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 text-yellow-400 rounded-full text-xs sm:text-sm font-medium">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {t('welcome.platform')}
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
                  {t('welcome.master')} <span className="text-yellow-400">{t('welcome.future')}</span>
                </h2>
                <p className="text-base sm:text-xl text-neutral-300 leading-relaxed">
                  {t('welcome.desc')}
                </p>
              </motion.div>
              {/* Quick Stats - moved up */}
              <motion.div className="flex items-center gap-6 sm:gap-8 pt-2 sm:pt-4" variants={fadeInUp}>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-white">
                    <AnimatedNumber value={50000} duration={1200} format={v => v >= 50000 ? '50K+' : `${Math.floor(v / 1000)}K+`} />
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400">{t('welcome.learners')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-white">
                    <AnimatedNumber value={200} duration={1200} format={v => v >= 200 ? '200+' : `${v}+`} />
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400">{t('welcome.lessons')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-4xl font-bold text-white">
                    <AnimatedNumber value={49} duration={1200} format={v => (v / 10).toFixed(1) + '★'} />
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-400">{t('welcome.rating')}</div>
                </div>
              </motion.div>
              {/* CTA Buttons - only Watch Demo button remains */}
              <motion.div className="flex flex-col sm:flex-row gap-4 pt-2" variants={fadeInUp}>
                <Button 
                  variant="outline" 
                  className="h-12 sm:h-14 px-6 sm:px-8 border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 text-base sm:text-lg transition-all duration-300"
                  style={{ backgroundColor: '#171717', color: '#e5e5e5', borderColor: '#262626' }}
                >
                  {t('welcome.demo')}
                  <ArrowRight className="h-5 w-5 ml-2 text-yellow-400" />
                </Button>
              </motion.div>
            </motion.div>
            {/* Right Side - Auth Form */}
            <motion.div
              className="flex justify-center"
              variants={fadeInUp}
            >
              <Card className="w-full max-w-md bg-neutral-800/90 border-neutral-700 shadow-lg">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-white text-2xl sm:text-3xl">{t('welcome.join')}</CardTitle>
                  <CardDescription className="text-neutral-300 text-base sm:text-lg">
                    {t('welcome.journey')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="signin" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
                      <TabsTrigger value="signin" className="text-neutral-200 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">{t('welcome.signin')}</TabsTrigger>
                      <TabsTrigger value="signup" className="text-neutral-200 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">{t('welcome.signup')}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                      <form onSubmit={handleSignIn} className="space-y-4">
                        <Input
                          type="email"
                          placeholder={t('welcome.email')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                        />
                        <Input
                          type="password"
                          placeholder={t('welcome.password')}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                        />
                        <Button 
                          type="submit" 
                          className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold transition-all duration-300"
                          disabled={loading}
                        >
                          {loading ? t('welcome.signing') : t('welcome.signin')}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="signup">
                      <form onSubmit={handleSignUp} className="space-y-4">
                        <Input
                          type="text"
                          placeholder={t('welcome.fullname')}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                        />
                        <Input
                          type="email"
                          placeholder={t('welcome.email')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                        />
                        <Input
                          type="password"
                          placeholder={t('welcome.password')}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                        />
                        <Button 
                          type="submit" 
                          className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold transition-all duration-300"
                          disabled={loading}
                        >
                          {loading ? t('welcome.creating') : t('welcome.create')}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h3 className="text-4xl font-bold text-white mb-6">{t('welcome.why')}</h3>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                {t('welcome.whyDesc')}
              </p>
            </motion.div>
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                // Mouse movement state for 3D hover effect
                const [hovered, setHovered] = useState(false);
                const [coords, setCoords] = useState({ x: 0, y: 0 });
                // Handler for mouse movement
                const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  setCoords({ x, y });
                };
                // Handler for mouse leave
                const handleMouseLeave = () => {
                  setCoords({ x: 0, y: 0 });
                  setHovered(false);
                };
                return (
                  <motion.div
                    key={index}
                    className="group p-8 bg-neutral-800 border-neutral-700 hover:border-yellow-400/50 backdrop-blur-sm rounded-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.06, boxShadow: '0 8px 32px 0 rgba(255, 214, 10, 0.15)' }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transform: hovered
                        ? `perspective(800px) rotateY(${coords.x / 20}deg) rotateX(${-coords.y / 20}deg) scale(1.06)`
                        : undefined,
                      transition: 'transform 0.3s cubic-bezier(0.42,0,0.58,1)',
                    }}
                  >
                    <div className="w-16 h-16 bg-neutral-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-yellow-400" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                    <p className="text-neutral-300 leading-relaxed mb-4">{feature.description}</p>
                    <ul className="text-neutral-400 text-sm space-y-1 text-left mx-auto max-w-xs">
                      {feature.details && feature.details.map((detail: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-yellow-400">•</span> {detail}
                        </li>
                      ))}
                    </ul>
                    {/* Animated background highlight on hover */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={hovered ? { opacity: 0.12 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ background: 'radial-gradient(circle at 60% 40%, #fde047 0%, transparent 80%)' }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* Learning Path Preview */}
          <motion.section
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div className="text-center mb-16 px-2" variants={fadeInUp}>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">{t('welcome.yourJourney')}</h3>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                {t('welcome.yourJourneyDesc')}
              </p>
            </motion.div>
            <motion.div className="relative flex flex-col md:flex-row items-stretch md:items-center justify-between gap-8 md:gap-6 px-0 md:px-0 w-full" variants={staggerContainer}>
              {learningJourney.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    className="relative flex-1 flex flex-col items-center text-center group min-w-0 md:min-w-[180px] max-w-full md:max-w-xs mb-8 md:mb-0"
                    variants={fadeInUp}
                  >
                    {/* Animated step circle with icon */}
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900/80 border border-yellow-400/10 rounded-2xl flex items-center justify-center text-3xl font-bold mb-4 shadow-xl"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 * index, type: 'spring', stiffness: 180 }}
                    >
                      <Icon className="h-8 w-8 md:h-10 md:w-10 text-yellow-400" />
                    </motion.div>
                    <h4 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-neutral-300 text-sm md:text-base mb-3 min-h-[40px] md:min-h-[48px]">{item.desc}</p>
                    <ul className="text-neutral-400 text-xs md:text-sm space-y-1 text-left mx-auto max-w-xs mb-2 px-2 md:px-0">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-yellow-400">•</span> {detail}
                        </li>
                      ))}
                    </ul>
                    {/* Animated progress bar for each step */}
                    <motion.div
                      className="w-full h-2 rounded-full bg-neutral-800 mt-4 overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ delay: 0.2 * index, duration: 1.2, ease: "easeInOut" }}
                    >
                      <div className="h-full bg-gradient-to-r from-yellow-400/80 to-yellow-600/60" />
                    </motion.div>
                    {/* Connector arrow */}
                    {index < learningJourney.length - 1 && (
                      <motion.div
                        className="hidden md:block absolute right-[-40px] top-1/2 -translate-y-1/2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.6 }}
                      >
                        <ChevronRight className="h-10 w-10 text-yellow-400" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h3 className="text-4xl font-bold text-white mb-6">{t('welcome.success')}</h3>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                {t('welcome.successDesc')}
              </p>
            </motion.div>
            <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="p-8 bg-neutral-800 border-neutral-700 hover:border-yellow-400/50 backdrop-blur-sm rounded-2xl transition-all duration-500"
                  variants={fadeInUp}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-neutral-400 text-sm">{testimonial.role}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Get in Touch Section */}
          <motion.section
            className="py-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24 px-2 md:px-0">
              {/* Left: Form */}
              <div className="flex-1 w-full">
                <h3 className="text-4xl md:text-5xl font-light text-neutral-100 mb-3 text-left tracking-tight drop-shadow-lg">
                  {t('welcome.getInTouch')}
                </h3>
                <p className="text-base md:text-lg text-neutral-200 mb-10 max-w-lg text-left font-medium">
                  {t('welcome.loveToHear')}
                </p>
                <form className="flex flex-col gap-7 w-full">
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <Input type="text" placeholder={t('welcome.name')} required className="flex-1 h-12 bg-neutral-800/80 border-none rounded-2xl text-white placeholder:text-neutral-400 px-5 shadow-md focus:ring-2 focus:ring-yellow-300 focus:bg-neutral-800/90 transition-all duration-200" />
                    <Input type="email" placeholder={t('welcome.email')} required className="flex-1 h-12 bg-neutral-800/80 border-none rounded-2xl text-white placeholder:text-neutral-400 px-5 shadow-md focus:ring-2 focus:ring-yellow-300 focus:bg-neutral-800/90 transition-all duration-200" />
                  </div>
                  <Input type="text" placeholder={t('welcome.subject', { defaultValue: 'Subject' })} required className="h-12 bg-neutral-800/80 border-none rounded-2xl text-white placeholder:text-neutral-400 px-5 shadow-md focus:ring-2 focus:ring-yellow-300 focus:bg-neutral-800/90 transition-all duration-200" />
                  <textarea
                    rows={5}
                    placeholder={t('welcome.message')}
                    required
                    className="w-full bg-neutral-800/80 border-none rounded-2xl text-white placeholder:text-neutral-400 px-5 pt-3 shadow-md focus:ring-2 focus:ring-yellow-300 focus:bg-neutral-800/90 transition-all duration-200 min-h-[120px] resize-none"
                  />
                  <div className="flex justify-start pt-2 w-full">
                    <Button
                      type="submit"
                      size="lg"
                      className="h-12 px-8 bg-yellow-300/60 hover:bg-yellow-300/90 text-black font-semibold rounded-2xl shadow-md transition-all duration-200 w-full md:w-auto text-lg tracking-wide backdrop-blur-sm border border-yellow-200/20"
                    >
                      <CheckCircle className="h-5 w-5 mr-2 text-black" />
                      {t('welcome.send')}
                    </Button>
                  </div>
                </form>
              </div>
              {/* Right: Minimal Illustration or Quote */}
              <div className="hidden md:flex flex-1 flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-row items-center gap-4 mb-2">
                    <Star className="w-10 h-10 text-yellow-400/80" />
                    <Users className="w-10 h-10 text-yellow-400/80" />
                    <Award className="w-10 h-10 text-yellow-400/80" />
                  </div>
                  <blockquote className="text-lg text-neutral-300 italic max-w-xs text-center font-light">
                    “{t('welcome.contactQuote', { defaultValue: 'Your feedback helps us build a better future for everyone.' })}”
                  </blockquote>
                  <div className="flex flex-col gap-2 mt-4 text-neutral-400 text-sm text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <Shield className="w-5 h-5 text-yellow-400/70" />
                      <span>{t('welcome.contactSafe', { defaultValue: 'Your privacy is always protected.' })}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <TrendingUp className="w-5 h-5 text-yellow-400/70" />
                      <span>{t('welcome.contactGrowth', { defaultValue: 'Every message helps us improve.' })}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <PiggyBank className="w-5 h-5 text-yellow-400/70" />
                      <span>{t('welcome.contactCommunity', { defaultValue: 'Join a growing community.' })}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Mobile version of quote and icons */}
              <div className="flex md:hidden flex-col items-center justify-center mt-10 gap-4">
                <div className="flex flex-row items-center gap-3">
                  <Star className="w-7 h-7 text-yellow-400/80" />
                  <Users className="w-7 h-7 text-yellow-400/80" />
                  <Award className="w-7 h-7 text-yellow-400/80" />
                </div>
                <blockquote className="text-base text-neutral-300 italic max-w-xs text-center font-light">
                  “{t('welcome.contactQuote', { defaultValue: 'Your feedback helps us build a better future for everyone.' })}”
                </blockquote>
                <div className="flex flex-col gap-1 text-neutral-400 text-xs text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Shield className="w-4 h-4 text-yellow-400/70" />
                    <span>{t('welcome.contactSafe', { defaultValue: 'Your privacy is always protected.' })}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <TrendingUp className="w-4 h-4 text-yellow-400/70" />
                    <span>{t('welcome.contactGrowth', { defaultValue: 'Every message helps us improve.' })}</span>
                  </div>
                  <div className="flex items-center gap-1 justify-center">
                    <PiggyBank className="w-4 h-4 text-yellow-400/70" />
                    <span>{t('welcome.contactCommunity', { defaultValue: 'Join a growing community.' })}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
