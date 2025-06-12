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
  CheckCircle
} from 'lucide-react';

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
        { value: 'tiktok', label: 'TikTok', icon: '🎵' },
        { value: 'google', label: 'Google Search', icon: <Search className="w-5 h-5" /> },
        { value: 'friends', label: 'Friends or family', icon: <Users className="w-5 h-5" /> },
        { value: 'news', label: 'News, article or blog', icon: <Newspaper className="w-5 h-5" /> },
        { value: 'social', label: 'Facebook or Instagram', icon: '📱' },
        { value: 'youtube', label: 'YouTube', icon: <Youtube className="w-5 h-5" /> }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full h-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-700/30 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentStep === 0}
              className="text-gray-400 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-white/10 disabled:opacity-30"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <span className="text-sm text-gray-400">
              {currentStep + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {currentQuestion.title}
          </h1>
        </div>

        {/* Options */}
        <div className="grid gap-4 md:gap-6">
          {currentQuestion.options.map((option, index) => (
            <Card
              key={option.value}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10 animate-fade-in bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 hover:border-yellow-400/50"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleAnswer(option.value)}
            >
              <div className="p-6 md:p-8 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-yellow-500/30 transition-all duration-300 backdrop-blur-sm border border-yellow-400/20">
                  {typeof option.icon === 'string' ? (
                    <span className="text-2xl">{option.icon}</span>
                  ) : (
                    <div className="text-yellow-400">{option.icon}</div>
                  )}
                </div>
                <span className="text-lg md:text-xl font-medium text-white group-hover:text-yellow-100 transition-colors duration-300">
                  {option.label}
                </span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Skip option */}
        <div className="text-center mt-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/lessons')}
            className="text-gray-400 hover:text-white hover:bg-white/5 backdrop-blur-sm border border-white/10"
          >
            Skip onboarding
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
