import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Mail, Bell, Lock } from "lucide-react";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  confirmEmail: z.string().email("Invalid email address"),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

export const AccountSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "john.doe@example.com",
      confirmEmail: "john.doe@example.com",
    },
  });

  const onPasswordSubmit = (data: z.infer<typeof passwordSchema>) => {
    console.log("Password changed:", data);
    toast.success("Password updated successfully!");
    passwordForm.reset();
  };

  const onEmailSubmit = (data: z.infer<typeof emailSchema>) => {
    console.log("Email changed:", data);
    toast.success("Email update request sent! Please check your inbox.");
    emailForm.reset();
  };

  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated!");
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5" />
          <h2 className="text-lg sm:text-xl font-semibold">Change Password</h2>
        </div>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters long
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </Card>

      {/* Change Email */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5" />
          <h2 className="text-lg sm:text-xl font-semibold">Change Email Address</h2>
        </div>
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={emailForm.control}
              name="confirmEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update Email</Button>
          </form>
        </Form>
      </Card>

      {/* Notification Preferences */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5" />
          <h2 className="text-lg sm:text-xl font-semibold">Notification Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={(checked) => {
                setEmailNotifications(checked);
                handleNotificationUpdate();
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications on your device
              </p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={(checked) => {
                setPushNotifications(checked);
                handleNotificationUpdate();
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Transaction Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when transactions occur
              </p>
            </div>
            <Switch
              checked={transactionAlerts}
              onCheckedChange={(checked) => {
                setTransactionAlerts(checked);
                handleNotificationUpdate();
              }}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates and promotional content
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={(checked) => {
                setMarketingEmails(checked);
                handleNotificationUpdate();
              }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

