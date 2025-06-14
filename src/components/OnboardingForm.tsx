import { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { flags } from '@/assets/flags';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
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

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
] as const;

const OnboardingForm = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const langRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [answers, setAnswers] = useState({
    howDidYouHear: '',
    knowledgeLevel: '',
    goals: '',
    priorities: ''
  });

  const selectedLang = LANGUAGES.find(l => l.code === i18n.language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const questions = useMemo(() => [
    {
      id: 'howDidYouHear',
      title: t('onboarding.questions.howDidYouHear'),
      options: [
        { value: 'tiktok', label: t('onboarding.options.howDidYouHear.tiktok'), icon: <FaTiktok className="w-5 h-5" /> },
        { value: 'google', label: t('onboarding.options.howDidYouHear.google'), icon: <FaGoogle className="w-5 h-5" /> },
        { value: 'friends', label: t('onboarding.options.howDidYouHear.friends'), icon: <Users className="w-5 h-5" /> },
        { value: 'news', label: t('onboarding.options.howDidYouHear.news'), icon: <Newspaper className="w-5 h-5" /> },
        { value: 'social', label: t('onboarding.options.howDidYouHear.social'), icon: (
          <div className="flex gap-1">
            <FaFacebook className="w-4 h-4" />
            <FaInstagram className="w-4 h-4" />
          </div>
        ) },
        { value: 'youtube', label: t('onboarding.options.howDidYouHear.youtube'), icon: <Youtube className="w-5 h-5" /> }
      ]
    },
    {
      id: 'learningGoal',
      title: t('onboarding.questions.learningGoal'),
      options: [
        { value: '5min', label: t('onboarding.options.learningGoal.5min'), icon: <TrendingUp className="w-5 h-5" /> },
        { value: '10min', label: t('onboarding.options.learningGoal.10min'), icon: <Target className="w-5 h-5" /> },
        { value: '15min', label: t('onboarding.options.learningGoal.15min'), icon: <Shield className="w-5 h-5" /> },
        { value: '20min', label: t('onboarding.options.learningGoal.20min'), icon: <PiggyBank className="w-5 h-5" /> }
      ]
    },
    {
      id: 'motivation',
      title: t('onboarding.questions.motivation'),
      options: [
        { value: 'family', label: t('onboarding.options.motivation.family'), icon: <Users className="w-5 h-5" /> },
        { value: 'freedom', label: t('onboarding.options.motivation.freedom'), icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'security', label: t('onboarding.options.motivation.security'), icon: <Shield className="w-5 h-5" /> },
        { value: 'growth', label: t('onboarding.options.motivation.growth'), icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'preferredFormat',
      title: t('onboarding.questions.preferredFormat'),
      options: [
        { value: 'reading', label: t('onboarding.options.preferredFormat.reading'), icon: <Newspaper className="w-5 h-5" /> },
        { value: 'videos', label: t('onboarding.options.preferredFormat.videos'), icon: <Youtube className="w-5 h-5" /> },
        { value: 'interactive', label: t('onboarding.options.preferredFormat.interactive'), icon: <Target className="w-5 h-5" /> },
        { value: 'audio', label: t('onboarding.options.preferredFormat.audio'), icon: <PiggyBank className="w-5 h-5" /> }
      ]
    },
    {
      id: 'knowledgeLevel',
      title: t('onboarding.questions.knowledgeLevel'),
      options: [
        { value: 'beginner', label: t('onboarding.options.knowledgeLevel.beginner'), icon: <PiggyBank className="w-5 h-5" /> },
        { value: 'basic', label: t('onboarding.options.knowledgeLevel.basic'), icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'intermediate', label: t('onboarding.options.knowledgeLevel.intermediate'), icon: <Target className="w-5 h-5" /> },
        { value: 'advanced', label: t('onboarding.options.knowledgeLevel.advanced'), icon: <Shield className="w-5 h-5" /> }
      ]
    },
    {
      id: 'goals',
      title: t('onboarding.questions.goals'),
      options: [
        { value: 'budgeting', label: t('onboarding.options.goals.budgeting'), icon: <PiggyBank className="w-5 h-5" /> },
        { value: 'investing', label: t('onboarding.options.goals.investing'), icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'debt', label: t('onboarding.options.goals.debt'), icon: <Shield className="w-5 h-5" /> },
        { value: 'retirement', label: t('onboarding.options.goals.retirement'), icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'priorities',
      title: t('onboarding.questions.priorities'),
      options: [
        { value: 'emergency', label: t('onboarding.options.priorities.emergency'), icon: <Shield className="w-5 h-5" /> },
        { value: 'income', label: t('onboarding.options.priorities.income'), icon: <TrendingUp className="w-5 h-5" /> },
        { value: 'expenses', label: t('onboarding.options.priorities.expenses'), icon: <PiggyBank className="w-5 h-5" /> },
        { value: 'future', label: t('onboarding.options.priorities.future'), icon: <Target className="w-5 h-5" /> }
      ]
    },
    {
      id: 'reminders',
      title: t('onboarding.questions.reminders'),
      options: [
        { value: 'yes', label: t('onboarding.options.reminders.yes'), icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
        { value: 'no', label: t('onboarding.options.reminders.no'), icon: <Shield className="w-5 h-5 text-gray-400" /> },
        { value: 'notifications', label: t('onboarding.options.reminders.notifications'), icon: <Bell className="w-5 h-5 text-yellow-400" /> }
      ]
    }
  ], [t]);

  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: string) => {
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
        throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ['onboarding', user.id] });
      
      toast({
        title: t('onboarding.welcome'),
        description: t('onboarding.startLearning'),
      });

      navigate('/lessons', { replace: true });
    } catch (error: any) {
      toast({
        title: "Error",
        description: t('onboarding.error'),
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

  const progress = ((currentStep + 1) / questions.length) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="rounded-full h-16 w-16 border-2 border-yellow-400 mx-auto"></div>
          <p className="text-xl">{t('onboarding.loading')}</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('onboarding.showcase.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            {t('onboarding.showcase.subtitle')}
          </p>
          <ul className="text-left mx-auto max-w-md space-y-4">
            <li className="flex items-center gap-3"><TrendingUp className="w-6 h-6 text-yellow-400" /> {t('onboarding.showcase.features.master')}</li>
            <li className="flex items-center gap-3"><PiggyBank className="w-6 h-6 text-yellow-400" /> {t('onboarding.showcase.features.habits')}</li>
            <li className="flex items-center gap-3"><Shield className="w-6 h-6 text-yellow-400" /> {t('onboarding.showcase.features.security')}</li>
            <li className="flex items-center gap-3"><Target className="w-6 h-6 text-yellow-400" /> {t('onboarding.showcase.features.goals')}</li>
            <li className="flex items-center gap-3"><Users className="w-6 h-6 text-yellow-400" /> {t('onboarding.showcase.features.community')}</li>
          </ul>
          <Button
            onClick={() => navigate('/lessons', { replace: true })}
            className="mt-8 px-8 py-3 text-lg font-semibold bg-yellow-400 text-black rounded-xl shadow-lg hover:bg-yellow-500"
          >
            {t('onboarding.showcase.cta')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-2 sm:p-4 bg-gray-900">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div ref={langRef} className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-800 text-white font-semibold shadow-lg border border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 min-w-[120px]"
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
              className={`ml-1 w-4 h-4 text-white ${langOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {langOpen && (
            <div
              role="listbox"
              aria-label={t('language.select')}
              className="absolute right-0 top-12 w-36 rounded-xl bg-gray-800 shadow-xl border border-gray-700 overflow-hidden"
            >
              {LANGUAGES.map(lang => (
                <div
                  key={lang.code}
                  role="option"
                  aria-selected={i18n.language === lang.code ? "true" : "false"}
                  className={`flex items-center gap-2 w-full px-3 py-2 text-left text-white hover:bg-gray-700 cursor-pointer ${i18n.language === lang.code ? 'bg-gray-700 font-bold' : ''}`}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-lg sm:max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-yellow-400 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
          {/* Back button for previous question */}
          <div className="flex justify-start mt-4">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={currentStep === 0}
              className="text-gray-200 hover:text-white disabled:opacity-30 px-3 py-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('onboarding.back')}
            </Button>
          </div>
        </div>        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-center mb-8 px-2 sm:px-0 flex items-end min-h-[3.5rem]"
          >
            <h1 className="text-2xl md:text-4xl font-light mb-4 text-white break-words whitespace-pre-line leading-tight pb-1">
              {currentQuestion.title}
            </h1>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
            }}
            className="grid grid-cols-2 gap-3 md:gap-4"
          >
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.value}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
                  exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } }
                }}
              >
                <Card
                  className="bg-gray-800 group cursor-pointer hover:bg-gray-700 border-gray-700 px-2 py-2 md:px-4 md:py-3 hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="flex items-center gap-2 md:gap-4 p-0">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-gray-600 border border-gray-600">
                      {typeof option.icon === 'string' ? (
                        <span className="text-xl md:text-2xl">{option.icon}</span>
                      ) : (
                        <div className="text-yellow-400">{option.icon}</div>
                      )}
                    </div>
                    <span className="text-sm md:text-base font-medium text-white group-hover:text-yellow-100">
                      {option.label}
                    </span>
                    <motion.div 
                      className="ml-auto"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <ArrowRight className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>      </div>
    </div>
  );
};

export default OnboardingForm;
