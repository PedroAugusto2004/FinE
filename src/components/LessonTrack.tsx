
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            Your Financial Journey
          </h1>
          <p className="text-gray-600 text-lg">Follow the money trail to financial mastery</p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 bg-gradient-to-r from-green-100 to-emerald-100 border-0">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{userStats?.total_xp || 0}</div>
                <div className="text-sm text-gray-600">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{userStats?.current_streak || 0}</div>
                <div className="text-sm text-gray-600">Day Streak 🔥</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{userStats?.lessons_completed || 0}</div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lesson Track */}
        <div className="relative">
          {/* Central Path Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-300 to-emerald-300 h-full z-0"></div>

          {financialCourse.map((unit, unitIndex) => (
            <div key={unit.id} className="mb-16">
              {/* Unit Header */}
              <div className="relative z-10 flex justify-center mb-8">
                <Card className="bg-white shadow-xl border-2 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${unit.color} flex items-center justify-center`}>
                      <span className="text-2xl font-bold text-white">{unitIndex + 1}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{unit.title}</h2>
                    <p className="text-gray-600">{unit.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lessons in zigzag pattern */}
              <div className="space-y-8">
                {unit.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = !lesson.isUnlocked;
                  const isLeft = lessonIndex % 2 === 0;
                  const IconComponent = moneyIcons[lessonIndex % moneyIcons.length];
                  
                  return (
                    <div 
                      key={lesson.id} 
                      className={`relative flex ${isLeft ? 'justify-start pl-8' : 'justify-end pr-8'}`}
                    >
                      {/* Connection Line to Center */}
                      <div className={`absolute top-1/2 ${isLeft ? 'left-1/2 -ml-2' : 'right-1/2 -mr-2'} w-16 h-0.5 ${
                        isCompleted ? 'bg-green-400' : isLocked ? 'bg-gray-300' : 'bg-yellow-400'
                      } z-0`}></div>

                      {/* Lesson Node */}
                      <div className={`relative z-10 ${isLeft ? 'ml-16' : 'mr-16'}`}>
                        <Card 
                          className={`w-80 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                            isCompleted ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-lg' :
                            isLocked ? 'bg-gray-100 border-gray-300' :
                            'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-300 shadow-md hover:shadow-lg'
                          }`}
                        >
                          <CardContent className="p-6">
                            {/* Lesson Icon and Status */}
                            <div className="flex items-center justify-between mb-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                isCompleted ? 'bg-green-500' :
                                isLocked ? 'bg-gray-400' :
                                'bg-yellow-500'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="h-6 w-6 text-white" />
                                ) : isLocked ? (
                                  <Lock className="h-6 w-6 text-white" />
                                ) : (
                                  <IconComponent className="h-6 w-6 text-white" />
                                )}
                              </div>
                              
                              {isCompleted && (
                                <Badge className="bg-green-500 text-white">
                                  Completed ✓
                                </Badge>
                              )}
                            </div>

                            {/* Lesson Content */}
                            <div className="space-y-3">
                              <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                                {lesson.title}
                              </h3>
                              <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>
                                {lesson.description}
                              </p>

                              {/* Lesson Stats */}
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1 text-gray-500">
                                  <Clock className="h-4 w-4" />
                                  {lesson.estimatedTime} min
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                  <Award className="h-4 w-4" />
                                  +{lesson.xpReward} XP
                                </div>
                              </div>

                              {/* Action Button */}
                              <Button 
                                className={`w-full mt-4 ${
                                  isCompleted ? 'bg-green-600 hover:bg-green-700' :
                                  isLocked ? 'bg-gray-400 cursor-not-allowed' :
                                  'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600'
                                } text-white font-semibold`}
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
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Lesson Number Badge */}
                      <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                        isLeft ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2'
                      } w-8 h-8 rounded-full ${
                        isCompleted ? 'bg-green-500' :
                        isLocked ? 'bg-gray-400' :
                        'bg-yellow-500'
                      } flex items-center justify-center text-white font-bold text-sm z-20`}>
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
