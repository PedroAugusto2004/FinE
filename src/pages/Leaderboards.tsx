import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Flame } from "lucide-react";

const Leaderboards = () => {
  const leaderboardData = [
    { rank: 1, name: "Alex Chen", xp: 2450, streak: 15, avatar: "AC", badge: Trophy },
    { rank: 2, name: "Sarah Johnson", xp: 2380, streak: 12, avatar: "SJ", badge: Award },
    { rank: 3, name: "Mike Rodriguez", xp: 2290, streak: 18, avatar: "MR", badge: Medal },
    { rank: 4, name: "Emma Thompson", xp: 2150, streak: 8, avatar: "ET", badge: null },
    { rank: 5, name: "David Kim", xp: 2100, streak: 22, avatar: "DK", badge: null },
    { rank: 6, name: "You", xp: 150, streak: 1, avatar: "YU", badge: null, isCurrentUser: true },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-6 space-y-8 max-w-3xl mx-auto w-full">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Leaderboards</h1>
        <p className="text-xl text-muted-foreground">
          See how you stack up against other learners
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
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
      </div>

      {/* Leaderboard */}
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
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
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
                      {user.streak} day streak 🔥
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={user.isCurrentUser ? 'default' : 'secondary'}>
                    {user.xp} XP
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5" />
            Achievement Badges
          </CardTitle>
          <CardDescription>
            Earn badges by reaching milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "First Steps", description: "Complete first lesson", icon: "🎯", earned: true },
              { name: "Week Warrior", description: "7 day streak", icon: "⚡", earned: false },
              { name: "Quiz Master", description: "100% on 5 quizzes", icon: "🧠", earned: false },
              { name: "Dedicated", description: "30 day streak", icon: "💎", earned: false },
            ].map((badge) => (
              <div
                key={badge.name}
                className={`p-4 rounded-lg border text-center space-y-2 ${
                  badge.earned 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/50 border-muted opacity-60'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboards;
