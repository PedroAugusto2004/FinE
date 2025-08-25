import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { getUserProgress } from "@/data/financialCourse";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, 
  Target, 
  BookOpen, 
  Award, 
  Flame, 
  ChevronRight, 
  Trophy, 
  Gift,
  GraduationCap,
  TrendingUp,
  DollarSign,
  PiggyBank,
  LineChart,
  Building,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import MetricsBar from "@/components/MetricsBar";
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

const financialCourses = [
  {
    id: 1,
    title: "Financial Basics",
    description: "Master the fundamentals of personal finance, budgeting, and money management",
    difficulty: "Beginner",
    lessons: 12,
    duration: "4 weeks",
    xp: 600,
    icon: PiggyBank,
    color: "from-green-500 to-emerald-600",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30",
    progress: 75,
    enrolled: true
  },
  {
    id: 2,
    title: "Investment Fundamentals",
    description: "Learn the basics of investing, stocks, bonds, and building your first portfolio",
    difficulty: "Beginner",
    lessons: 15,
    duration: "5 weeks",
    xp: 750,
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-600",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30",
    progress: 0,
    enrolled: false
  },
  {
    id: 3,
    title: "Advanced Trading Strategies",
    description: "Master complex trading techniques, technical analysis, and risk management",
    difficulty: "Advanced",
    lessons: 20,
    duration: "8 weeks",
    xp: 1000,
    icon: LineChart,
    color: "from-purple-500 to-violet-600",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30",
    progress: 0,
    enrolled: false
  },
  {
    id: 4,
    title: "Retirement Planning",
    description: "Plan for your future with comprehensive retirement and pension strategies",
    difficulty: "Intermediate",
    lessons: 18,
    duration: "6 weeks",
    xp: 900,
    icon: Target,
    color: "from-orange-500 to-red-500",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30",
    progress: 0,
    enrolled: false
  },
  {
    id: 5,
    title: "Real Estate Investment",
    description: "Explore property investment, REITs, and real estate market analysis",
    difficulty: "Intermediate",
    lessons: 16,
    duration: "7 weeks",
    xp: 800,
    icon: Building,
    color: "from-teal-500 to-green-600",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30",
    progress: 0,
    enrolled: false
  },
  {
    id: 6,
    title: "Cryptocurrency & DeFi",
    description: "Navigate the world of digital assets, blockchain, and decentralized finance",
    difficulty: "Advanced",
    lessons: 22,
    duration: "10 weeks",
    xp: 1100,
    icon: DollarSign,
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30",
    progress: 0,
    enrolled: false
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
    case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progress, setProgress] = useState(getUserProgress());
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || '';

  useEffect(() => {
    setProgress(getUserProgress());
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 18) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
  }, []);

  return (
    <>
      <MetricsBar xp={progress.totalXP} streak={progress.currentStreak} lessons={`${progress.completedLessons.length}/50`} />
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="container mx-auto px-4 py-6 space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1 pl-14 sm:pl-0">
                <h2 className="text-3xl font-medium tracking-tight leading-relaxed text-foreground/90">
                  Good {timeOfDay}{firstName ? `, ${firstName}` : ''}
                </h2>
                <p className="text-base text-muted-foreground/80 font-normal leading-relaxed">
                  Master your financial future with expert-designed courses
                </p>
              </div>
            </div>
            <Separator className="my-8 opacity-40" />
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30 border-gray-200/50 dark:border-gray-700/50">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-primary">
                        Level {Math.floor(progress.totalXP / 100) + 1}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {progress.totalXP} XP total
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                      <Flame className="h-6 w-6 text-orange-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-orange-500">
                        {progress.currentStreak} days
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Best: {Math.max(progress.currentStreak, 7)} days
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-green-500">
                        1/6
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Courses completed
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-bold text-blue-500">
                        {Math.floor(progress.totalXP / 500)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Earned certificates
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Financial Courses */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-medium tracking-tight text-foreground/90">Financial Courses</h2>
              <p className="text-base text-muted-foreground/70 font-normal leading-relaxed">
                Choose your learning path based on your experience level
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialCourses.map((course) => {
                const IconComponent = course.icon;
                return (
                  <motion.div key={course.id} variants={itemVariants}>
                    <Card 
                      className={`group relative overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br ${course.bgColor} hover:scale-[1.02]`}
                      onClick={() => navigate('/lessons')}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      <CardHeader className="relative pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <IconComponent className={`h-8 w-8 text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300`} />
                          <Badge className={getDifficultyColor(course.difficulty)}>
                            {course.difficulty}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="text-sm leading-relaxed text-muted-foreground/90 line-clamp-2">
                            {course.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="h-4 w-4 text-muted-foreground" />
                              <span>{course.lessons} lessons</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                        </div>
                        

                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">Progress</span>
                            <span className="text-primary font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium text-primary">+{course.xp} XP</span>
                          </div>
                          
                          <Button 
                            size="sm" 
                            className="relative overflow-hidden bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-foreground hover:bg-white/20 dark:hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
                          >
                            <span className="relative z-10">{course.enrolled ? 'Continue' : 'Start Course'}</span>
                            <ChevronRight className="h-4 w-4 ml-1 relative z-10" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>


        </motion.div>
      </div>
    </>
  );
};

export default Dashboard;
