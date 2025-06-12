import { useState } from 'react';
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
      description: "Monitor your financial learning journey with detailed analytics and personalized insights."
    },
    {
      icon: Target,
      title: "Goal-Oriented Learning",
      description: "Set and achieve financial milestones with our structured curriculum and achievement system."
    },
    {
      icon: BookOpen,
      title: "Interactive Lessons",
      description: "Learn through engaging, bite-sized lessons designed for maximum retention and practical application."
    },
    {
      icon: Award,
      title: "Gamified Experience",
      description: "Earn XP, unlock achievements, and compete on leaderboards while mastering financial concepts."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial education data is protected with enterprise-grade security and privacy measures."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow learners, share experiences, and get support from our financial education community."
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

  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div className={`min-h-screen bg-background text-foreground overflow-x-hidden`}>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 -left-4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-yellow-600/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </>
        ) : null}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="h-7 w-7 text-primary font-bold" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">FinE</h1>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 animate-slide-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-200 text-primary rounded-full text-sm font-medium">
                <Star className="h-4 w-4 text-primary" />
                #1 Financial Education Platform
              </div>
              
              <h2 className="text-6xl md:text-7xl font-bold leading-tight">
                Master Your{' '}
                <span className="text-primary">Financial Future</span>
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your relationship with money through our revolutionary gamified learning platform. 
                Build wealth, secure your future, and achieve financial freedom with personalized lessons 
                designed by financial experts.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="h-14 px-8 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold text-lg shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2 text-white" />
                Start Learning Free
              </Button>
              <Button 
                variant="outline" 
                className="h-14 px-8 border-gray-300 text-gray-700 hover:bg-gray-100 text-lg transition-all duration-300"
              >
                Watch Demo
                <ArrowRight className="h-5 w-5 ml-2 text-primary" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-500">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-500">Expert Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">4.9★</div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center animate-slide-in delay-300">
            <Card className="w-full max-w-md bg-white/90 border-gray-200 shadow-lg">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-gray-900 text-3xl">Join FinE Today</CardTitle>
                <CardDescription className="text-gray-600">
                  Start your journey to financial mastery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger value="signin" className="text-gray-700 data-[state=active]:bg-yellow-400 data-[state=active]:text-white">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="text-gray-700 data-[state=active]:bg-yellow-400 data-[state=active]:text-white">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-yellow-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-yellow-500"
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold transition-all duration-300"
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
                        className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-yellow-500"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-yellow-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-yellow-500"
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold transition-all duration-300"
                        disabled={loading}
                      >
                        {loading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Why Choose FinE?</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most comprehensive and engaging financial education platform designed for the modern learner.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const delayClass = [
                'animate-delay-0',
                'animate-delay-100',
                'animate-delay-200',
                'animate-delay-300',
                'animate-delay-400',
                'animate-delay-500',
              ][index % 6];
              return (
                <div 
                  key={index}
                  className={`group p-8 bg-gray-50 border-gray-200 hover:border-yellow-400/50 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:transform hover:scale-105 animate-fade-in ${delayClass}`}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning Path Preview */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Your Learning Journey</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our structured path from financial basics to advanced wealth-building strategies.
            </p>
          </div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {[1, 2, 3, 4].map((step, index) => {
                const item = [
                  { step: 1, title: "Financial Basics", desc: "Budgeting, saving, and spending habits" },
                  { step: 2, title: "Investment Fundamentals", desc: "Stocks, bonds, and portfolio building" },
                  { step: 3, title: "Advanced Strategies", desc: "Tax optimization and wealth building" },
                  { step: 4, title: "Financial Freedom", desc: "Passive income and retirement planning" }
                ][index];
                const delayClass = [
                  'animate-delay-0',
                  'animate-delay-200',
                  'animate-delay-400',
                  'animate-delay-600',
                ][index % 4];
                return (
                  <div key={index} className={`flex flex-col items-center text-center animate-bounce-in ${delayClass}`}>
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-primary mb-4 shadow-lg">
                      {item.step}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm max-w-32">{item.desc}</p>
                    {index < 3 && (
                      <ChevronRight className="hidden md:block h-8 w-8 text-primary mt-8" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Success Stories</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of learners who have transformed their financial lives with FinE.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const delayClass = [
                'animate-delay-0',
                'animate-delay-150',
                'animate-delay-300',
              ][index % 3];
              return (
                <div 
                  key={index}
                  className={`p-8 bg-gray-50 border-gray-200 hover:border-yellow-400/50 backdrop-blur-sm rounded-2xl transition-all duration-500 animate-slide-up ${delayClass}`}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-primary fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-5xl font-bold text-gray-900 mb-8">
              Ready to Transform Your 
              <span className="text-primary"> Financial Future?</span>
            </h3>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join FinE today and start your journey towards financial independence. Your future self will thank you.
            </p>
            <Button 
              size="lg"
              className="h-16 px-12 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold text-xl shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              <CheckCircle className="h-6 w-6 mr-3 text-white" />
              Start Learning For Free
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
