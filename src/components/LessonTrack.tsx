
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { financialCourse } from "@/data/financialCourse";
import { Clock, Award, CheckCircle, Lock, Play, DollarSign, Coins, Banknote, PiggyBank, TrendingUp } from "lucide-react";
import { useUserProgress, useUserStats } from "@/hooks/useUserProgress";

const moneyIcons = [DollarSign, Coins, Banknote, PiggyBank, TrendingUp];

const LessonTrack = () => {
  const navigate = useNavigate();
  const { data: userProgress } = useUserProgress();
  const { data: userStats } = useUserStats();

  const getCompletedLessons = () => {
    return userProgress?.map(p => p.lesson_id) || [];
  };

  const completedLessons = getCompletedLessons();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-2">
            Your Financial Journey
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">Follow the money trail to financial mastery</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-500">{userStats?.total_xp || 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-500">{userStats?.current_streak || 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Day Streak 🔥</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-500">{userStats?.lessons_completed || 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Lessons Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Track */}
        <div className="space-y-12">
          {financialCourse.map((unit, unitIndex) => (
            <div key={unit.id}>
              {/* Unit Header */}
              <div className="flex justify-center mb-8">
                <Card className="bg-white shadow-md border border-gray-200 max-w-md w-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full ${unit.color} flex items-center justify-center`}>
                      <span className="text-lg sm:text-2xl font-bold text-white">{unitIndex + 1}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{unit.title}</h2>
                    <p className="text-sm sm:text-base text-gray-600">{unit.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lessons Grid */}
              <div className="grid gap-6 sm:gap-8">
                {unit.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = !lesson.isUnlocked;
                  const IconComponent = moneyIcons[lessonIndex % moneyIcons.length];
                  
                  return (
                    <div key={lesson.id} className="relative">
                      {/* Lesson Card */}
                      <Card 
                        className={`transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${
                          isCompleted ? 'bg-green-50 border-green-200 shadow-md' :
                          isLocked ? 'bg-gray-50 border-gray-200' :
                          'bg-yellow-50 border-yellow-200 shadow-md hover:shadow-lg'
                        }`}
                      >
                        <CardContent className="p-4 sm:p-6">
                          {/* Lesson Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500' :
                                isLocked ? 'bg-gray-400' :
                                'bg-yellow-500'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                ) : (
                                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <h3 className={`text-base sm:text-lg font-bold ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                                  {lesson.title}
                                </h3>
                                <p className={`text-xs sm:text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                            
                            {isCompleted && (
                              <Badge className="bg-green-500 text-white text-xs hidden sm:inline-flex">
                                Completed ✓
                              </Badge>
                            )}
                          </div>

                          {/* Lesson Stats */}
                          <div className="flex items-center justify-between text-xs sm:text-sm mb-4">
                            <div className="flex items-center gap-1 text-gray-500">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                              {lesson.estimatedTime} min
                            </div>
                            <div className="flex items-center gap-1 text-green-600">
                              <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                              +{lesson.xpReward} XP
                            </div>
                          </div>

                          {/* Completed Badge for Mobile */}
                          {isCompleted && (
                            <Badge className="bg-green-500 text-white text-xs mb-4 sm:hidden">
                              Completed ✓
                            </Badge>
                          )}

                          {/* Action Button */}
                          <Button 
                            className={`w-full ${
                              isCompleted ? 'bg-green-600 hover:bg-green-700' :
                              isLocked ? 'bg-gray-400 cursor-not-allowed' :
                              'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                            } text-white font-semibold text-sm sm:text-base`}
                            disabled={isLocked}
                            onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Review Lesson
                              </>
                            ) : isLocked ? (
                              <>
                                <Lock className="h-4 w-4 mr-2" />
                                Locked
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                Start Lesson
                              </>
                            )}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Lesson Number Badge */}
                      <div className={`absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full ${
                        isCompleted ? 'bg-green-500' :
                        isLocked ? 'bg-gray-400' :
                        'bg-yellow-500'
                      } flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md`}>
                        {unitIndex + 1}.{lessonIndex + 1}
                      </div>
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
