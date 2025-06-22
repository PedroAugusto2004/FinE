import { GraduationCap, NotebookPen, BarChart2, CreditCard, User, Settings as SettingsIcon, LogOut, DollarSign } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Learn",
    url: "/",
    icon: GraduationCap
  },
  {
    title: "Lessons",
    url: "/lessons",
    icon: NotebookPen
  },
  {
    title: "Leaderboards",
    url: "/leaderboards", 
    icon: BarChart2
  },
  {
    title: "Shop",
    url: "/shop",
    icon: CreditCard
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User
  }
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
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

      <SidebarContent className="flex-1 flex flex-col justify-center">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`w-full flex items-center gap-3 px-6 py-4 text-base font-medium rounded-lg transition-colors ${isActive ? 'bg-accent/60' : 'hover:bg-accent/40'}`}
                    >
                      <button
                        onClick={() => handleNavigate(item.url)}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon
                          className={`h-6 w-6 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 dark:text-gray-500'}`}
                          strokeWidth={2}
                        />
                        <span className="flex-1 text-left">{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
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
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
