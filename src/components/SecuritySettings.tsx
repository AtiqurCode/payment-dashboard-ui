import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shield, Smartphone, Monitor, Globe } from "lucide-react";

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

const mockSessions: ActiveSession[] = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "New York, US",
    ipAddress: "192.168.1.1",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "New York, US",
    ipAddress: "192.168.1.2",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
  {
    id: "3",
    device: "Chrome on Windows",
    location: "London, UK",
    ipAddress: "192.168.1.3",
    lastActive: "1 day ago",
    isCurrent: false,
  },
];

export const SecuritySettings = () => {
  const [sessions] = useState<ActiveSession[]>(mockSessions);

  const handleRevokeSession = (sessionId: string) => {
    console.log("Revoking session:", sessionId);
    // Implementation here
  };

  return (
    <div className="space-y-6">
      {/* Two-Factor Authentication */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5" />
              <h2 className="text-lg sm:text-xl font-semibold">Two-Factor Authentication</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Badge variant="secondary">Disabled</Badge>
        </div>
        <Button className="mt-4 w-full sm:w-auto">Enable 2FA</Button>
      </Card>

      {/* Active Sessions */}
      <Card className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Active Sessions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead className="hidden md:table-cell">IP Address</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {session.device.includes("iPhone") || session.device.includes("Android") ? (
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <div className="font-medium text-sm sm:text-base">{session.device}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">
                          {session.location} • {session.ipAddress}
                        </div>
                        {session.isCurrent && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            Current Session
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      {session.location}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">{session.ipAddress}</TableCell>
                  <TableCell className="text-xs sm:text-sm">{session.lastActive}</TableCell>
                  <TableCell className="text-right">
                    {!session.isCurrent && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        className="text-xs sm:text-sm"
                      >
                        Revoke
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" className="mt-4 w-full sm:w-auto">
          Revoke All Other Sessions
        </Button>
      </Card>
    </div>
  );
};

