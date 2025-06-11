
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-sm">
                <DollarSign className="h-6 w-6 text-white font-bold" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                FinE
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                About
              </Button>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                Features
              </Button>
              <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Side - Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-sm font-medium">
                <Star className="h-4 w-4" />
                #1 Financial Education Platform
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Master Your{' '}
                <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Financial Future
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Transform your relationship with money through our revolutionary gamified learning platform. 
                Build wealth, secure your future, and achieve financial freedom.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Learning Free
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="h-12 px-8 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
              >
                Watch Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">50K+</div>
                <div className="text-sm text-gray-500">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">200+</div>
                <div className="text-sm text-gray-500">Expert Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500">4.9★</div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md bg-white shadow-xl border border-gray-200">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl text-gray-900">Join FinE Today</CardTitle>
                <CardDescription className="text-gray-600">
                  Start your journey to financial mastery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="signin" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                    <TabsTrigger value="signin" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="signin">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold"
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
                        className="h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
                      />
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold"
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
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Why Choose FinE?</h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most comprehensive and engaging financial education platform designed for the modern learner.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-white" />
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
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Your Learning Journey</h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our structured path from financial basics to advanced wealth-building strategies.
            </p>
          </div>
          
          <div className="relative">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
              {[
                { step: 1, title: "Financial Basics", desc: "Budgeting, saving, and spending habits" },
                { step: 2, title: "Investment Fundamentals", desc: "Stocks, bonds, and portfolio building" },
                { step: 3, title: "Advanced Strategies", desc: "Tax optimization and wealth building" },
                { step: 4, title: "Financial Freedom", desc: "Passive income and retirement planning" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-xs">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-xl font-bold text-white mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                  {index < 3 && (
                    <ChevronRight className="hidden sm:block h-6 w-6 text-yellow-400 mt-8 absolute" style={{ left: `${(index + 1) * 25 - 2}%` }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Success Stories</h3>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of learners who have transformed their financial lives with FinE.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 hover:border-yellow-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
              Ready to Transform Your 
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent"> Financial Future?</span>
            </h3>
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join FinE today and start your journey towards financial independence. Your future self will thank you.
            </p>
            <Button 
              size="lg"
              className="h-14 px-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold text-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <CheckCircle className="h-6 w-6 mr-3" />
              Start Learning For Free
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
