import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { 
  TrendingUp, 
  PiggyBank, 
  Shield, 
  Target,
  Users,
  Newspaper,
  Youtube,
  Search,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Bell
} from 'lucide-react';
import { FaTiktok, FaGoogle, FaFacebook, FaInstagram } from 'react-icons/fa';

const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    howDidYouHear: '',
    knowledgeLevel: '',
    goals: '',
    priorities: ''
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const questions = [
    {
      id: 'howDidYouHear',
      title: 'How did you hear about FinE?',
      options: [
        { value: 'tiktok', label: 'TikTok', icon: <FaTiktok className="w-5 h-5" /> },
        { value: 'google', label: 'Google Search', icon: <FaGoogle className="w-5 h-5" /> },
        { value: 'friends', label: 'Friends or family', icon: <Users className="w-5 h-5" /> },
        { value: 'news', label: 'News, article or blog', icon: <Newspaper className="w-5 h-5" /> },
        { value: 'social', label: 'Facebook or Instagram', icon: (
          <div className="flex gap-1">
            <FaFacebook className="w-4 h-4" />
            <FaInstagram className="w-4 h-4" />
          </div>
        ) },
        { value: 'youtube', label: 'YouTube', icon: <Youtube className="w-5 h-5" /> }
      ]
    },
    {
      id: 'learningGoal',
      title: 'What’s your daily learning goal?',
      options: [
        { value: '5min', label: '5 minutes', icon: <TrendingUp className="w-5 h-5" /> },
        { value: '10min', label: '10 minutes', icon: <Target className="w-5 h-5" /> },
        { value: '15min', label: '15 minutes', icon: <Shield className="w-5 h-5" /> },
        { value: '20min', label: '20+ minutes', icon: <PiggyBank className="w-5 h-5" /> }
      ]
    },
    {
      id: 'motivation',
      title: 'What motivates you to improve your finances?',
      options: [
        { value: 'family', label: 'Family', icon: <Users className="w-5 h-5" /> },
        { value: 'freedom', label: 'Financial freedom', icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
        { value: 'growth', label: 'Personal growth', icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'preferredFormat',
      title: 'How do you prefer to learn?',
      options: [
        { value: 'reading', label: 'Reading', icon: <Newspaper className="w-5 h-5" /> },
        { value: 'videos', label: 'Videos', icon: <Youtube className="w-5 h-5" /> },
        { value: 'interactive', label: 'Interactive lessons', icon: <Target className="w-5 h-5" /> },
        { value: 'audio', label: 'Audio', icon: <PiggyBank className="w-5 h-5" /> }
      ]
    },
    {
      id: 'knowledgeLevel',
      title: 'What\'s your current knowledge of finance?',
      options: [
        { value: 'beginner', label: 'Complete beginner', icon: <PiggyBank className="w-5 h-5" /> },
        { value: 'basic', label: 'I know the basics', icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'intermediate', label: 'I have some experience', icon: <Target className="w-5 h-5" /> },
        { value: 'advanced', label: 'I\'m quite knowledgeable', icon: <Shield className="w-5 h-5" /> }
      ]
    },
    {
      id: 'goals',
      title: 'What do you want to learn most?',
      options: [
        { value: 'budgeting', label: 'Budgeting and saving', icon: <PiggyBank className="w-5 h-5" /> },
        { value: 'investing', label: 'Investing and growing wealth', icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'debt', label: 'Managing and paying off debt', icon: <Shield className="w-5 h-5" /> },
        { value: 'retirement', label: 'Retirement planning', icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'priorities',
      title: 'What\'s your main financial priority?',
      options: [
        { value: 'emergency', label: 'Building an emergency fund', icon: <Shield className="w-5 h-5" /> },
        { value: 'income', label: 'Increasing my income', icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'expenses', label: 'Reducing my expenses', icon: <PiggyBank className="w-5 h-5" /> },
        { value: 'future', label: 'Planning for the future', icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'reminders',
      title: 'Would you like to receive reminders so it becomes a habit?',
      options: [
        { value: 'yes', label: 'Yes, send me reminders', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
        { value: 'no', label: 'No, thanks', icon: <Shield className="w-5 h-5 text-gray-400" /> },
        { value: 'notifications', label: 'Show notifications on screen', icon: <Bell className="w-5 h-5 text-yellow-400" /> }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep];
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    if (!user) {
      console.error('No user found');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Starting onboarding completion for user:', user.id);
      console.log('Answers:', answers);

      // Update user profile with onboarding data
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          knowledge_level: answers.knowledgeLevel,
          financial_goals: answers.goals,
          priorities: answers.priorities,
          referral_source: answers.howDidYouHear,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      console.log('Onboarding completed successfully');

      // Invalidate and refetch the onboarding query to update the cache
      await queryClient.invalidateQueries({ queryKey: ['onboarding', user.id] });
      
      toast({
        title: "Welcome to FinE!",
        description: "Let's start your financial learning journey.",
      });

      console.log('Redirecting to lessons page');
      navigate('/lessons', { replace: true });

    } catch (error: any) {
      console.error('Onboarding completion error:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="text-xl">Completing your setup...</p>
        </div>
      </div>
    );
  }

  // At the end, after the last question is answered and onboarding is complete, show a showcase
  if (currentStep >= questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent animate-fade-in">
            Welcome to FinE!
          </h1>
          <p className="text-lg md:text-xl text-gray-200 animate-fade-in delay-100">
            By using FinE, you can:
          </p>
          <ul className="text-left mx-auto max-w-md space-y-4 animate-fade-in delay-200">
            <li className="flex items-center gap-3"><TrendingUp className="w-6 h-6 text-yellow-400" /> Master budgeting, saving, and investing</li>
            <li className="flex items-center gap-3"><PiggyBank className="w-6 h-6 text-yellow-400" /> Build healthy financial habits</li>
            <li className="flex items-center gap-3"><Shield className="w-6 h-6 text-yellow-400" /> Achieve financial security and freedom</li>
            <li className="flex items-center gap-3"><Target className="w-6 h-6 text-yellow-400" /> Set and reach your personal goals</li>
            <li className="flex items-center gap-3"><Users className="w-6 h-6 text-yellow-400" /> Join a supportive learning community</li>
          </ul>
          <Button
            onClick={() => navigate('/lessons', { replace: true })}
            className="mt-8 px-8 py-3 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            Start Learning Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute w-[120vw] h-[120vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-gray-900 via-gray-800 to-black animate-bgPulse" />
        <div className="absolute w-96 h-96 left-[-10%] top-[-10%] bg-yellow-500/10 rounded-full blur-3xl animate-float1" />
        <div className="absolute w-80 h-80 right-[-8%] bottom-[-8%] bg-yellow-400/10 rounded-full blur-2xl animate-float2" />
      </div>
      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full h-1.5 bg-gray-800/60 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-yellow-400 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Back button for previous question */}
          <div className="flex justify-start mt-4">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentStep === 0}
              className="text-gray-400 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-white/10 disabled:opacity-30 px-3 py-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {currentQuestion.title}
          </h1>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {currentQuestion.options.map((option, index) => (
            <Card
              key={option.value}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 animate-fade-in bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 hover:border-yellow-400/50 px-2 py-2 md:px-4 md:py-3"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleAnswer(option.value)}
            >
              <div className="flex items-center gap-2 md:gap-4 p-0">
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-lg flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-yellow-500/30 transition-all duration-300 backdrop-blur-sm border border-yellow-400/20">
                  {typeof option.icon === 'string' ? (
                    <span className="text-xl md:text-2xl">{option.icon}</span>
                  ) : (
                    <div className="text-yellow-400">{option.icon}</div>
                  )}
                </div>
                <span className="text-sm md:text-base font-medium text-white group-hover:text-yellow-100 transition-colors duration-300">
                  {option.label}
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Skip option */}
        {/* Removed the Skip onboarding button as users must complete the form */}
      </div>
    </div>
  );
};

export default OnboardingForm;
