import React, { useState } from 'react';
import { CreditCard, Smartphone, MapPin, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (paymentMethod: string) => {
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Incomplete Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing - real mein payment gateway integrate karenge
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      onClose();
      
      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Payment via ${paymentMethod} successful. Order confirmation sent to your email.`,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout - Order Summary</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order summary */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-primary">₹{state.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Customer information form */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Customer Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400001"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Delivery Address *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Full address with landmark"
                rows={3}
              />
            </div>
          </div>

          {/* Payment method selection */}
          <div>
            <h3 className="font-semibold mb-4">Choose Payment Method</h3>
            
            <Tabs defaultValue="upi" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upi" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  UPI Payment
                </TabsTrigger>
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Card Payment
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upi" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-medium">UPI Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Pay using Google Pay, PhonePe, Paytm or any UPI app
                  </p>
                </div>
                <Button 
                  onClick={() => handlePayment('UPI')}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${state.total.toLocaleString('en-IN')} via UPI`}
                </Button>
              </TabsContent>
              
              <TabsContent value="card" className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Card Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Pay securely using your Credit/Debit card
                  </p>
                </div>
                <Button 
                  onClick={() => handlePayment('Card')}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${state.total.toLocaleString('en-IN')} via Card`}
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Security note */}
          <p className="text-xs text-center text-muted-foreground">
            🔒 Your payment information is secure and encrypted. 
            Demo mode hai - real payment nahi hoga!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;