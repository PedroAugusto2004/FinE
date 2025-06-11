
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { financialCourse, getUserProgress, Lesson } from "@/data/financialCourse";
import { Clock, Target, TrendingUp, BookOpen, Award } from "lucide-react";

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
    <div className="min-h-screen p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Master Your <span className="text-primary">Financial Future</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn essential financial skills through interactive lessons and build lasting money management habits.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total XP</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{progress.totalXP}</div>
            <p className="text-xs text-muted-foreground">
              Level {Math.floor(progress.totalXP / 100) + 1}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{progress.currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              🔥 Keep it going!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{progress.completedLessons.length}</div>
            <p className="text-xs text-muted-foreground">
              of {getTotalLessons()} total lessons
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{getCompletionPercentage()}%</div>
            <Progress value={getCompletionPercentage()} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Continue Learning */}
      {nextLesson && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Next Lesson
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{nextLesson.title}</h3>
              <p className="text-muted-foreground">{nextLesson.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {nextLesson.estimatedTime} min
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
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
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Course Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialCourse.map((unit, index) => {
            const completedLessons = unit.lessons.filter(lesson => 
              progress.completedLessons.includes(lesson.id)
            ).length;
            const totalLessons = unit.lessons.length;
            const unitProgress = (completedLessons / totalLessons) * 100;

            return (
              <Card key={unit.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg ${unit.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {index + 1}
                    </div>
                    <Badge variant="outline">
                      {completedLessons}/{totalLessons}
                    </Badge>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {unit.title}
                  </CardTitle>
                  <CardDescription>{unit.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(unitProgress)}%</span>
                    </div>
                    <Progress value={unitProgress} />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
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
          <CardTitle>Daily Goals</CardTitle>
          <CardDescription>Complete these tasks to maintain your streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Complete 1 lesson</p>
                <p className="text-sm text-muted-foreground">0/1 completed</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Earn 50 XP</p>
                <p className="text-sm text-muted-foreground">{Math.min(progress.totalXP % 100, 50)}/50 XP</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 rounded-lg border">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="font-medium">Study 15 minutes</p>
                <p className="text-sm text-muted-foreground">0/15 minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
