import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Globe, Clock, Calendar, DollarSign } from "lucide-react";

export const PreferencesSettings = () => {
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [currency, setCurrency] = useState("USD");

  const handleSave = () => {
    toast.success("Preferences saved successfully!");
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5" />
          <h2 className="text-lg sm:text-xl font-semibold">Language & Region</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timezone
            </Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="Europe/London">GMT (London)</SelectItem>
                <SelectItem value="Europe/Paris">CET (Paris)</SelectItem>
                <SelectItem value="Asia/Tokyo">JST (Tokyo)</SelectItem>
                <SelectItem value="Asia/Shanghai">CST (Shanghai)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5" />
          <h2 className="text-lg sm:text-xl font-semibold">Display Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Date Format</Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                <SelectItem value="DD MMM YYYY">DD MMM YYYY</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Default Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
};

