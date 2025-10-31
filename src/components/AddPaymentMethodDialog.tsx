import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, Building2, Wallet, Plus } from "lucide-react";
import { toast } from "sonner";
import { PayoutMethod } from "./PayoutMethodCard";

const cardSchema = z.object({
  type: z.literal("card"),
  cardholderName: z.string().min(3, "Name must be at least 3 characters"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Invalid month"),
  expiryYear: z.string().regex(/^\d{2}$/, "Invalid year"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  billingZip: z.string().min(5, "ZIP code required"),
});

const bankSchema = z.object({
  type: z.literal("bank"),
  accountHolderName: z.string().min(3, "Name must be at least 3 characters"),
  accountNumber: z.string().min(8, "Account number must be at least 8 digits"),
  routingNumber: z.string().regex(/^\d{9}$/, "Routing number must be 9 digits"),
  accountType: z.enum(["checking", "savings"]),
  bankName: z.string().min(2, "Bank name required"),
});

const paypalSchema = z.object({
  type: z.literal("paypal"),
  email: z.string().email("Invalid email address"),
  confirmEmail: z.string().email("Invalid email address"),
});

const paymentMethodSchema = z.discriminatedUnion("type", [
  cardSchema,
  bankSchema,
  paypalSchema,
]);

type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>;

interface AddPaymentMethodDialogProps {
  onAdd: (method: PayoutMethod) => void;
  trigger?: React.ReactNode;
}

export const AddPaymentMethodDialog = ({ onAdd, trigger }: AddPaymentMethodDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"card" | "bank" | "paypal">("card");

  const form = useForm<PaymentMethodFormData>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: "card",
    },
  });

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  const handleSubmit = (data: PaymentMethodFormData) => {
    // Validate PayPal email confirmation
    if (data.type === "paypal" && data.email !== data.confirmEmail) {
      form.setError("confirmEmail", {
        type: "manual",
        message: "Emails don't match",
      });
      return;
    }

    let newMethod: PayoutMethod;

    if (data.type === "card") {
      newMethod = {
        id: Date.now().toString(),
        type: "card",
        name: `${data.cardholderName}'s Card`,
        details: `••••${data.cardNumber.slice(-4)}`,
        isDefault: false,
      };
    } else if (data.type === "bank") {
      newMethod = {
        id: Date.now().toString(),
        type: "bank",
        name: data.bankName,
        details: `••••${data.accountNumber.slice(-4)}`,
        isDefault: false,
      };
    } else {
      newMethod = {
        id: Date.now().toString(),
        type: "paypal",
        name: "PayPal Account",
        details: data.email,
        isDefault: false,
      };
    }

    onAdd(newMethod);
    toast.success("Payment method added successfully!");
    setOpen(false);
    form.reset();
  };

  const handleTypeChange = (type: "card" | "bank" | "paypal") => {
    setSelectedType(type);
    form.reset({ type });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Method
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Add Payment Method</DialogTitle>
          <DialogDescription>
            Add a new payout method to receive your payments
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2 my-4">
          <Button
            type="button"
            variant={selectedType === "card" ? "default" : "outline"}
            onClick={() => handleTypeChange("card")}
            className="flex flex-col h-auto py-3 sm:py-4"
          >
            <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs">Card</span>
          </Button>
          <Button
            type="button"
            variant={selectedType === "bank" ? "default" : "outline"}
            onClick={() => handleTypeChange("bank")}
            className="flex flex-col h-auto py-3 sm:py-4"
          >
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs">Bank</span>
          </Button>
          <Button
            type="button"
            variant={selectedType === "paypal" ? "default" : "outline"}
            onClick={() => handleTypeChange("paypal")}
            className="flex flex-col h-auto py-3 sm:py-4"
          >
            <Wallet className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs">PayPal</span>
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {selectedType === "card" && (
              <>
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={formatCardNumber(field.value || "")}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\s/g, "");
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <FormField
                    control={form.control}
                    name="expiryMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">Month</FormLabel>
                        <FormControl>
                          <Input placeholder="MM" maxLength={2} {...field} className="text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiryYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">Year</FormLabel>
                        <FormControl>
                          <Input placeholder="YY" maxLength={2} {...field} className="text-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs sm:text-sm">CVV</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="123"
                            maxLength={4}
                            {...field}
                            className="text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="billingZip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {selectedType === "bank" && (
              <>
                <FormField
                  control={form.control}
                  name="accountHolderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Holder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Chase Bank" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="checking">Checking</SelectItem>
                          <SelectItem value="savings">Savings</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="routingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routing Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789" maxLength={9} {...field} />
                      </FormControl>
                      <FormDescription>9-digit bank routing number</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {selectedType === "paypal" && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PayPal Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the email associated with your PayPal account
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-primary w-full sm:w-auto">
                Add Payment Method
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
