
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { financialCourse, getUserProgress, Lesson } from "@/data/financialCourse";
import { Clock, Target, TrendingUp, BookOpen, Award } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());

  const getNextLesson = (): Lesson | null => {
    for (const unit of financialCourse) {
      for (const lesson of unit.lessons) {
        if (lesson.isUnlocked && !progress.completedLessons.includes(lesson.id)) {
          return lesson;
        }
      }
    }
    return null;
  };

  const getTotalLessons = () => {
    return financialCourse.reduce((total, unit) => total + unit.lessons.length, 0);
  };

  const getCompletionPercentage = () => {
    const total = getTotalLessons();
    const completed = progress.completedLessons.length;
    return Math.round((completed / total) * 100);
  };

  const nextLesson = getNextLesson();

  useEffect(() => {
    setProgress(getUserProgress());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header with Sidebar Trigger */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="flex h-14 items-center px-4">
          <SidebarTrigger className="mr-4" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">FinE</h1>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Master Your <span className="text-primary">Financial Future</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Learn essential financial skills through interactive lessons and build lasting money management habits.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Total XP</CardTitle>
              <Award className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-primary">{progress.totalXP}</div>
              <p className="text-xs text-muted-foreground">
                Level {Math.floor(progress.totalXP / 100) + 1}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Streak</CardTitle>
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-orange-500">{progress.currentStreak}</div>
              <p className="text-xs text-muted-foreground">
                🔥 Keep it going!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Completed</CardTitle>
              <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-green-500">{progress.completedLessons.length}</div>
              <p className="text-xs text-muted-foreground">
                of {getTotalLessons()} lessons
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs md:text-sm font-medium">Progress</CardTitle>
              <Target className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg md:text-2xl font-bold text-blue-500">{getCompletionPercentage()}%</div>
              <Progress value={getCompletionPercentage()} className="mt-2 h-1 md:h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Continue Learning */}
        {nextLesson && (
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg md:text-xl">Continue Learning</CardTitle>
                  <CardDescription className="text-sm">Pick up where you left off</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary w-fit">
                  Next Lesson
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-base md:text-lg">{nextLesson.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{nextLesson.description}</p>
                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    {nextLesson.estimatedTime} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-3 w-3 md:h-4 md:w-4" />
                    +{nextLesson.xpReward} XP
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="w-full md:w-auto bg-primary hover:bg-primary/90"
                size="lg"
              >
                Start Lesson {nextLesson.icon}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Course Units */}
        <div className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold">Course Units</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {financialCourse.map((unit, index) => {
              const completedLessons = unit.lessons.filter(lesson => 
                progress.completedLessons.includes(lesson.id)
              ).length;
              const totalLessons = unit.lessons.length;
              const unitProgress = (completedLessons / totalLessons) * 100;

              return (
                <Card key={unit.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${unit.color} flex items-center justify-center text-white font-bold text-base md:text-lg`}>
                        {index + 1}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {completedLessons}/{totalLessons}
                      </Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors text-base md:text-lg">
                      {unit.title}
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">{unit.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span>Progress</span>
                        <span>{Math.round(unitProgress)}%</span>
                      </div>
                      <Progress value={unitProgress} className="h-1 md:h-2" />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm"
                      onClick={() => navigate('/lessons')}
                    >
                      View Lessons
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Daily Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Daily Goals</CardTitle>
            <CardDescription className="text-sm">Complete these tasks to maintain your streak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <div className="flex items-center space-x-3 p-3 md:p-4 rounded-lg border">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base">Complete 1 lesson</p>
                  <p className="text-xs md:text-sm text-muted-foreground">0/1 completed</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 md:p-4 rounded-lg border">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base">Earn 50 XP</p>
                  <p className="text-xs md:text-sm text-muted-foreground">{Math.min(progress.totalXP % 100, 50)}/50 XP</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 md:p-4 rounded-lg border">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base">Study 15 minutes</p>
                  <p className="text-xs md:text-sm text-muted-foreground">0/15 minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
