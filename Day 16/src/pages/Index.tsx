import React, { useState } from 'react';
import Header from '@/components/Header';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import { CartProvider } from '@/context/CartContext';

// Main page component - yahan sab kuch integrate kiya hai
const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);
  
  const handleCheckoutOpen = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  
  const handleCheckoutClose = () => setIsCheckoutOpen(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        {/* Header with cart button */}
        <Header onCartClick={handleCartOpen} />
        
        {/* Hero section - simple welcome message */}
        <section className="py-16 px-4 text-center bg-gradient-to-br from-background to-secondary/30">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Welcome to Samadhan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Your one-stop shop for premium electronics and gadgets. 
              Best quality, best prices - bas yehi chahiye na!
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
              <span>✨ Free Delivery</span>
              <span>🔒 Secure Payment</span>
              <span>📱 Easy Returns</span>
              <span>💯 Quality Guaranteed</span>
            </div>
          </div>
        </section>

        {/* Products section */}
        <ProductGrid />
        
        {/* Footer - simple footer */}
        <footer className="border-t py-12 px-4 bg-muted/50">
          <div className="container mx-auto text-center">
            <h3 className="font-semibold mb-4">Samadhan Store</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Making shopping simple and enjoyable for everyone.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="hover:text-primary">About Us</a>
              <a href="#" className="hover:text-primary">Contact</a>
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms</a>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              © 2024 Samadhan Store. Made with ❤️ in India.
            </p>
          </div>
        </footer>

        {/* Cart drawer - sliding from right */}
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={handleCartClose}
          onCheckout={handleCheckoutOpen}
        />

        {/* Checkout modal - overlay */}
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          onClose={handleCheckoutClose}
        />
      </div>
    </CartProvider>
  );
};

export default Index;
