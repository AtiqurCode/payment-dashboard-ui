import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, Filter } from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  method: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN001",
    date: "2025-01-20",
    description: "Monthly payout - January",
    amount: 2500.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN002",
    date: "2025-01-15",
    description: "Payout request",
    amount: 1200.50,
    status: "pending",
    method: "PayPal",
  },
  {
    id: "TXN003",
    date: "2025-01-10",
    description: "Commission earnings",
    amount: 850.75,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN004",
    date: "2025-01-05",
    description: "Affiliate revenue",
    amount: 1450.00,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN005",
    date: "2024-12-28",
    description: "Year-end payout",
    amount: 5000.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN006",
    date: "2024-12-22",
    description: "Holiday bonus payout",
    amount: 3500.00,
    status: "completed",
    method: "Card",
  },
  {
    id: "TXN007",
    date: "2024-12-15",
    description: "Mid-month payout",
    amount: 750.00,
    status: "failed",
    method: "Card",
  },
  {
    id: "TXN008",
    date: "2024-12-10",
    description: "Service fees refund",
    amount: 125.50,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN009",
    date: "2024-12-01",
    description: "Monthly payout - December",
    amount: 3200.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN010",
    date: "2024-11-28",
    description: "Quarterly bonus",
    amount: 4200.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN011",
    date: "2024-11-20",
    description: "Referral earnings",
    amount: 680.25,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN012",
    date: "2024-11-15",
    description: "Sales commission",
    amount: 920.00,
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "TXN013",
    date: "2024-11-10",
    description: "Bonus payment",
    amount: 1500.00,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN014",
    date: "2024-11-05",
    description: "Consulting fees",
    amount: 2100.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN015",
    date: "2024-11-01",
    description: "Monthly payout - November",
    amount: 2800.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN016",
    date: "2024-10-28",
    description: "Freelance project",
    amount: 3400.00,
    status: "completed",
    method: "Card",
  },
  {
    id: "TXN017",
    date: "2024-10-22",
    description: "Partnership revenue",
    amount: 1850.00,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN018",
    date: "2024-10-18",
    description: "Service contract",
    amount: 2250.00,
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "TXN019",
    date: "2024-10-15",
    description: "Referral bonus",
    amount: 450.00,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN020",
    date: "2024-10-10",
    description: "Marketing commission",
    amount: 1100.00,
    status: "completed",
    method: "Card",
  },
  {
    id: "TXN021",
    date: "2024-10-05",
    description: "Performance bonus",
    amount: 1800.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN022",
    date: "2024-10-01",
    description: "Monthly payout - October",
    amount: 2650.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN023",
    date: "2024-09-28",
    description: "Consulting services",
    amount: 2900.00,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN024",
    date: "2024-09-22",
    description: "Project milestone",
    amount: 3100.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN025",
    date: "2024-09-18",
    description: "Affiliate earnings",
    amount: 720.00,
    status: "failed",
    method: "Card",
  },
  {
    id: "TXN026",
    date: "2024-09-15",
    description: "Sales commission Q3",
    amount: 4500.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN027",
    date: "2024-09-10",
    description: "Service fees",
    amount: 890.00,
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN028",
    date: "2024-09-05",
    description: "Contract payment",
    amount: 2400.00,
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "TXN029",
    date: "2024-09-01",
    description: "Monthly payout - September",
    amount: 2750.00,
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "TXN030",
    date: "2024-08-28",
    description: "Sponsorship revenue",
    amount: 5500.00,
    status: "completed",
    method: "Card",
  },
];

export const TransactionTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: Transaction["status"]) => {
    const variants = {
      completed: "default",
      pending: "secondary",
      failed: "destructive",
    } as const;

    const colors = {
      completed: "bg-success/10 text-success hover:bg-success/20",
      pending: "bg-warning/10 text-warning hover:bg-warning/20",
      failed: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    };

    return (
      <Badge className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{transaction.method}</TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell className="text-right font-semibold">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No transactions found matching your filters.
        </div>
      )}

      {filteredTransactions.length > 0 && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
