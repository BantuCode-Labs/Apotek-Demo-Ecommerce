import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PrescriptionScreen from './screens/PrescriptionScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import HistoryScreen from './screens/HistoryScreen';
import { Product, CartItem, Order, Address } from './types';
import { INITIAL_PRODUCTS, MAIN_ADDRESS, INITIAL_ORDERS } from './data';

export default function App() {
  // Navigation tabs state ('home', 'search', 'prescription', 'cart', 'checkout', 'history')
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Shared datasets state
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [mainAddress] = useState<Address>(MAIN_ADDRESS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  
  // Initialize cart pre-loaded with matching materials to mock cart totals matching Image 4
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 2 }, // Paracetamol 500 mg: Rp 12.500 * 2
    { product: INITIAL_PRODUCTS[1], quantity: 1 }, // Vitamin C 500 mg: Rp 45.000 * 1
    { product: INITIAL_PRODUCTS[2], quantity: 1 }  // Nasal Spray Reliever: Rp 78.200 * 1
  ]);

  // General App queries
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Promo code active status by default (SEHATSENTOSA15 = Rp 15.000)
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(true);
  
  // Modal viewer detail item state
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // CART STATE HANDLERS
  const handleAddToCart = (product: Product) => {
    // Prevent adding if stockStatus = 'out_of_stock'
    if (product.stockStatus === 'out_of_stock') return;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    
    // Jump route directly to cart to review additions
    setActiveTab('cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // CHECKOUT PAYMENT ORDERS SUBMISSION
  const handlePlaceOrder = (
    shippingMethod: string,
    shippingCost: number,
    paymentMethod: string,
    paymentProvider: string
  ) => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = isPromoApplied && subtotal > 15000 ? 15000 : 0;
    const finalTotal = subtotal + shippingCost - discount;

    const newOrder: Order = {
      id: `SSA-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      status: 'Diproses',
      totalPrice: finalTotal,
      shippingCost,
      discount,
      shippingAddress: mainAddress,
      shippingMethod,
      paymentMethod: `${paymentProvider} (${paymentMethod})`,
      items: cart.map((item, idx) => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        quantity: item.quantity,
        price: item.product.price,
        unit: item.product.unit,
        ...(idx === 0 && cart.length > 1 ? { extraCount: cart.length - 1 } : {})
      }))
    };

    // Pre-empt registered order elements, wipe cart, redirect to tracking!
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
    setActiveTab('history');
  };

  // DOCTOR PRESCRIPTION DEPOSIT ORDER TRIGGER
  const handleAddPrescriptionOrder = (notes: string, fileName: string, fileUrl: string) => {
    // Generate a new special code order representing prescription verification!
    const newOrder: Order = {
      id: `SSA-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      status: 'Diproses',
      totalPrice: 145000, // Fixed package preview
      shippingCost: 10000,
      discount: 15000,
      shippingAddress: mainAddress,
      shippingMethod: 'Kurir Motor (Reguler)',
      paymentMethod: 'BCA (Transfer Bank)',
      items: [
        {
          id: 'rx_verification',
          name: `Obat Resep Terverifikasi: ${fileName}`,
          image: fileUrl,
          quantity: 1,
          price: 145000,
          unit: 'Wadah Racik Higienis Klinis'
        }
      ]
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    // Redirect route to track this live prescription order
    setActiveTab('history');
  };

  // RE-ORDER CONVERT PAUSED ORDERS TO CURRENT CARTS
  const handleReorder = (order: Order) => {
    // Map existing order items to cart format
    const newCartItems: CartItem[] = [];
    order.items.forEach(orderItem => {
      // Find corresponding product item in our catalog
      const catalogProduct = products.find(p => p.id === orderItem.id) || {
        id: orderItem.id,
        name: orderItem.name,
        brand: 'Rx Spec',
        category: 'Obat Resep',
        description: 'Sediaan obat dokter teruji spesifik.',
        price: orderItem.price,
        image: orderItem.image,
        unit: orderItem.unit,
        stockStatus: 'available' as const,
        rating: 5.0,
        ratingCount: 15
      };

      newCartItems.push({
        product: catalogProduct,
        quantity: orderItem.quantity
      });
    });

    setCart(newCartItems);
    setActiveTab('cart');
  };

  // CHANGE STATUS SIMULATION DEMO ENGINE
  const handleSetStatus = (orderId: string, status: 'Diproses' | 'Dikirim' | 'Selesai') => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // SEARCH TRIGGER FROM HEADER
  const handleSearchOnCatalog = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfdfd] flex flex-col justify-between font-sans selection:bg-[#006c51]/20 selection:text-emerald-900">
      
      {/* 1. SECURE GLISTENING NAVIGATION HEADER */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onSearch={handleSearchOnCatalog}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. DYNAMIC CONTENT MAIN COMPARTMENT */}
      <main className="flex-grow pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && (
          <HomeScreen
            products={products}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveTab}
            onViewProductDetail={(p) => {
              setSelectedProductDetail(p);
              setActiveTab('search');
            }}
          />
        )}

        {activeTab === 'search' && (
          <SearchScreen
            products={products}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedProductDetail={selectedProductDetail}
            setSelectedProductDetail={setSelectedProductDetail}
          />
        )}

        {activeTab === 'prescription' && (
          <PrescriptionScreen
            onAddPrescriptionOrder={handleAddPrescriptionOrder}
            mainAddress={mainAddress}
          />
        )}

        {activeTab === 'cart' && (
          <CartScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            isPromoApplied={isPromoApplied}
            setIsPromoApplied={setIsPromoApplied}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'checkout' && (
          <CheckoutScreen
            cart={cart}
            mainAddress={mainAddress}
            isPromoApplied={isPromoApplied}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {activeTab === 'history' && (
          <HistoryScreen
            orders={orders}
            onReorder={handleReorder}
            onSetStatus={handleSetStatus}
          />
        )}
      </main>

      {/* 4. CLINICALLY POLISHED SHARED FOOTER */}
      <Footer onNavigate={setActiveTab} />
      
    </div>
  );
}
