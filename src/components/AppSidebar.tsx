import { Home, BookOpen, Trophy, ShoppingBag, User, Settings as SettingsIcon, LogOut, DollarSign, Flame } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStats } from "@/hooks/useUserProgress";
import { useSidebar } from "@/components/ui/sidebar";

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
  const { user, signOut } = useAuth();
  const { data: userStats } = useUserStats();
  const { isMobile, setOpenMobile } = useSidebar();

  // Helper to close sidebar on mobile after navigation
  const handleNavigate = (url: string) => {
    navigate(url);
    if (isMobile) setOpenMobile(false);
  };

  const handleSignOut = async () => {
    await signOut();
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center shadow-lg">
            <DollarSign className="h-7 w-7 text-yellow-400 font-bold" />
          </div>
          <h1 className="text-3xl font-bold text-black dark:text-white">FinE</h1>
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
                      onClick={() => handleNavigate(item.url)}
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
                <Badge variant="secondary">{userStats?.total_xp || 0}</Badge>
              </div>
              <Progress value={((userStats?.total_xp || 0) % 100)} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Streak</span>
                <span className="text-sm font-medium"><Flame className="inline-block h-4 w-4 mr-1" /> {userStats?.current_streak || 0}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-sm font-medium">{userStats?.lessons_completed || 0} lessons</span>
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
                onClick={() => handleNavigate('/settings')}
                className="flex items-center gap-3"
              >
                <SettingsIcon className="h-5 w-5 text-gray-500" />
                <span className="font-medium">Settings</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start py-3 px-4 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Sign Out</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.email}</p>
            <p className="text-xs text-muted-foreground truncate">Level {Math.floor((userStats?.total_xp || 0) / 100) + 1}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
