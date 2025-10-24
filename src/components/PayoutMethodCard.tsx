import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Building2, Wallet, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface PayoutMethod {
  id: string;
  type: "card" | "bank" | "paypal";
  name: string;
  details: string;
  isDefault: boolean;
}

interface PayoutMethodCardProps {
  method: PayoutMethod;
  onSetDefault: (id: string) => void;
  onRemove: (id: string) => void;
}

export const PayoutMethodCard = ({ method, onSetDefault, onRemove }: PayoutMethodCardProps) => {
  const getIcon = () => {
    switch (method.type) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "bank":
        return <Building2 className="h-5 w-5" />;
      case "paypal":
        return <Wallet className="h-5 w-5" />;
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {getIcon()}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{method.name}</h4>
              {method.isDefault && (
                <Badge variant="secondary" className="text-xs">
                  Default
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{method.details}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            {!method.isDefault && (
              <DropdownMenuItem onClick={() => onSetDefault(method.id)}>
                Set as default
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => onRemove(method.id)}
              className="text-destructive"
            >
              Remove method
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
