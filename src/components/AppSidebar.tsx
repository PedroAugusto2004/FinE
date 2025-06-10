
import { Home, BookOpen, Trophy, ShoppingBag, User, Settings as SettingsIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getUserProgress } from "@/data/financialCourse";
import { useState, useEffect } from "react";

const menuItems = [
  {
    title: "Learn",
    url: "/",
    icon: Home,
    color: "text-blue-500"
  },
  {
    title: "Lessons",
    url: "/lessons",
    icon: BookOpen,
    color: "text-green-500"
  },
  {
    title: "Leaderboards",
    url: "/leaderboards", 
    icon: Trophy,
    color: "text-yellow-500"
  },
  {
    title: "Shop",
    url: "/shop",
    icon: ShoppingBag,
    color: "text-purple-500"
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    color: "text-pink-500"
  }
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(getUserProgress());

  useEffect(() => {
    setProgress(getUserProgress());
  }, [location]);

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">F</span>
          </div>
          <h1 className="text-xl font-bold text-primary">FinanceAcademy</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="w-full justify-start py-3 px-4 hover:bg-accent/50 transition-colors"
                  >
                    <button
                      onClick={() => navigate(item.url)}
                      className="flex items-center gap-3"
                    >
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Progress</SidebarGroupLabel>
          <SidebarGroupContent className="px-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total XP</span>
                <Badge variant="secondary">{progress.totalXP}</Badge>
              </div>
              <Progress value={(progress.totalXP % 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Streak</span>
                <span className="text-sm font-medium">🔥 {progress.currentStreak}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-sm font-medium">{progress.completedLessons.length} lessons</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="w-full justify-start py-3 px-4 hover:bg-accent/50 transition-colors"
            >
              <button
                onClick={() => navigate('/settings')}
                className="flex items-center gap-3"
              >
                <SettingsIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Settings</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Finance Student</p>
            <p className="text-xs text-muted-foreground truncate">Level {Math.floor(progress.totalXP / 100) + 1}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
