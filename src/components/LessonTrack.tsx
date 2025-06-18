import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { financialCourse } from "@/data/financialCourse";
import { Lock, ArrowRight } from "lucide-react";
import { useUserProgress, useUserStats } from "@/hooks/useUserProgress";
import { useProgressCalculations } from "@/hooks/useProgressCalculations";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const LessonTrack = () => {
  const navigate = useNavigate();
  const { data: userProgress } = useUserProgress();
  const { data: userStats } = useUserStats();
  const progress = useProgressCalculations();

  const completedLessons = new Set(userProgress?.map(p => p.lesson_id) || []);

  return (
    <motion.div 
      className="min-h-screen bg-background p-4 md:p-8 max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12 space-y-2">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight">
          Your Financial Journey
        </h1>
        <p className="text-sm text-muted-foreground">
          Master your finances, secure your future
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center gap-8 text-sm text-muted-foreground border-b pb-4">
          <div>
            <span className="font-medium text-foreground">{progress.totalProgress.earnedXP}</span> XP
          </div>
          <div>
            <span className="font-medium text-foreground">{progress.streak.current}</span> Day Streak
          </div>
          <div>
            <span className="font-medium text-foreground">{progress.totalProgress.completedLessons}/{progress.totalProgress.totalLessons}</span> Lessons
          </div>
        </div>
      </motion.div>

      {/* Lesson Track */}
      <div className="space-y-16">
        {financialCourse.map((unit, unitIndex) => {
          const unitStats = progress.unitProgress[unit.id];
          
          return (
            <motion.div 
              key={unit.id} 
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Unit Header */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-lg font-medium text-primary">
                    {unitIndex + 1}
                  </span>
                  <h2 className="text-xl font-medium">
                    {unit.title}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  {unit.description}
                </p>
                <div className="pl-8 space-y-2">
                  <Progress 
                    value={unitStats?.percentageComplete || 0}
                    className="h-1 w-48"
                  />
                  <div className="text-xs text-muted-foreground">
                    {unitStats?.completedLessons || 0}/{unitStats?.totalLessons || 0} lessons · {unitStats?.earnedXP || 0} XP
                  </div>
                </div>
              </div>

              {/* Lessons */}
              <div className="space-y-4 pl-8">
                {unit.lessons.map((lesson) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const isLocked = !lesson.isUnlocked;
                  
                  return (
                    <motion.div 
                      key={lesson.id}
                      variants={itemVariants}
                      className={cn(
                        "group relative border-l-2 pl-6 py-3 transition-colors",
                        isCompleted ? "border-primary" : "border-border",
                        !isLocked && "hover:border-primary cursor-pointer"
                      )}
                      onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "text-base font-medium group-hover:text-primary transition-colors",
                            isLocked && "text-muted-foreground"
                          )}>
                            {lesson.title}
                          </h3>
                          {!isLocked ? (
                            <ArrowRight className={cn(
                              "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity",
                              isCompleted && "text-primary"
                            )} />
                          ) : (
                            <Lock className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <p className={cn(
                          "text-sm text-muted-foreground",
                          isLocked && "text-muted-foreground/60"
                        )}>
                          {lesson.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default LessonTrack;
