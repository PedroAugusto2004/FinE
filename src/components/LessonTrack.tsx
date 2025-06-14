import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { financialCourse } from "@/data/financialCourse";
import { 
  Clock, 
  Award, 
  CheckCircle, 
  Lock, 
  Play, 
  DollarSign, 
  Coins, 
  Banknote, 
  PiggyBank, 
  TrendingUp,
  Trophy,
  Target,
  Flame,
  GraduationCap,
  Wallet,
  LineChart,
  CreditCard,
  BookOpen,
  Percent,
  Building2
} from "lucide-react";
import { useUserProgress, useUserStats } from "@/hooks/useUserProgress";
import { useProgressCalculations } from "@/hooks/useProgressCalculations";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, Variants } from "framer-motion";

const moneyIcons = [DollarSign, Coins, Banknote, PiggyBank, TrendingUp];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const unitIcons = {
  1: [Wallet, BookOpen, DollarSign],
  2: [LineChart, PiggyBank, TrendingUp],
  3: [CreditCard, Building2, Percent]
} as const;

const getUnitColors = (unitIndex: number) => {
  const colors = {
    1: {
      light: 'bg-blue-50 dark:bg-blue-950/30',
      medium: 'bg-blue-100 dark:bg-blue-900/50',
      accent: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      hover: 'hover:border-blue-300 dark:hover:border-blue-700'
    },
    2: {
      light: 'bg-emerald-50 dark:bg-emerald-950/30',
      medium: 'bg-emerald-100 dark:bg-emerald-900/50',
      accent: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200 dark:border-emerald-800',
      hover: 'hover:border-emerald-300 dark:hover:border-emerald-700'
    },
    3: {
      light: 'bg-purple-50 dark:bg-purple-950/30',
      medium: 'bg-purple-100 dark:bg-purple-900/50',
      accent: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      hover: 'hover:border-purple-300 dark:hover:border-purple-700'
    }
  };
  return colors[unitIndex as keyof typeof colors];
};

const LessonTrack = () => {
  const navigate = useNavigate();
  const { data: userProgress } = useUserProgress();
  const { data: userStats } = useUserStats();
  const isMobile = useIsMobile();
  const progress = useProgressCalculations();

  const completedLessons = new Set(userProgress?.map(p => p.lesson_id) || []);

  return (
    <motion.div 
      className="min-h-screen bg-background p-3 md:p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <motion.div 
            className="inline-flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-green-600 mr-3" />
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Your Financial Journey
            </h1>
          </motion.div>
          <motion.div
            className="flex items-center justify-center gap-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Target className="w-4 h-4" />
            <p className="text-sm md:text-lg font-medium">
              Master your finances, secure your future
            </p>
          </motion.div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <Card className="mb-8 md:mb-12 bg-card border-border hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <motion.div 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-green-50 dark:bg-green-950/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="rounded-full p-3 bg-green-100 dark:bg-green-900">
                    <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">
                      {progress.totalProgress.earnedXP}
                    </div>
                    <div className="text-xs md:text-sm font-medium text-green-800 dark:text-green-300">
                      Total XP
                    </div>
                    <div className="text-xs text-green-600/70 dark:text-green-400/70">
                      {progress.totalProgress.earnedXP}/{progress.totalProgress.totalPossibleXP} XP
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900">
                    <Flame className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {progress.streak.current}
                    </div>
                    <div className="text-xs md:text-sm font-medium text-blue-800 dark:text-blue-300">
                      Day Streak
                    </div>
                    <div className="text-xs text-blue-600/70 dark:text-blue-400/70">
                      {progress.streak.isActive ? "Streak active" : "Study today!"}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center space-x-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900">
                    <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {progress.totalProgress.completedLessons}
                    </div>
                    <div className="text-xs md:text-sm font-medium text-purple-800 dark:text-purple-300">
                      Lessons Completed
                    </div>
                    <div className="text-xs text-purple-600/70 dark:text-purple-400/70">
                      {progress.totalProgress.completedLessons}/{progress.totalProgress.totalLessons} Total
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Lesson Track */}
        <div className="relative">
          {/* Central Path Line - Hidden on mobile for cleaner layout */}
          {!isMobile && (
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-300 via-emerald-300 to-purple-300 h-full z-0"
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1 }}
            />
          )}

          {financialCourse.map((unit, unitIndex) => {
            const colors = getUnitColors(unitIndex + 1);
            const UnitIcons = unitIcons[unitIndex + 1 as keyof typeof unitIcons];
            const unitStats = progress.unitProgress[unit.id];
            
            return (
              <motion.div 
                key={unit.id} 
                className="mb-12 md:mb-16"
                variants={itemVariants}
              >
                {/* Unit Header */}
                <motion.div 
                  className="relative z-10 flex justify-center mb-6 md:mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <Card className={`w-full md:w-[600px] border-2 ${colors.border} ${colors.hover} transition-all duration-300`}>
                    <CardContent className={`p-6 md:p-8 ${colors.light}`}>
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Unit Number & Icons */}
                        <div className="flex flex-col items-center">
                          <motion.div 
                            className={`w-16 h-16 rounded-2xl ${colors.medium} flex items-center justify-center mb-3`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.7 }}
                          >
                            <span className={`text-2xl font-bold ${colors.accent}`}>{unitIndex + 1}</span>
                          </motion.div>
                          <div className="flex gap-2">
                            {UnitIcons.map((Icon, i) => (
                              <div 
                                key={i} 
                                className={`p-2 rounded-full ${colors.medium}`}
                              >
                                <Icon className={`w-4 h-4 ${colors.accent}`} />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Unit Content */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                          <div>
                            <h2 className={`text-2xl md:text-3xl font-bold ${colors.accent}`}>
                              {unit.title}
                            </h2>
                            <p className="text-muted-foreground text-sm md:text-base mt-2">
                              {unit.description}
                            </p>
                          </div>
                          
                          {/* Progress Section */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <Progress 
                                value={unitStats?.percentageComplete || 0}
                                className={`h-2 ${colors.medium}`}
                              />
                              <span className={`text-sm font-medium ${colors.accent} whitespace-nowrap`}>
                                {unitStats?.percentageComplete || 0}% Complete
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{unitStats?.completedLessons || 0}/{unitStats?.totalLessons || 0} Lessons</span>
                              <span>{unitStats?.earnedXP || 0}/{unitStats?.totalXP || 0} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Lessons */}
                <div className="space-y-6 md:space-y-8">
                  {unit.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isLocked = !lesson.isUnlocked;
                    const isLeft = !isMobile && lessonIndex % 2 === 0;
                    const IconComponent = moneyIcons[lessonIndex % moneyIcons.length];
                    
                    return (
                      <motion.div 
                        key={lesson.id} 
                        className={`relative flex ${isMobile ? 'justify-center' : isLeft ? 'justify-start pl-8' : 'justify-end pr-8'}`}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        custom={lessonIndex}
                      >
                        {/* Connection Line */}
                        {!isMobile && (
                          <motion.div 
                            className={`absolute top-1/2 ${isLeft ? 'left-1/2 -ml-2' : 'right-1/2 -mr-2'} w-16 h-0.5 ${
                              isCompleted ? 'bg-green-400' : isLocked ? 'bg-gray-300' : 'bg-yellow-400'
                            } z-0`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 * lessonIndex }}
                          />
                        )}

                        {/* Lesson Card */}
                        <motion.div 
                          className={`relative z-10 ${isMobile ? '' : isLeft ? 'ml-16' : 'mr-16'}`}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2, type: "tween" }}
                        >
                          <Card 
                            className={`w-full max-w-sm md:w-80 transition-all duration-300 cursor-pointer bg-card border-border ${
                              isCompleted ? 'shadow-lg border-green-300' :
                              isLocked ? 'opacity-60' :
                              'shadow-md hover:shadow-lg border-yellow-300'
                            }`}
                            onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                          >
                            <CardContent className="p-4 md:p-6">
                              {/* Lesson Icon and Status */}
                              <div className="flex items-center justify-between mb-4">
                                <motion.div 
                                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                                    isCompleted ? 'bg-green-500' :
                                    isLocked ? 'bg-gray-400' :
                                    'bg-yellow-500'
                                  }`}
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.7 }}
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                  ) : isLocked ? (
                                    <Lock className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                  ) : (
                                    <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                  )}
                                </motion.div>
                                
                                {isCompleted && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Badge className="bg-green-500 text-white text-xs">
                                      Completed ✓
                                    </Badge>
                                  </motion.div>
                                )}
                              </div>

                              {/* Lesson Content */}
                              <div className="space-y-3">
                                <h3 className={`text-base md:text-lg font-bold ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                                  {lesson.title}
                                </h3>
                                <p className={`text-xs md:text-sm ${isLocked ? 'text-muted-foreground/60' : 'text-muted-foreground'}`}>
                                  {lesson.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LessonTrack;
