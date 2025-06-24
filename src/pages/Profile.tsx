import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Award, TrendingUp, BookOpen, Target, Clock, Zap, Flame, Brain, BookOpenCheck, Diamond } from "lucide-react";
import { getUserProgress } from "@/data/financialCourse";
import { motion } from "framer-motion";
import MetricsBar from "@/components/MetricsBar";
import { useSidebar } from "@/components/ui/sidebar";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Profile = () => {
  const progress = getUserProgress();
  const currentLevel = Math.floor(progress.totalXP / 100) + 1;
  const xpForNextLevel = (currentLevel * 100) - progress.totalXP;
  const levelProgress = ((progress.totalXP % 100) / 100) * 100;

  const achievements = [
    { name: "First Steps", description: "Completed first lesson", earned: true, icon: Target },
    { name: "Quick Learner", description: "Completed 3 lessons in one day", earned: false, icon: Zap },
    { name: "Consistent", description: "Maintained 7-day streak", earned: false, icon: Flame },
    { name: "Quiz Master", description: "Got 100% on 5 quizzes", earned: false, icon: Brain },
    { name: "Knowledge Seeker", description: "Completed 10 lessons", earned: false, icon: BookOpenCheck },
    { name: "Dedicated", description: "Maintained 30-day streak", earned: false, icon: Diamond },
  ];

  const weeklyActivity = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: false },
    { day: "Wed", completed: false },
    { day: "Thu", completed: false },
    { day: "Fri", completed: false },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false },
  ];

  const { isMobile, setOpenMobile } = useSidebar();
  React.useEffect(() => {
    if (!isMobile) return;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isTracking = false;
    const EDGE_THRESHOLD = 300; // px from left edge (adjusted for easier swipe)
    const SWIPE_THRESHOLD = 100; // px to trigger sidebar
    const handleTouchStart = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      if (x <= EDGE_THRESHOLD) {
        isTracking = true;
        touchStartX = x;
        touchEndX = x; // Reset endX to startX on touch start
        touchStartY = y;
      } else {
        isTracking = false;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTracking) return;
      touchEndX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isTracking) return;
      const deltaX = touchEndX - touchStartX;
      // Only open if the user actually swiped horizontally enough (not just tapped)
      if (deltaX > SWIPE_THRESHOLD) {
        setOpenMobile(true);
      }
      isTracking = false;
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, setOpenMobile]);

  return (
    <>
      <MetricsBar xp={progress.totalXP} streak={progress.currentStreak} lessons={`${progress.completedLessons.length}/15`} />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen w-full bg-white dark:bg-[#151c23] text-foreground p-3 sm:p-6 space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              FS
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">Finance Student</h1>
            <p className="text-muted-foreground">Learning financial literacy one lesson at a time</p>
          </div>
        </motion.div>

        {/* Level Progress */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">Level {currentLevel}</p>
                  <p className="text-sm text-muted-foreground">{xpForNextLevel} XP to next level</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{progress.totalXP} XP</p>
                  <p className="text-sm text-muted-foreground">Total earned</p>
                </div>
              </div>
              <Progress value={levelProgress} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.currentStreak}</div>
              <p className="text-xs text-muted-foreground">
                <Flame className="inline-block h-4 w-4 mr-1" /> Keep it going!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.completedLessons.length}</div>
              <p className="text-xs text-muted-foreground">
                Out of 15 total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.longestStreak || 1}</div>
              <p className="text-xs text-muted-foreground">
                Personal best
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.completedLessons.length * 15}</div>
              <p className="text-xs text-muted-foreground">
                Minutes learned
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week's Activity
            </CardTitle>
            <CardDescription>Your learning streak this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    day.completed 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {day.completed ? '✓' : ''}
                  </div>
                  <p className="text-xs text-muted-foreground">{day.day}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? 'border-primary bg-primary/5'
                      : 'border-dashed border-muted bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">
                      <achievement.icon className="h-6 w-6" />
                    </span>
                    <div className="flex-1">
                      <p className={`font-semibold ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                        {achievement.name}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-primary/10 text-primary">Earned</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button className="w-full" size="lg">
                Continue Learning
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                View Progress Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Profile;
