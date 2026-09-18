import React from 'react';
import { Package, Truck, CheckCircle2, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const OrdersView: React.FC = () => {
  const { orders, setActiveView, currentUser, setIsSignInModalOpen } = useMarketplace();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Your Orders & Deliveries</h1>
          <p className="text-xs text-gray-600 mt-1">
            Track customer purchases, delivery milestones, and simulated buyer transactions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSignInModalOpen(true)}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold px-3 py-2 rounded-full text-xs shadow-xs cursor-pointer flex items-center space-x-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            <span>{currentUser ? currentUser.email : 'Sign in with Gmail'}</span>
          </button>

          <button
            onClick={() => setActiveView('marketplace')}
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-4 py-2 rounded-full text-xs shadow-sm cursor-pointer self-start sm:self-auto"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-xs">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-800 mb-1">No orders found</h3>
          <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
            You haven't placed any orders yet, or no automated sales have occurred. Explore our catalog or trigger a sale!
          </p>
          <button
            onClick={() => setActiveView('marketplace')}
            className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold px-5 py-2 rounded-full text-xs cursor-pointer border border-[#fcd200]"
          >
            Start Browsing Products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-xs flex flex-wrap items-center justify-between gap-2 text-gray-600">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Order Placed</div>
                    <div className="font-semibold text-gray-900">{order.createdAt}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Total</div>
                    <div className="font-bold text-gray-900">${order.totalAmount.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500">Ship To</div>
                    <div className="font-semibold text-gray-900">{order.customerName}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-mono text-gray-500">ORDER #{order.id}</span>
                  {order.storeRecipientMethod && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ✓ Credited to Store
                    </span>
                  )}
                </div>
              </div>

              {/* Order Status & Items */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center space-x-2 text-sm font-bold text-emerald-700 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Arriving Tomorrow by 10 PM • Free Delivery</span>
                </div>

                <div className="space-y-4 divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="pt-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 object-contain bg-gray-50 rounded border border-gray-200 p-1 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{item.product.title}</h4>
                          <div className="text-gray-500 text-[11px] mt-0.5">
                            Qty: {item.quantity} • ${item.product.price.toFixed(2)} each
                          </div>
                          <div className="text-[11px] text-gray-400 mt-0.5">
                            Return window open until 30 days from delivery
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-extrabold text-sm text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
