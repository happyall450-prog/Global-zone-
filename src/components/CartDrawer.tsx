import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Plus, Minus } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    setIsCheckoutOpen,
  } = useMarketplace();

  if (!isCartOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-gray-900 border-l border-gray-200 animate-in slide-in-from-right duration-250"
      >
        {/* Drawer Header */}
        <div className="p-4 bg-[#131921] text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-base">
              Shopping Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery notice bar */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs flex items-center text-emerald-800 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
          <span>Part of your order qualifies for <strong>FREE Delivery</strong></span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-1">Your Cart is empty</h3>
              <p className="text-xs text-gray-500 mb-4">
                Explore our catalog or list your own products to sell for free!
              </p>
              <button
                id="empty-cart-shop-btn"
                onClick={() => setIsCartOpen(false)}
                className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold px-4 py-2 rounded-full text-xs shadow-sm cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-4 first:pt-0 flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-20 h-20 object-contain bg-gray-50 rounded border border-gray-200 p-1 flex-shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">
                      {item.product.title}
                    </h4>
                    <div className="text-[11px] text-emerald-700 font-medium mt-0.5">In Stock</div>
                    <div className="text-sm font-extrabold text-gray-900 mt-1">
                      ${item.product.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                    <div className="flex items-center border border-gray-300 rounded bg-gray-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 text-gray-600 rounded-l cursor-pointer"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-1 hover:bg-gray-200 text-gray-600 rounded-r cursor-pointer disabled:opacity-40"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Checkout summary */}
        {cart.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-gray-600">Subtotal ({totalItemsCount} items):</span>
              <span className="text-xl font-extrabold text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold py-3 px-4 rounded-full text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-[#fcd200]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={clearCart}
                className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Clear Cart
              </button>
              <div className="flex items-center text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
