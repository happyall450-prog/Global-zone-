import React from 'react';
import { ShoppingBag, X, Zap, Sparkles } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const LiveSalesToast: React.FC = () => {
  const { activeToast, dismissToast, setSelectedProductForDetail, products } = useMarketplace();

  if (!activeToast) return null;

  const handleClick = () => {
    const product = products.find((p) => p.title === activeToast.productTitle);
    if (product) {
      setSelectedProductForDetail(product);
    }
    dismissToast();
  };

  return (
    <aside
      aria-label="Live Purchase Alert"
      className="fixed bottom-4 left-4 z-50 max-w-sm bg-white rounded-lg shadow-xl border border-gray-300 p-3 flex items-center space-x-3 text-gray-900 animate-in slide-in-from-bottom-5 duration-300 hover:shadow-2xl transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        <img
          src={activeToast.productImage}
          alt={activeToast.productTitle}
          className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-200 p-0.5"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow">
          <ShoppingBag className="w-3 h-3" />
        </div>
      </div>

      <div className="flex-1 min-w-0 text-xs">
        <div className="flex items-center space-x-1 font-bold text-[11px]">
          {activeToast.commissionEarned ? (
            <div className="flex items-center space-x-1 text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>3% Commission Earned!</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-emerald-700">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>New Customer Purchase!</span>
            </div>
          )}
        </div>
        <p className="text-gray-800 font-medium truncate mt-0.5">
          <strong className="text-gray-900">{activeToast.buyerName}</strong> ({activeToast.city})
        </p>
        <p className="text-gray-500 truncate text-[11px]">
          Bought {activeToast.quantity}x {activeToast.productTitle}
        </p>
        <div className="flex items-center space-x-2 text-[10px] text-gray-500 mt-0.5">
          {activeToast.commissionEarned ? (
            <span className="text-emerald-700 font-black">
              +${activeToast.commissionEarned.toFixed(2)} (3% from {activeToast.marketPlatform || 'Affiliate'})
            </span>
          ) : (
            <span className="text-emerald-700 font-extrabold">+${activeToast.amount.toFixed(2)} to Store Wallet</span>
          )}
          <span>•</span>
          <span>{activeToast.timestamp}</span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dismissToast();
        }}
        className="text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer flex-shrink-0"
        title="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
};
