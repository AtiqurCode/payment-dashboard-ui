import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Key, Copy, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
}

const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "pk_live_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
  },
  {
    id: "2",
    name: "Development Key",
    key: "pk_test_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    created: "2024-01-10",
    lastUsed: "1 week ago",
  },
];

export const ApiSettings = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [newKeyName, setNewKeyName] = useState("");

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API key copied to clipboard!");
  };

  const maskKey = (key: string) => {
    if (key.length <= 16) return "•".repeat(key.length);
    return `${key.substring(0, 12)}${"*".repeat(Math.max(0, key.length - 16))}${key.substring(key.length - 4)}`;
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
      toast.error("Please enter a name for the API key");
      return;
    }
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName.trim(),
      key: `pk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
    };
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    toast.success("API key created successfully!");
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== keyId));
    toast.success("API key deleted");
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <h2 className="text-lg sm:text-xl font-semibold">API Keys</h2>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create New Key
              </Button>
            </DialogTrigger>
            <DialogContent className="mx-4">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription>
                  Give your API key a name to identify it later
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Key Name</Label>
                  <Input
                    placeholder="e.g., Production Server"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                  />
                </div>
                <Button onClick={handleCreateKey} className="w-full sm:w-auto">
                  Generate API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border rounded-lg"
            >
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold">{apiKey.name}</h3>
                  {apiKey.name.includes("Production") && (
                    <Badge variant="default">Production</Badge>
                  )}
                  {apiKey.name.includes("Development") && (
                    <Badge variant="secondary">Development</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm overflow-x-auto">
                  <span className="text-muted-foreground break-all">
                    {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                  </span>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys.has(apiKey.id) ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => copyToClipboard(apiKey.key)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteKey(apiKey.id)}
                className="text-destructive hover:text-destructive w-full sm:w-auto"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Webhook URLs */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Webhook URLs</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <Input placeholder="https://your-domain.com/webhook" />
            <p className="text-xs text-muted-foreground">
              Enter the URL where you want to receive webhook notifications
            </p>
          </div>
          <Button className="w-full sm:w-auto">Save Webhook URL</Button>
        </div>
      </Card>
    </div>
  );
};

