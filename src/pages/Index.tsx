import { useState } from "react";
import { PayoutSummaryCard } from "@/components/PayoutSummaryCard";
import { TransactionTable } from "@/components/TransactionTable";
import { PayoutMethodCard, PayoutMethod } from "@/components/PayoutMethodCard";
import { RequestPayoutModal } from "@/components/RequestPayoutModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AddPaymentMethodDialog } from "@/components/AddPaymentMethodDialog";
import {
  Wallet,
  Clock,
  Calendar,
  CircleDollarSign,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Index = () => {
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethod[]>([
    {
      id: "1",
      type: "bank",
      name: "Chase Checking",
      details: "••••4532",
      isDefault: true,
    },
    {
      id: "2",
      type: "paypal",
      name: "PayPal Account",
      details: "user@example.com",
      isDefault: false,
    },
    {
      id: "3",
      type: "card",
      name: "Visa Debit",
      details: "••••8901",
      isDefault: false,
    },
    {
      id: "4",
      type: "bank",
      name: "Bank of America",
      details: "••••7623",
      isDefault: false,
    },
    {
      id: "5",
      type: "card",
      name: "Mastercard",
      details: "••••3456",
      isDefault: false,
    },
    {
      id: "6",
      type: "paypal",
      name: "PayPal Business",
      details: "business@company.com",
      isDefault: false,
    },
  ]);

  const handleSetDefault = (id: string) => {
    setPayoutMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    toast.success("Default payout method updated");
  };

  const handleRemove = (id: string) => {
    setPayoutMethods((methods) => methods.filter((method) => method.id !== id));
    toast.success("Payout method removed");
  };

  const handleAddMethod = (method: PayoutMethod) => {
    setPayoutMethods((methods) => [...methods, method]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                <CircleDollarSign className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">Payment</h1>
                <p className="hidden sm:block text-sm text-muted-foreground">Pay More, once</p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-end flex-shrink-0">
              <ThemeToggle />
              <RequestPayoutModal />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 sm:py-8">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6 sm:mb-8">
          <PayoutSummaryCard
            title="Total Balance"
            value="$8,450.00"
            subtitle="Available for payout"
            icon={Wallet}
            variant="primary"
            trend={{ value: "12.5%", isPositive: true }}
          />
          <PayoutSummaryCard
            title="Pending Payouts"
            value="$1,200.50"
            subtitle="Processing"
            icon={Clock}
            variant="default"
          />
          <PayoutSummaryCard
            title="Next Payout"
            value="Feb 1, 2025"
            subtitle="Scheduled automatic"
            icon={Calendar}
            variant="success"
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full max-w-full sm:max-w-md grid-cols-2 h-auto gap-0.5 sm:gap-1">
            <TabsTrigger value="transactions" className="text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-1.5 whitespace-normal sm:whitespace-nowrap break-words min-w-0">
              <span className="truncate">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="methods" className="text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-1.5 whitespace-normal sm:whitespace-nowrap break-words min-w-0">
              <span className="hidden sm:inline truncate">Payout Methods</span>
              <span className="sm:hidden truncate">Methods</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="p-4 sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-1">Transaction History</h2>
                <p className="hidden sm:block text-sm text-muted-foreground">
                  View and filter all your payout transactions
                </p>
              </div>
              <TransactionTable />
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-4">
            <Card className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-1">Payout Methods</h2>
                  <p className="hidden sm:block text-sm text-muted-foreground">
                    Manage how you receive your payments
                  </p>
                </div>
                <AddPaymentMethodDialog onAdd={handleAddMethod} />
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {payoutMethods.map((method) => (
                  <PayoutMethodCard
                    key={method.id}
                    method={method}
                    onSetDefault={handleSetDefault}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
