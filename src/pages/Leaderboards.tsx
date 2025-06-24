import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Flame,
  Target,
  Zap,
  Brain,
  Diamond,
  CheckCircle2,
  GraduationCap
} from "lucide-react";
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

const Leaderboards = () => {
  const { isMobile, setOpenMobile } = useSidebar();

  // Swipe gesture for mobile sidebar open
  React.useEffect(() => {
    if (!isMobile) return;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isTracking = false;
    const EDGE_THRESHOLD = 90; // px from left edge (adjusted for easier swipe)
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

  const leaderboardData = [
    { rank: 1, name: "Alex Chen", xp: 2450, streak: 15, avatar: "AC", badge: Trophy },
    { rank: 2, name: "Sarah Johnson", xp: 2380, streak: 12, avatar: "SJ", badge: Award },
    { rank: 3, name: "Mike Rodriguez", xp: 2290, streak: 18, avatar: "MR", badge: Medal },
    { rank: 4, name: "Emma Thompson", xp: 2150, streak: 8, avatar: "ET", badge: null },
    { rank: 5, name: "David Kim", xp: 2100, streak: 22, avatar: "DK", badge: null },
    { rank: 6, name: "You", xp: 150, streak: 1, avatar: "YU", badge: null, isCurrentUser: true },
  ];

  const achievements = [
    { 
      name: "First Steps", 
      description: "Complete first lesson", 
      icon: Target,
      earned: true,
      color: "text-blue-500"
    },
    { 
      name: "Week Warrior", 
      description: "7 day streak", 
      icon: Flame,
      earned: false,
      color: "text-orange-500"
    },
    { 
      name: "Quiz Master", 
      description: "100% on 5 quizzes", 
      icon: GraduationCap,
      earned: false,
      color: "text-purple-500"
    },
    { 
      name: "Dedicated", 
      description: "30 day streak", 
      icon: Diamond,
      earned: false,
      color: "text-emerald-500"
    }
  ];

  return (
    <>
      <MetricsBar xp={150} streak={1} lessons={"0/5"} />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen w-full bg-white dark:bg-[#151c23] text-foreground p-3 sm:p-6 space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Leaderboards</h1>
          <p className="text-xl text-muted-foreground">
            See how you stack up against other learners
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#6</div>
              <p className="text-xs text-muted-foreground">
                of 100+ learners
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly XP</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150</div>
              <p className="text-xs text-muted-foreground">
                +50 from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1 day</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! <Flame className="inline-block h-4 w-4" />
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                This Week's Top Learners
              </CardTitle>
              <CardDescription>
                Rankings based on XP earned this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      user.isCurrentUser 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground w-8">
                          {user.rank <= 3 ? (
                            user.badge && <user.badge className="h-6 w-6" />
                          ) : (
                            `#${user.rank}`
                          )}
                        </span>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={user.isCurrentUser ? 'bg-primary text-primary-foreground' : ''}>
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className={`font-semibold ${user.isCurrentUser ? 'text-primary' : ''}`}>
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.streak} day streak <Flame className="inline-block h-4 w-4 ml-1" />
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={user.isCurrentUser ? 'default' : 'secondary'}>
                        {user.xp} XP
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Achievements section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </CardTitle>
            <CardDescription>Track your learning milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.name}
                  className={`p-4 rounded-lg border ${
                    achievement.earned 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-muted/50 border-border'
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={`h-12 w-12 rounded-full bg-background flex items-center justify-center ${
                      achievement.earned ? achievement.color : 'text-muted-foreground'
                    }`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default Leaderboards;
