
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

const moneyIcons = [DollarSign, Coins, Banknote, PiggyBank, TrendingUp];

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
    <div className="min-h-screen bg-background p-3 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Your Financial Journey
          </h1>
          <p className="text-muted-foreground text-sm md:text-lg">Follow the money trail to financial mastery</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6 md:mb-8 bg-card border-border">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">{userStats?.total_xp || 0}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">{userStats?.current_streak || 0}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Day Streak 🔥</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600">{userStats?.lessons_completed || 0}</div>
                <div className="text-xs md:text-sm text-muted-foreground">Lessons Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Track */}
        <div className="relative">
          {/* Central Path Line - Hidden on mobile for cleaner layout */}
          {!isMobile && (
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-300 to-emerald-300 h-full z-0"></div>
          )}

          {financialCourse.map((unit, unitIndex) => (
            <div key={unit.id} className="mb-12 md:mb-16">
              {/* Unit Header */}
              <div className="relative z-10 flex justify-center mb-6 md:mb-8">
                <Card className="bg-card shadow-xl border-border w-full md:w-auto">
                  <CardContent className="p-4 md:p-6 text-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 rounded-full ${unit.color} flex items-center justify-center`}>
                      <span className="text-lg md:text-2xl font-bold text-white">{unitIndex + 1}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{unit.title}</h2>
                    <p className="text-muted-foreground text-sm md:text-base">{unit.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lessons - Simplified layout for mobile */}
              <div className="space-y-6 md:space-y-8">
                {unit.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = !lesson.isUnlocked;
                  const isLeft = !isMobile && lessonIndex % 2 === 0;
                  const IconComponent = moneyIcons[lessonIndex % moneyIcons.length];
                  
                  return (
                    <div 
                      key={lesson.id} 
                      className={`relative flex ${isMobile ? 'justify-center' : isLeft ? 'justify-start pl-8' : 'justify-end pr-8'}`}
                    >
                      {/* Connection Line to Center - Only on desktop */}
                      {!isMobile && (
                        <div className={`absolute top-1/2 ${isLeft ? 'left-1/2 -ml-2' : 'right-1/2 -mr-2'} w-16 h-0.5 ${
                          isCompleted ? 'bg-green-400' : isLocked ? 'bg-gray-300' : 'bg-yellow-400'
                        } z-0`}></div>
                      )}

                      {/* Lesson Node */}
                      <div className={`relative z-10 ${isMobile ? '' : isLeft ? 'ml-16' : 'mr-16'}`}>
                        <Card 
                          className={`w-full max-w-sm md:w-80 transition-all duration-300 cursor-pointer transform hover:scale-105 bg-card border-border ${
                            isCompleted ? 'shadow-lg border-green-300' :
                            isLocked ? 'opacity-60' :
                            'shadow-md hover:shadow-lg border-yellow-300'
                          }`}
                        >
                          <CardContent className="p-4 md:p-6">
                            {/* Lesson Icon and Status */}
                            <div className="flex items-center justify-between mb-4">
                              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500' :
                                isLocked ? 'bg-gray-400' :
                                'bg-yellow-500'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                ) : (
                                  <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                )}
                              </div>
                              
                              {isCompleted && (
                                <Badge className="bg-green-500 text-white text-xs">
                                  Completed ✓
                                </Badge>
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

                              {/* Lesson Stats */}
                              <div className="flex items-center justify-between text-xs md:text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="h-3 w-3 md:h-4 md:w-4" />
                                  {lesson.estimatedTime} min
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                  <Award className="h-3 w-3 md:h-4 md:w-4" />
                                  +{lesson.xpReward} XP
                                </div>
                              </div>

                              {/* Action Button */}
                              <Button 
                                className={`w-full mt-4 text-sm md:text-base ${
                                  isCompleted ? 'bg-green-600 hover:bg-green-700' :
                                  isLocked ? 'bg-gray-400 cursor-not-allowed' :
                                  'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600'
                                } text-white font-semibold`}
                                disabled={isLocked}
                                onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                              >
                                {isCompleted ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                    Review Lesson
                                  </>
                                ) : isLocked ? (
                                  <>
                                    <Lock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                    Locked
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                                    Start Lesson
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Lesson Number Badge - Only on desktop */}
                      {!isMobile && (
                        <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                          isLeft ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2'
                        } w-6 h-6 md:w-8 md:h-8 rounded-full ${
                          isCompleted ? 'bg-green-500' :
                          isLocked ? 'bg-gray-400' :
                          'bg-yellow-500'
                        } flex items-center justify-center text-white font-bold text-xs md:text-sm z-20`}>
                          {unitIndex + 1}.{lessonIndex + 1}
                        </div>
                      )}

                      {/* Mobile lesson number */}
                      {isMobile && (
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs z-20">
                          {unitIndex + 1}.{lessonIndex + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonTrack;
