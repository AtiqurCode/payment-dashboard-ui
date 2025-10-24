import { useState } from "react";
import { PayoutSummaryCard } from "@/components/PayoutSummaryCard";
import { TransactionTable } from "@/components/TransactionTable";
import { PayoutMethodCard, PayoutMethod } from "@/components/PayoutMethodCard";
import { RequestPayoutModal } from "@/components/RequestPayoutModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Wallet,
  Clock,
  Calendar,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payment Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your payouts and transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <RequestPayoutModal />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
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
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="methods">Payout Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-1">Transaction History</h2>
                <p className="text-sm text-muted-foreground">
                  View and filter all your payout transactions
                </p>
              </div>
              <TransactionTable />
            </Card>
          </TabsContent>

          <TabsContent value="methods" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Payout Methods</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage how you receive your payments
                  </p>
                </div>
                <Button variant="outline" onClick={() => toast.info("Add method feature coming soon!")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Method
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
