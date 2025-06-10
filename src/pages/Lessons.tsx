
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { financialCourse, getUserProgress } from "@/data/financialCourse";
import { Clock, Award, CheckCircle, Lock, Play } from "lucide-react";

const Lessons = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());

  useEffect(() => {
    setProgress(getUserProgress());
  }, []);

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Financial Education Course</h1>
        <p className="text-xl text-muted-foreground">
          Master personal finance through structured lessons and interactive quizzes
        </p>
      </div>

      {financialCourse.map((unit, unitIndex) => {
        const completedLessons = unit.lessons.filter(lesson => 
          progress.completedLessons.includes(lesson.id)
        ).length;
        const totalLessons = unit.lessons.length;
        const unitProgress = (completedLessons / totalLessons) * 100;

        return (
          <div key={unit.id} className="space-y-6">
            {/* Unit Header */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${unit.color} flex items-center justify-center text-white font-bold text-2xl`}>
                      {unitIndex + 1}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{unit.title}</CardTitle>
                      <CardDescription className="text-lg">{unit.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {completedLessons}/{totalLessons} completed
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Unit Progress</span>
                    <span>{Math.round(unitProgress)}%</span>
                  </div>
                  <Progress value={unitProgress} className="h-3" />
                </div>
              </CardHeader>
            </Card>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unit.lessons.map((lesson, lessonIndex) => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const isLocked = !lesson.isUnlocked;
                
                return (
                  <Card 
                    key={lesson.id} 
                    className={`group transition-all duration-300 cursor-pointer ${
                      isCompleted ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20' :
                      isLocked ? 'border-muted bg-muted/30' :
                      'hover:shadow-lg hover:border-primary/50'
                    }`}
                  >
                    <CardHeader className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                            isCompleted ? 'bg-green-100 text-green-600' :
                            isLocked ? 'bg-muted text-muted-foreground' :
                            'bg-primary/10 text-primary'
                          }`}>
                            {isCompleted ? <CheckCircle className="h-6 w-6" /> :
                             isLocked ? <Lock className="h-6 w-6" /> :
                             lesson.icon}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Lesson {unitIndex + 1}.{lessonIndex + 1}
                          </div>
                        </div>
                        {isCompleted && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Completed
                          </Badge>
                        )}
                      </div>
                      
                      <CardTitle className={`text-xl ${isLocked ? 'text-muted-foreground' : ''}`}>
                        {lesson.title}
                      </CardTitle>
                      <CardDescription className={isLocked ? 'text-muted-foreground/70' : ''}>
                        {lesson.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {lesson.estimatedTime} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          +{lesson.xpReward} XP
                        </div>
                      </div>

                      <Button 
                        className={`w-full ${
                          isCompleted ? 'bg-green-600 hover:bg-green-700' :
                          isLocked ? '' :
                          'bg-primary hover:bg-primary/90'
                        }`}
                        variant={isLocked ? 'secondary' : 'default'}
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
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lessons;
