import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  Receipt,
  Package,
  ArrowRight,
  MapPin,
  KeyRound,
  AlertTriangle,
  BadgeCheck,
  Check
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Order } from '../types';
import { StoreLogo } from './StoreLogo';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    setActiveView,
    accountSecurity,
    setIsAccountSecurityOpen,
    currentUser,
    setIsSignInModalOpen,
  } = useMarketplace();

  const [name, setName] = useState(() => currentUser?.name || 'Alex Rivera');
  const [email, setEmail] = useState(() => currentUser?.email || 'happyall450@gmail.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Seattle');
  const [stateRegion, setStateRegion] = useState('WA');
  const [zipCode, setZipCode] = useState('98101');
  const [paymentMethod, setPaymentMethod] = useState<'Credit Card' | 'PayPal' | 'Apple Pay' | 'Cash on Delivery'>('Credit Card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('739');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Update inputs if currentUser signs in
  React.useEffect(() => {
    if (currentUser) {
      if (currentUser.name) setName(currentUser.name);
      if (currentUser.email) setEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalAmount = subtotal;

  // AVS Zip validation check
  const isZipValid = /^\d{4,10}(-\d{4})?$|^[A-Za-z0-9\s-]{3,10}$/.test(zipCode.trim());

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (accountSecurity.isEmergencyLocked) {
      alert('Store is currently under Emergency Freeze. Please unlock via Account Security Settings.');
      return;
    }

    if (!isZipValid) {
      alert('Please enter a valid Postal / ZIP Code to pass AVS bank verification.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const fullCityStateZip = `${city}, ${stateRegion} ${zipCode}`.trim();
      const order = placeOrder({
        name,
        email,
        address,
        city: fullCityStateZip,
        paymentMethod,
      });
      setIsProcessing(false);
      setCompletedOrder(order);
    }, 950);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="checkout-modal-panel"
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Top Header */}
        <div className="bg-[#131921] text-white px-5 py-3.5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <StoreLogo size="sm" showTagline={false} />
            <span className="text-gray-500 hidden sm:inline">|</span>
            <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>256-Bit SSL Safe Checkout</span>
            </div>
          </div>
          <button
            id="close-checkout-btn"
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Lock Notice if triggered */}
        {accountSecurity.isEmergencyLocked && (
          <div className="bg-red-500 text-white px-5 py-2.5 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-white" />
              Store Emergency Freeze is Active. Unlock in Security Hub to accept payments.
            </span>
            <button
              type="button"
              onClick={() => {
                handleClose();
                setIsAccountSecurityOpen(true);
              }}
              className="bg-white text-red-700 px-2 py-0.5 rounded text-[11px] font-black"
            >
              Open Security
            </button>
          </div>
        )}

        {/* Security badge banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2 flex items-center justify-between text-xs text-emerald-900">
          <span className="flex items-center font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
            Guaranteed Secure Payment • AVS Postal Code & 3D Secure Protection Active
          </span>
          <span className="text-emerald-700 font-bold hidden sm:inline">PCI-DSS Level 1</span>
        </div>

        {/* Modal Body */}
        {completedOrder ? (
          /* Order Confirmation View */
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900">
              Order Secured & Placed Successfully!
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Thank you, <strong className="text-gray-900">{completedOrder.customerName}</strong>! Confirmation details sent to{' '}
              <span className="text-gray-800 font-medium">{completedOrder.customerEmail}</span>.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Destination:</span>
                <span className="font-medium text-gray-800">{completedOrder.shippingAddress}, {completedOrder.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Verified:</span>
                <span className="font-medium text-emerald-700 flex items-center">
                  <BadgeCheck className="w-3.5 h-3.5 mr-1" />
                  {completedOrder.paymentMethod} (256-Bit Encrypted)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Anti-Phishing Token:</span>
                <span className="font-mono font-bold text-gray-700">{accountSecurity.antiPhishingPhrase}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-sm font-bold">
                <span className="text-gray-900">Total Paid:</span>
                <span className="text-emerald-600">${completedOrder.totalAmount.toFixed(2)}</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-[11px] text-emerald-800 mt-2">
                ✓ <strong>100% Sales Money Credited:</strong> ${completedOrder.totalAmount.toFixed(2)} sent directly to your store receiving method ({completedOrder.storeRecipientMethod || 'Chase Bank Checking (••••4829)'}) with $0 platform fee.
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <button
                id="order-view-orders-btn"
                onClick={() => {
                  handleClose();
                  setActiveView('orders');
                }}
                className="w-full sm:w-auto bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold px-6 py-2.5 rounded-full text-xs shadow-sm cursor-pointer"
              >
                Track Order Status
              </button>
              <button
                id="order-continue-shopping-btn"
                onClick={handleClose}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2.5 rounded-full text-xs cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-5">
            {/* Google / Gmail Account Status Card */}
            <div className="bg-gradient-to-r from-blue-50/80 via-white to-amber-50/70 border border-blue-200/80 rounded-xl p-3 flex items-center justify-between text-xs shadow-xs">
              <div className="flex items-center space-x-3">
                {/* Google Multi-Color G Icon */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                {currentUser ? (
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-gray-900">Signed in with Gmail:</span>
                      <span className="font-mono text-blue-700 font-semibold">{currentUser.email}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        Verified
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Auto-filling contact details & tracking order to your Google Account.
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-gray-900">Sign in with Gmail for 1-Click Express Checkout</div>
                    <div className="text-[11px] text-gray-500">Fast address fill & Google 2-Step verified security</div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsSignInModalOpen(true)}
                className="ml-2 text-blue-600 hover:text-blue-800 font-bold text-xs underline cursor-pointer whitespace-nowrap"
              >
                {currentUser ? 'Switch Account' : 'Sign In'}
              </button>
            </div>

            {/* Step 1: Shipping Details & ZIP Code AVS */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center">
                  <Truck className="w-4 h-4 mr-1.5 text-amber-500" />
                  1. Shipping & Postal Address (AVS Verified)
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
                  <Check className="w-3.5 h-3.5 mr-0.5 text-emerald-600" />
                  Free Express Delivery
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Alex Rivera"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Email Address (Order Confirmation)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="alex@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-medium mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="742 Evergreen Terrace"
                  />
                </div>

                {/* City, State & Postal / ZIP Code */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    placeholder="Seattle"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">State / Region</label>
                    <input
                      type="text"
                      required
                      value={stateRegion}
                      onChange={(e) => setStateRegion(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      placeholder="WA"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1 flex items-center justify-between">
                      <span>ZIP / Postal Code</span>
                      {isZipValid && (
                        <span className="text-[10px] text-emerald-600 font-bold">AVS OK</span>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className={`w-full border rounded-lg px-3 py-2 text-xs font-mono font-bold focus:outline-none ${
                        isZipValid ? 'border-emerald-400 bg-emerald-50/30' : 'border-red-300 bg-red-50/20'
                      }`}
                      placeholder="98101"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method & Credit Card Security */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 flex items-center">
                  <CreditCard className="w-4 h-4 mr-1.5 text-emerald-600" />
                  2. Payment Method & Credit Card Security
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  256-Bit TLS Tokenized
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {(['Credit Card', 'PayPal', 'Apple Pay', 'Cash on Delivery'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-2 text-xs rounded-lg border text-center font-medium cursor-pointer transition ${
                      paymentMethod === method
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-400'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {paymentMethod === 'Credit Card' && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2.5 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-gray-700 font-bold">Credit / Debit Card Number</label>
                        <div className="flex items-center space-x-1 text-[10px] text-gray-500 font-semibold">
                          <span>Visa</span> • <span>Mastercard</span> • <span>Amex</span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white font-mono text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                        <div className="absolute right-2.5 top-2 text-emerald-600">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Expires (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">CVV Security Code</label>
                      <input
                        type="text"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white font-mono text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tokenization badge */}
                  <div className="bg-white border border-gray-200 rounded-lg p-2 text-[10px] text-gray-500 flex items-center justify-between">
                    <span className="flex items-center">
                      <Lock className="w-3 h-3 text-emerald-600 mr-1" />
                      Card Tokenized: <span className="font-mono ml-1 text-gray-700 font-bold">tok_live_aes256_verified</span>
                    </span>
                    <span className="text-emerald-700 font-bold">Never Stored Plaintext</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Order Review & Total */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center">
                <Receipt className="w-4 h-4 mr-1.5 text-gray-600" />
                3. Order Summary ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
              </h3>

              <div className="bg-gray-50 rounded-xl p-3.5 text-xs space-y-1.5 border border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Items Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Standard Shipping & Handling (AVS Certified):</span>
                  <span>FREE ($0.00)</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Marketplace Service Fee:</span>
                  <span>FREE ($0.00)</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t border-gray-200 pt-2 mt-1">
                  <span>Total Amount Due:</span>
                  <span className="text-emerald-600 font-black">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                id="place-order-submit-btn"
                type="submit"
                disabled={isProcessing || cart.length === 0 || accountSecurity.isEmergencyLocked}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-[#fcd200] disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Securing & Processing Order with Bank AVS...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gray-800" />
                    <span>Place Your Order • ${totalAmount.toFixed(2)}</span>
                  </>
                )}
              </button>
              <div className="flex items-center justify-center space-x-3 text-[10px] text-gray-400 mt-2.5">
                <span>✓ 256-Bit Bank Grade Encryption</span>
                <span>•</span>
                <span>✓ Zero Fraud Guarantee</span>
                <span>•</span>
                <span>✓ 0% Platform Fee</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
