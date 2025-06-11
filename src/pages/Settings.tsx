
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Monitor, ArrowLeft, Bell, Globe, Shield, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      description: 'Clean and bright interface',
      icon: Sun
    },
    {
      value: 'dark', 
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: Moon
    },
    {
      value: 'system',
      label: 'System',
      description: 'Match your device settings',
      icon: Monitor
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/')} className="flex-shrink-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Customize your learning experience and app preferences
          </p>
        </div>

        {/* Theme Settings */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Monitor className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Choose how FinanceAcademy looks on your device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label className="text-sm font-medium text-card-foreground">Theme</Label>
              <RadioGroup value={theme} onValueChange={(value: 'light' | 'dark' | 'system') => setTheme(value)}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {themeOptions.map((option) => (
                    <div key={option.value}>
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-border bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                      >
                        <option.icon className="mb-3 h-6 w-6" />
                        <div className="text-center">
                          <div className="font-semibold text-card-foreground">{option.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {option.description}
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-card-foreground">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about lessons and achievements
                </p>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base text-card-foreground">Sound Effects</Label>
                <p className="text-sm text-muted-foreground">
                  Play sounds for interactions and achievements
                </p>
              </div>
              <Switch 
                checked={soundEffects} 
                onCheckedChange={setSoundEffects}
              />
            </div>
          </CardContent>
        </Card>

        {/* Learning Preferences */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Globe className="h-5 w-5" />
              Learning Preferences
            </CardTitle>
            <CardDescription>
              Customize your learning experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-card-foreground">Daily Goal</Label>
                <RadioGroup defaultValue="moderate">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual" className="text-card-foreground">Casual (5 min/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="text-card-foreground">Moderate (15 min/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intensive" id="intensive" />
                    <Label htmlFor="intensive" className="text-card-foreground">Intensive (30 min/day)</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label className="text-card-foreground">Reminder Time</Label>
                <RadioGroup defaultValue="evening">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning" className="text-card-foreground">Morning (9:00 AM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon" className="text-card-foreground">Afternoon (2:00 PM)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="evening" id="evening" />
                    <Label htmlFor="evening" className="text-card-foreground">Evening (7:00 PM)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-border text-card-foreground">
              View Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-card-foreground">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 border-border">
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-card-foreground">
              <HelpCircle className="h-5 w-5" />
              Help & Support
            </CardTitle>
            <CardDescription>
              Get help and provide feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-border text-card-foreground">
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-card-foreground">
              Contact Support
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-card-foreground">
              Send Feedback
            </Button>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                FinanceAcademy v1.0.0
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
