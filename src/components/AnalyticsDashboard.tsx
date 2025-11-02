import { useMemo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, DollarSign, CreditCard } from "lucide-react";
import type { Transaction } from "./TransactionTable";

interface AnalyticsDashboardProps {
  transactions: Transaction[];
}

const COLORS = {
  completed: "#10b981",
  pending: "#f59e0b",
  failed: "#ef4444",
};

const PAYMENT_METHOD_COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981"];

export const AnalyticsDashboard = ({ transactions }: AnalyticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");
  const isMobile = useIsMobile();
  const chartHeight = isMobile ? 250 : 300;

  const chartData = useMemo(() => {
    const now = new Date();
    const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : Infinity;
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    const filtered = transactions.filter((t) => {
      const txDate = new Date(t.date);
      return txDate >= cutoffDate;
    });

    // Monthly revenue data
    const monthlyMap = new Map<string, number>();
    filtered.forEach((tx) => {
      if (tx.status === "completed") {
        const date = new Date(tx.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + tx.amount);
      }
    });

    const monthlyData = Array.from(monthlyMap.entries())
      .map(([month, amount]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        revenue: amount,
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Payment method distribution
    const methodMap = new Map<string, number>();
    filtered.forEach((tx) => {
      if (tx.status === "completed") {
        methodMap.set(tx.method, (methodMap.get(tx.method) || 0) + tx.amount);
      }
    });

    const paymentMethodData = Array.from(methodMap.entries()).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));

    // Status distribution
    const statusCounts = {
      completed: filtered.filter((t) => t.status === "completed").length,
      pending: filtered.filter((t) => t.status === "pending").length,
      failed: filtered.filter((t) => t.status === "failed").length,
    };

    const statusData = [
      { name: "Completed", value: statusCounts.completed, color: COLORS.completed },
      { name: "Pending", value: statusCounts.pending, color: COLORS.pending },
      { name: "Failed", value: statusCounts.failed, color: COLORS.failed },
    ];

    // Calculate stats
    const completedTransactions = filtered.filter((t) => t.status === "completed");
    const totalRevenue = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgTransaction = completedTransactions.length > 0 ? totalRevenue / completedTransactions.length : 0;
    const successRate = filtered.length > 0 ? (statusCounts.completed / filtered.length) * 100 : 0;

    // Previous period comparison
    const previousPeriodStart = new Date(cutoffDate.getTime() - daysBack * 24 * 60 * 60 * 1000);
    const previousPeriod = transactions.filter((t) => {
      const txDate = new Date(t.date);
      return txDate >= previousPeriodStart && txDate < cutoffDate && t.status === "completed";
    });
    const previousRevenue = previousPeriod.reduce((sum, t) => sum + t.amount, 0);
    const revenueChange = previousRevenue > 0 ? ((totalRevenue - previousRevenue) / previousRevenue) * 100 : 0;

    return {
      monthlyData,
      paymentMethodData,
      statusData,
      stats: {
        totalRevenue,
        avgTransaction,
        successRate,
        revenueChange,
        totalTransactions: filtered.length,
      },
    };
  }, [transactions, timeRange]);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">Analytics Dashboard</h2>
          <p className="hidden sm:block text-sm text-muted-foreground">Track your financial performance and trends</p>
        </div>
        <Select value={timeRange} onValueChange={(value: "7d" | "30d" | "90d" | "all") => setTimeRange(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Calendar className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold truncate">${chartData.stats.totalRevenue.toFixed(2)}</p>
              <p
                className={`text-xs mt-1 flex items-center gap-1 flex-wrap ${
                  chartData.stats.revenueChange >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                <TrendingUp className="h-3 w-3 flex-shrink-0" />
                <span>{chartData.stats.revenueChange >= 0 ? "+" : ""}{chartData.stats.revenueChange.toFixed(1)}%</span>
                <span className="hidden sm:inline">vs previous period</span>
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Avg Transaction</p>
              <p className="text-xl sm:text-2xl font-bold">${chartData.stats.avgTransaction.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block">Per completed transaction</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-success/10 flex-shrink-0">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Success Rate</p>
              <p className="text-xl sm:text-2xl font-bold">{chartData.stats.successRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {chartData.stats.totalTransactions} <span className="hidden sm:inline">total transactions</span>
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-warning/10 flex-shrink-0">
              <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">Total Transactions</p>
              <p className="text-xl sm:text-2xl font-bold">{chartData.stats.totalTransactions}</p>
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block">In selected period</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 flex-shrink-0">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Revenue Trend */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart data={chartData.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Method Distribution */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Payment Method Distribution</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={chartData.paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PAYMENT_METHOD_COLORS[index % PAYMENT_METHOD_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Status Breakdown */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Transaction Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={chartData.statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))">
                {chartData.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Status Pie Chart */}
        <Card className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={chartHeight}>
            <PieChart>
              <Pie
                data={chartData.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

