import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { financialCourse, getUserProgress, Lesson } from "@/data/financialCourse";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Flame, 
  ChevronRight, 
  Calendar, 
  Trophy, 
  Gift,
  GraduationCap,
  Users,
  Timer,
  Lock,
  CheckCircle2
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState(getUserProgress());
  const isMobile = useIsMobile();
  const { isMobile: isMobileSidebar, setOpenMobile } = useSidebar();
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || '';

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
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

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
      <MetricsBar xp={progress.totalXP} streak={progress.currentStreak} lessons={`${progress.completedLessons.length}/${getTotalLessons()}`} />
      <ScrollArea className="h-screen bg-white dark:bg-[#151c23]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4 py-6 space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="space-y-4">          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1 pl-14 sm:pl-0">
              <h2 className="text-3xl font-medium tracking-tight leading-relaxed text-foreground/90">
                Good {timeOfDay}{firstName ? `, ${firstName}` : ''}
              </h2>
              <p className="text-base text-muted-foreground/80 font-normal leading-relaxed">
                Welcome back to your financial learning journey
              </p>
            </div>
          </div>
          <Separator className="my-8 opacity-40" />
        </motion.div>

        {/* Stats Overview - Enhanced Design */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
              <Trophy className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                Level {Math.floor(progress.totalXP / 100) + 1}
              </div>
              <Progress 
                value={(progress.totalXP % 100)} 
                className="mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-2">
                {progress.totalXP} XP total
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {progress.currentStreak} days
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Best: {Math.max(progress.currentStreak, 7)} days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion</CardTitle>
              <Target className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {progress.completedLessons.length}/{getTotalLessons()}
              </div>
              <Progress 
                value={getCompletionPercentage()} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {getCompletionPercentage()}% complete
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rewards</CardTitle>
              <Gift className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {Math.floor(progress.totalXP / 50)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Unlocked achievements
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Continue Learning - Enhanced */}
        {nextLesson && (
          <motion.div variants={itemVariants}>
            <Card className="border-2 border-primary/10 bg-gradient-to-r from-primary/5 to-background">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">Continue Your Journey</CardTitle>
                    <CardDescription>Your next lesson is ready</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {Math.round(progress.completedLessons.length / getTotalLessons() * 100)}% Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{nextLesson.title}</h3>
                    <p className="text-muted-foreground">{nextLesson.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {nextLesson.estimatedTime} minutes
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-primary" />
                      {nextLesson.xpReward} XP
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Today's Lesson
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-end">
                  <Button 
                    onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90"
                    size="lg"
                  >
                    Start Now <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Learning Path - Professional Enhancement */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">              <div className="space-y-1">                <h2 className="text-2xl font-medium tracking-tight text-foreground/90">Learning Path</h2>
                <p className="text-base text-muted-foreground/70 font-normal leading-relaxed">Master financial literacy step by step</p>
              </div>
            </div>
            <Tabs defaultValue="inProgress" className="w-full">              <TabsList className="w-full sm:w-auto bg-muted/50">
                <TabsTrigger value="inProgress" className="flex-1 sm:flex-none text-sm font-normal">In Progress</TabsTrigger>
                <TabsTrigger value="upcoming" className="flex-1 sm:flex-none text-sm font-normal">Upcoming</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1 sm:flex-none text-sm font-normal">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="inProgress" className="mt-4">
                <ScrollArea className="w-full" type="always">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
                    {financialCourse.map((unit, index) => {
                      const completedLessons = unit.lessons.filter(lesson => 
                        progress.completedLessons.includes(lesson.id)
                      ).length;
                      const totalLessons = unit.lessons.length;
                      const unitProgress = (completedLessons / totalLessons) * 100;
                      const isInProgress = completedLessons > 0 && completedLessons < totalLessons;

                      if (!isInProgress) return null;

                      return (
                        <motion.div key={unit.id} variants={itemVariants}>
                          <Card 
                            className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/50"
                            onClick={() => navigate('/lessons')}
                          >                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
                            <CardHeader className="relative pb-0">
                              <div className="flex items-start gap-6">
                                <div className="relative">
                                  <div className={`w-14 h-14 rounded-2xl ${unit.color} flex items-center justify-center text-white font-bold text-xl shadow-lg relative overflow-hidden group-hover:scale-105 transition-transform`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                                    {index + 1}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
                                    <BookOpen className="h-3 w-3 text-primary" />
                                  </div>
                                </div>
                                <div className="space-y-2.5 flex-1">
                                  <div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors mb-1">
                                      {unit.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-relaxed text-muted-foreground/90">
                                      {unit.description}
                                    </CardDescription>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <Badge variant="secondary" className="bg-primary/5 text-primary hover:bg-primary/10">
                                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                                      {completedLessons}/{totalLessons} Lessons
                                    </Badge>
                                    <Badge variant="secondary" className="bg-muted hover:bg-muted/80">
                                      <Timer className="h-3.5 w-3.5 mr-1" />
                                      {unit.lessons.length * 15}min
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-6">                              <div className="space-y-2">
                                <Progress 
                                  value={unitProgress} 
                                  className="h-2.5 bg-muted/50"
                                />
                              </div>
                            </CardContent>
                            <CardFooter className="border-t bg-muted/5">
                              <div className="flex items-center gap-1.5">
                                <Award className="h-4 w-4 text-primary" />
                                <span className="text-sm font-normal tracking-wide text-primary/90">+{unit.lessons.length * 50} XP</span>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-4">
                <ScrollArea className="w-full" type="always">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
                    {financialCourse.map((unit, index) => {
                      const completedLessons = unit.lessons.filter(lesson => 
                        progress.completedLessons.includes(lesson.id)
                      ).length;
                      const totalLessons = unit.lessons.length;

                      if (completedLessons > 0) return null;

                      return (
                        <motion.div key={unit.id} variants={itemVariants}>
                          <Card className="group relative overflow-hidden border-border opacity-80">                            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-muted/80 flex items-center justify-center">
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <span className="text-sm font-medium text-muted-foreground">Complete previous units to unlock</span>
                              </div>
                            </div>
                            <CardHeader className="relative pb-0">
                              <div className="flex items-start gap-6">
                                <div className="relative">
                                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground font-bold text-xl shadow-sm relative overflow-hidden">
                                    {index + 1}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-border flex items-center justify-center">
                                    <Lock className="h-3 w-3 text-muted-foreground" />
                                  </div>
                                </div>
                                <div className="space-y-2.5 flex-1">
                                  <div>
                                    <CardTitle className="text-xl text-muted-foreground mb-1">{unit.title}</CardTitle>
                                    <CardDescription className="text-sm leading-relaxed text-muted-foreground/70">
                                      {unit.description}
                                    </CardDescription>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <Badge variant="secondary" className="bg-muted/50">
                                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                                      {totalLessons} Lessons
                                    </Badge>
                                    <Badge variant="secondary" className="bg-muted/50">
                                      <Timer className="h-3.5 w-3.5 mr-1" />
                                      {totalLessons * 15}min
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                  <span className="font-medium text-muted-foreground">Course Progress</span>
                                  <span className="text-muted-foreground">Locked</span>
                                </div>
                                <Progress value={0} className="h-2.5 bg-muted/30" />
                              </div>
                            </CardContent>
                            <CardFooter className="border-t border-border/50 bg-muted/5">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-1.5">
                                  <Award className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm font-medium text-muted-foreground">+{totalLessons * 50} XP</span>
                                </div>
                                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" disabled>
                                  Locked
                                  <Lock className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </TabsContent>

              <TabsContent value="completed" className="mt-4">
                <ScrollArea className="w-full" type="always">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
                    {financialCourse.map((unit, index) => {
                      const completedLessons = unit.lessons.filter(lesson => 
                        progress.completedLessons.includes(lesson.id)
                      ).length;
                      const totalLessons = unit.lessons.length;
                      
                      if (completedLessons < totalLessons) return null;

                      return (
                        <motion.div key={unit.id} variants={itemVariants}>
                          <Card 
                            className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/20 bg-primary/5"
                            onClick={() => navigate('/lessons')}
                          >                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50" />
                            <CardHeader className="relative pb-0">
                              <div className="flex items-start gap-6">
                                <div className="relative">
                                  <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl relative overflow-hidden group-hover:scale-105 transition-transform">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                                    {index + 1}
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                                  </div>
                                </div>
                                <div className="space-y-2.5 flex-1">
                                  <div>                                    <CardTitle className="text-lg font-medium text-primary group-hover:text-primary/80 transition-colors mb-1.5">
                                      {unit.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm font-normal leading-relaxed text-muted-foreground/80">
                                      {unit.description}
                                    </CardDescription>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <Badge variant="default" className="bg-primary/20 text-primary">
                                      <GraduationCap className="h-3.5 w-3.5 mr-1" />
                                      Completed
                                    </Badge>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                                      {totalLessons} Lessons
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm mb-1.5">
                                  <span className="font-medium text-foreground/80">Course Mastered</span>
                                  <span className="text-primary font-semibold">100%</span>
                                </div>
                                <Progress 
                                  value={100} 
                                  className="h-2.5 bg-muted/50"
                                />
                              </div>
                            </CardContent>
                            <CardFooter className="border-t border-primary/10 bg-primary/5">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5">
                                    <Trophy className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">Mastered</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <Award className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">+{totalLessons * 50} XP</span>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary/80">
                                  Review
                                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        {/* Daily Goals - Enhanced */}
        <Card className="bg-gradient-to-br from-background to-muted/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">Daily Goals</CardTitle>
                <CardDescription>Complete these tasks to earn rewards</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <Trophy className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">Complete Lesson</h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-muted-foreground">Daily Goal</p>
                        <Badge variant="secondary">0/1</Badge>
                      </div>
                      <Progress value={0} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">Earn XP</h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-muted-foreground">50 XP Goal</p>
                        <Badge variant="secondary">{Math.min(progress.totalXP % 100, 50)}/50</Badge>
                      </div>
                      <Progress value={(progress.totalXP % 100) * 2} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">Study Time</h4>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-muted-foreground">15min Goal</p>
                        <Badge variant="secondary">0/15</Badge>
                      </div>
                      <Progress value={0} className="mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ScrollArea>
    </>
  );
};

export default Dashboard;
