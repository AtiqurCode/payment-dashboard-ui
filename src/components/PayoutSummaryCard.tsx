import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface PayoutSummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "default" | "success" | "primary";
}

export const PayoutSummaryCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: PayoutSummaryCardProps) => {
  const gradientClass = {
    default: "bg-gradient-card",
    success: "bg-gradient-success",
    primary: "bg-gradient-primary",
  }[variant];

  const iconColorClass = {
    default: "text-primary",
    success: "text-success-foreground",
    primary: "text-primary-foreground",
  }[variant];

  const textColorClass = {
    default: "text-card-foreground",
    success: "text-success-foreground",
    primary: "text-primary-foreground",
  }[variant];

  return (
    <Card className={`${gradientClass} p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border-0`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <p className={`text-xs sm:text-sm font-medium ${variant === "default" ? "text-muted-foreground" : "text-white/90"}`}>
            {title}
          </p>
          <div>
            <h3 className={`text-2xl sm:text-3xl font-bold ${textColorClass} break-words`}>{value}</h3>
            {subtitle && (
              <p className={`text-xs sm:text-sm mt-1 ${variant === "default" ? "text-muted-foreground" : "text-white/80"}`}>
                {subtitle}
              </p>
            )}
          </div>
          {trend && (
            <div className="flex flex-wrap items-center gap-1 text-xs sm:text-sm">
              <span className={trend.isPositive ? "text-success" : "text-destructive"}>
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
              <span className={`${variant === "default" ? "text-muted-foreground" : "text-white/70"}`}>
                vs last month
              </span>
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-xl flex-shrink-0 ${variant === "default" ? "bg-primary/10" : "bg-white/20"}`}>
          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${iconColorClass}`} />
        </div>
      </div>
    </Card>
  );
};
