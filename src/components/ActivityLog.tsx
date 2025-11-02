import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Activity {
  id: string;
  action: string;
  description: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  status: "success" | "failed" | "warning";
}

const mockActivities: Activity[] = [
  {
    id: "1",
    action: "Password Changed",
    description: "Password successfully updated",
    ipAddress: "192.168.1.1",
    location: "New York, US",
    timestamp: "2025-01-20 10:30 AM",
    status: "success",
  },
  {
    id: "2",
    action: "API Key Created",
    description: "New API key 'Production Server' created",
    ipAddress: "192.168.1.1",
    location: "New York, US",
    timestamp: "2025-01-20 09:15 AM",
    status: "success",
  },
  {
    id: "3",
    action: "Login Attempt",
    description: "Failed login attempt from unrecognized device",
    ipAddress: "192.168.1.50",
    location: "London, UK",
    timestamp: "2025-01-19 03:45 PM",
    status: "failed",
  },
  {
    id: "4",
    action: "Email Updated",
    description: "Email address changed to newemail@example.com",
    ipAddress: "192.168.1.1",
    location: "New York, US",
    timestamp: "2025-01-18 02:20 PM",
    status: "success",
  },
  {
    id: "5",
    action: "Session Revoked",
    description: "Active session on Chrome/Windows was revoked",
    ipAddress: "192.168.1.3",
    location: "London, UK",
    timestamp: "2025-01-17 11:00 AM",
    status: "warning",
  },
  {
    id: "6",
    action: "Profile Updated",
    description: "Personal information updated",
    ipAddress: "192.168.1.1",
    location: "New York, US",
    timestamp: "2025-01-16 04:10 PM",
    status: "success",
  },
];

const getStatusBadge = (status: Activity["status"]) => {
  const variants = {
    success: "bg-success/10 text-success hover:bg-success/20",
    failed: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    warning: "bg-warning/10 text-warning hover:bg-warning/20",
  };
  return variants[status];
};

export const ActivityLog = () => {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search activity..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead className="hidden sm:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden lg:table-cell">IP Address</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium text-sm sm:text-base">{activity.action}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                  {activity.description}
                </TableCell>
                <TableCell className="hidden md:table-cell text-sm">{activity.location}</TableCell>
                <TableCell className="hidden lg:table-cell font-mono text-sm">{activity.ipAddress}</TableCell>
                <TableCell className="text-xs sm:text-sm">{activity.timestamp}</TableCell>
                <TableCell>
                  <Badge className={getStatusBadge(activity.status)}>
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

