import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { financialCourse } from "@/data/financialCourse";
import { Clock, Award, CheckCircle, Lock, Play, DollarSign, Coins, Banknote, PiggyBank, TrendingUp } from "lucide-react";
import { useUserProgress, useUserStats } from "@/hooks/useUserProgress";
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

const LessonTrack = () => {
  const navigate = useNavigate();
  const { data: userProgress } = useUserProgress();
  const { data: userStats } = useUserStats();
  const isMobile = useIsMobile();

  const getCompletedLessons = () => {
    return userProgress?.map(p => p.lesson_id) || [];
  };

  const completedLessons = getCompletedLessons();

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
          className="text-center mb-6 md:mb-8"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Your Financial Journey
          </motion.h1>
          <motion.p 
            className="text-muted-foreground text-sm md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Follow the money trail to financial mastery
          </motion.p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6 md:mb-8 bg-card border-border hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-green-600">{userStats?.total_xp || 0}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Total XP</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">{userStats?.current_streak || 0}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Day Streak 🔥</div>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2, type: "tween" }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-purple-600">{userStats?.lessons_completed || 0}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Lessons Completed</div>
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
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-300 to-emerald-300 h-full z-0"
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1 }}
            />
          )}

          {financialCourse.map((unit, unitIndex) => (
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
                <Card className="bg-card shadow-xl border-border w-full md:w-auto hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-4 md:p-6 text-center">
                    <motion.div 
                      className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full ${unit.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.7 }}
                    >
                      <span className="text-lg md:text-2xl font-bold text-white">{unitIndex + 1}</span>
                    </motion.div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{unit.title}</h2>
                    <p className="text-muted-foreground text-sm md:text-base">{unit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Lessons */}
              <div className="space-y-6 md:space-y-8">
                {unit.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.includes(lesson.id);
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
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LessonTrack;
