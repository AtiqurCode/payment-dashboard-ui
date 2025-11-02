import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Filter, Eye, Download, Mail, MoreVertical, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreateInvoiceDialog } from "./CreateInvoiceDialog";
import { InvoiceDetails } from "./InvoiceDetails";
import { toast } from "sonner";

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  status: "draft" | "sent" | "paid" | "overdue";
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  createdAt: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    clientName: "Acme Corporation",
    clientEmail: "billing@acme.com",
    clientAddress: "123 Business St, New York, NY 10001",
    issueDate: "2025-01-15",
    dueDate: "2025-02-15",
    status: "paid",
    items: [
      { description: "Web Development Services", quantity: 40, price: 150 },
      { description: "UI/UX Design", quantity: 20, price: 120 },
    ],
    subtotal: 8400,
    tax: 840,
    total: 9240,
    notes: "Payment received. Thank you!",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    clientName: "Tech Solutions Inc",
    clientEmail: "finance@techsol.com",
    clientAddress: "456 Innovation Ave, San Francisco, CA 94102",
    issueDate: "2025-01-20",
    dueDate: "2025-02-20",
    status: "sent",
    items: [
      { description: "Consulting Services", quantity: 30, price: 200 },
      { description: "System Architecture", quantity: 15, price: 250 },
    ],
    subtotal: 9750,
    tax: 975,
    total: 10725,
    notes: "Payment due within 30 days",
    createdAt: "2025-01-20T14:30:00Z",
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    clientName: "Digital Marketing Pro",
    clientEmail: "accounts@dmp.com",
    clientAddress: "789 Marketing Blvd, Los Angeles, CA 90001",
    issueDate: "2025-01-10",
    dueDate: "2025-01-25",
    status: "overdue",
    items: [
      { description: "SEO Services", quantity: 1, price: 5000 },
      { description: "Content Writing", quantity: 50, price: 50 },
    ],
    subtotal: 7500,
    tax: 750,
    total: 8250,
    notes: "Please remit payment as soon as possible",
    createdAt: "2025-01-10T09:15:00Z",
  },
];

const getStatusBadge = (status: Invoice["status"]) => {
  const variants = {
    draft: "bg-muted text-muted-foreground",
    sent: "bg-warning/10 text-warning hover:bg-warning/20",
    paid: "bg-success/10 text-success hover:bg-success/20",
    overdue: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };
  return variants[status];
};

interface InvoiceListProps {
  invoices: Invoice[];
  onInvoiceCreated: (invoice: Invoice) => void;
  onInvoiceUpdate: (invoice: Invoice) => void;
}

export const InvoiceList = ({ invoices, onInvoiceCreated, onInvoiceUpdate }: InvoiceListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (invoice: Invoice, newStatus: Invoice["status"]) => {
    const updated = { ...invoice, status: newStatus };
    onInvoiceUpdate(updated);
    toast.success(`Invoice status updated to ${newStatus}`);
  };

  const handleDownload = (invoice: Invoice) => {
    // Generate PDF (simulated)
    toast.success("Invoice PDF generated! (Feature coming soon)");
    // In production, this would generate and download a PDF
  };

  const handleSendEmail = (invoice: Invoice) => {
    toast.success(`Invoice sent to ${invoice.clientEmail}`);
  };

  const handleDuplicateInvoice = (invoice: Invoice) => {
    const duplicated: Invoice = {
      ...invoice,
      id: Date.now().toString(),
      invoiceNumber: `${invoice.invoiceNumber}-COPY`,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    onInvoiceCreated(duplicated);
    toast.success("Invoice duplicated successfully!");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-1">Invoices</h2>
          <p className="text-sm text-muted-foreground">Create and manage your invoices</p>
        </div>
        <CreateInvoiceDialog onInvoiceCreated={onInvoiceCreated} />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search invoices..."
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
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoice Table */}
      <Card className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">Invoice #</TableHead>
                <TableHead className="min-w-[150px]">Client</TableHead>
                <TableHead className="hidden sm:table-cell">Issue Date</TableHead>
                <TableHead className="hidden md:table-cell">Due Date</TableHead>
                <TableHead className="text-right min-w-[100px]">Amount</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedInvoice(invoice)}
                >
                  <TableCell className="font-mono text-sm font-semibold">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{invoice.clientName}</span>
                      <span className="text-xs text-muted-foreground sm:hidden">
                        {new Date(invoice.issueDate).toLocaleDateString()} • {invoice.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {new Date(invoice.issueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${invoice.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(invoice.status)}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedInvoice(invoice)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicateInvoice(invoice)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(invoice)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendEmail(invoice)}>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        {invoice.status !== "paid" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(invoice, "paid")}
                          >
                            Mark as Paid
                          </DropdownMenuItem>
                        )}
                        {invoice.status !== "sent" && invoice.status !== "paid" && (
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(invoice, "sent")}
                          >
                            Mark as Sent
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No invoices found matching your filters.
          </div>
        )}
      </Card>

      {/* Invoice Details Dialog */}
      {selectedInvoice && (
        <Dialog open={!!selectedInvoice} onOpenChange={() => setSelectedInvoice(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-4 p-4 sm:p-6">
            <InvoiceDetails invoice={selectedInvoice} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Export mock invoices for initial state
export { mockInvoices };

