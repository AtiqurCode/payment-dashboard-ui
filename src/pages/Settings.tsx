import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ProfileSettings } from "@/components/ProfileSettings";
import { AccountSettings } from "@/components/AccountSettings";
import { PreferencesSettings } from "@/components/PreferencesSettings";
import { SecuritySettings } from "@/components/SecuritySettings";
import { ApiSettings } from "@/components/ApiSettings";
import { ActivityLog } from "@/components/ActivityLog";
import { User, Settings as SettingsIcon, Shield, Key, Bell, Globe } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto gap-1">
            <TabsTrigger value="profile" className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-1.5">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-1.5">
              <SettingsIcon className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-1.5">
              <Globe className="h-4 w-4" />
              <span>Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-1.5">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-1.5">
              <Key className="h-4 w-4" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex flex-col sm:flex-row gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-1.5">
              <Bell className="h-4 w-4" />
              <span>Activity</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="account">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          <TabsContent value="api">
            <ApiSettings />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLog />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;

