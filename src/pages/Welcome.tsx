import { useState } from 'react';
import { motion } from 'framer-motion';
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

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'tween' } },
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'tween' } },
};

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
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

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Progress Tracking",
      description: "Monitor your financial learning journey with detailed analytics and personalized insights.",
      details: [
        "Visualize your progress with beautiful charts.",
        "Personalized learning recommendations.",
        "Track completed lessons and XP earned."
      ]
    },
    {
      icon: Target,
      title: "Goal-Oriented Learning",
      description: "Set and achieve financial milestones with our structured curriculum and achievement system.",
      details: [
        "Custom goal setting and reminders.",
        "Unlock badges for every milestone.",
        "Progressive difficulty for continuous growth."
      ]
    },
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Learn through engaging, bite-sized lessons designed for maximum retention and practical application.",
      details: [
        "Quizzes and real-world scenarios.",
        "Instant feedback and explanations.",
        "Save favorite lessons for review."
      ]
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description: "Earn XP, unlock achievements, and compete on leaderboards while mastering financial concepts.",
      details: [
        "Daily streaks and bonus rewards.",
        "Compete with friends and the community.",
        "Seasonal events and challenges."
      ]
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial education data is protected with enterprise-grade security and privacy measures.",
      details: [
        "End-to-end encrypted data.",
        "No ads, no data selling.",
        "Full control over your privacy settings."
      ]
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow learners, share experiences, and get support from our financial education community.",
      details: [
        "Active forums and Q&A.",
        "Mentorship from experts.",
        "Live webinars and events."
      ]
    },
    // Extra features for more content
    {
      icon: PiggyBank,
      title: "Savings Simulations",
      description: "Practice saving and investing in a risk-free environment.",
      details: [
        "Simulate real-world financial decisions.",
        "See the impact of your choices instantly.",
        "Learn from mistakes without consequences."
      ]
    },
    {
      icon: DollarSign,
      title: "Expert Insights",
      description: "Access exclusive tips and strategies from financial professionals.",
      details: [
        "Weekly expert articles and videos.",
        "Ask questions and get answers.",
        "Stay updated with the latest trends."
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content: "FinE transformed my understanding of personal finance. The gamified approach made learning actually fun!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Manager",
      content: "I went from financial anxiety to confidence in just 3 months. The lesson structure is incredible.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Student",
      content: "Finally, a platform that makes finance accessible. The progress tracking keeps me motivated daily.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-x-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-yellow-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <motion.header 
        className="relative z-10 p-4 sm:p-6"
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
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 py-8 sm:py-12 space-y-24 sm:space-y-32">
        {/* Hero Section */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center min-h-[70vh]"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
        >
          {/* Left Side - Hero Content */}
          <motion.div className="space-y-8" variants={staggerContainer}>
            <motion.div className="space-y-6" variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 text-yellow-400 rounded-full text-xs sm:text-sm font-medium">
                <Star className="h-4 w-4 text-yellow-400" />
                #1 Financial Education Platform
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight">
                Master Your{' '}
                <span className="text-yellow-400">Financial Future</span>
              </h2>
              <p className="text-base sm:text-xl text-neutral-300 leading-relaxed">
                Transform your relationship with money through our revolutionary gamified learning platform. 
                Build wealth, secure your future, and achieve financial freedom with personalized lessons 
                designed by financial experts.
              </p>
            </motion.div>
            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
              <Button 
                className="h-12 sm:h-14 px-6 sm:px-8 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold text-base sm:text-lg shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2 text-black" />
                Start Learning Free
              </Button>
              <Button 
                variant="outline" 
                className="h-12 sm:h-14 px-6 sm:px-8 border-neutral-700 bg-neutral-900 text-neutral-200 hover:bg-neutral-800 text-base sm:text-lg transition-all duration-300"
                style={{ backgroundColor: '#171717', color: '#e5e5e5', borderColor: '#262626' }}
              >
                Watch Demo
                <ArrowRight className="h-5 w-5 ml-2 text-yellow-400" />
              </Button>
            </motion.div>
            {/* Quick Stats */}
            <motion.div className="flex items-center gap-6 sm:gap-8 pt-6 sm:pt-8" variants={fadeInUp}>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-white">50K+</div>
                <div className="text-xs sm:text-sm text-neutral-400">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-white">200+</div>
                <div className="text-xs sm:text-sm text-neutral-400">Expert Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold text-white">4.9★</div>
                <div className="text-xs sm:text-sm text-neutral-400">User Rating</div>
              </div>
            </motion.div>
          </motion.div>
          {/* Right Side - Auth Form */}
          <motion.div
            className="flex justify-center"
            variants={fadeInUp}
          >
            <Card className="w-full max-w-md bg-neutral-800/90 border-neutral-700 shadow-lg">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-white text-2xl sm:text-3xl">Join FinE Today</CardTitle>
                <CardDescription className="text-neutral-300 text-base sm:text-lg">
                  Start your journey to financial mastery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
                    <TabsTrigger value="signin" className="text-neutral-200 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="text-neutral-200 data-[state=active]:bg-yellow-400 data-[state=active]:text-black">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
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
                        {loading ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-400 focus:border-yellow-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
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
                        {loading ? "Creating Account..." : "Create Account"}
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
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h3 className="text-4xl font-bold text-white mb-6">Why Choose FinE?</h3>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Experience the most comprehensive and engaging financial education platform designed for the modern learner.
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
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div className="text-center mb-16 px-2" variants={fadeInUp}>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Your Learning Journey</h3>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              A step-by-step path from financial basics to advanced wealth-building, with interactive milestones and beautiful progress animations.
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
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h3 className="text-4xl font-bold text-white mb-6">Success Stories</h3>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Join thousands of learners who have transformed their financial lives with FinE.
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
          className="text-center py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-yellow-400/20 rounded-3xl shadow-2xl p-8 md:p-14 flex flex-col items-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">Get in Touch</h3>
            <p className="text-base md:text-lg text-neutral-200 mb-8 max-w-xl font-normal">We'd love to hear from you.</p>
            <form className="w-full space-y-5 text-left">
              <div className="flex flex-col md:flex-row gap-4">
                <Input type="text" placeholder="Name" required className="flex-1 h-12 bg-white/10 border border-yellow-400/20 rounded-xl text-white placeholder:text-neutral-400 focus:border-yellow-400/60 focus:bg-white/20 transition-all duration-200" />
                <Input type="email" placeholder="Email" required className="flex-1 h-12 bg-white/10 border border-yellow-400/20 rounded-xl text-white placeholder:text-neutral-400 focus:border-yellow-400/60 focus:bg-white/20 transition-all duration-200" />
              </div>
              <textarea
                rows={4}
                placeholder="Your message"
                required
                className="w-full h-28 bg-white/10 border border-yellow-400/20 rounded-xl text-white placeholder:text-neutral-400 p-4 focus:border-yellow-400/60 focus:bg-white/20 transition-all duration-200 resize-none"
              />
              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-yellow-400/80 hover:bg-yellow-400 text-black font-semibold rounded-xl shadow-md transition-all duration-200"
                >
                  <CheckCircle className="h-5 w-5 mr-2 text-black" />
                  Send
                </Button>
              </div>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Welcome;
