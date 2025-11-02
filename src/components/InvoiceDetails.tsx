import { Invoice } from "./InvoiceList";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Mail, Printer } from "lucide-react";
import { toast } from "sonner";

interface InvoiceDetailsProps {
  invoice: Invoice;
}

const getStatusBadge = (status: Invoice["status"]) => {
  const variants = {
    draft: "bg-muted text-muted-foreground",
    sent: "bg-warning/10 text-warning hover:bg-warning/20",
    paid: "bg-success/10 text-success hover:bg-success/20",
    overdue: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  };
  return variants[status];
};

export const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  const handleDownload = () => {
    toast.success("Invoice PDF generated! (Feature coming soon)");
  };

  const handleSendEmail = () => {
    toast.success(`Invoice sent to ${invoice.clientEmail}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Invoice Details</h2>
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg">{invoice.invoiceNumber}</span>
            <Badge className={getStatusBadge(invoice.status)}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={handleSendEmail}>
            <Mail className="h-4 w-4 mr-2" />
            Send
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="bg-card border rounded-lg p-6 space-y-6">
        {/* Company & Client Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">From</h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold">Your Company Name</p>
              <p className="text-muted-foreground">123 Your Street</p>
              <p className="text-muted-foreground">City, State ZIP</p>
              <p className="text-muted-foreground">Email: billing@yourcompany.com</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Bill To</h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{invoice.clientName}</p>
              <p className="text-muted-foreground">{invoice.clientEmail}</p>
              {invoice.clientAddress && (
                <p className="text-muted-foreground">{invoice.clientAddress}</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Invoice Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Issue Date</p>
            <p className="font-medium">
              {new Date(invoice.issueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Due Date</p>
            <p className="font-medium">
              {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Status</p>
            <Badge className={getStatusBadge(invoice.status)}>
              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Invoice Items */}
        <div>
          <h3 className="font-semibold mb-4">Items</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-semibold text-sm">Description</th>
                  <th className="text-right p-3 font-semibold text-sm">Quantity</th>
                  <th className="text-right p-3 font-semibold text-sm">Price</th>
                  <th className="text-right p-3 font-semibold text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{item.description}</td>
                    <td className="p-3 text-right">{item.quantity}</td>
                    <td className="p-3 text-right">${item.price.toFixed(2)}</td>
                    <td className="p-3 text-right font-medium">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">${invoice.subtotal.toFixed(2)}</span>
            </div>
            {invoice.tax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax:</span>
                <span className="font-medium">${invoice.tax.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Notes</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{invoice.notes}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

