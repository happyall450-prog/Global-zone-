import React, { useState } from 'react';
import {
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
  Plus,
  Trash2,
  Edit2,
  Check,
  Flame,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Tag,
  CreditCard,
  Building2,
  Lock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Globe,
  Link as LinkIcon,
  Copy,
  Percent
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Product } from '../types';

export const SellerHubModal: React.FC = () => {
  const {
    products,
    orders,
    sellerStats,
    liveShoppersCount,
    setIsAddProductOpen,
    deleteProduct,
    updateProduct,
    toggleFlashSale,
    triggerAutomatedStoreSale,
    trafficMode,
    setTrafficMode,
    triggerInstantSale,
    setActiveView,
    storePaymentMethods,
    activeStorePaymentMethod,
    storeWallet,
    payoutTransactions,
    setIsStorePaymentModalOpen,
    setIsWithdrawModalOpen,
    linkedMarkets,
    commissionRecords,
    storeOneLink,
    setIsStoreOneLinkModalOpen,
    setIsMarketSyncModalOpen,
    triggerMarketCommissionSale,
    currentUser,
    setIsSignInModalOpen,
  } = useMarketplace();

  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'payouts' | 'commissions'>('inventory');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(storeOneLink.storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const sellerProducts = products.filter((p) => p.isSellerProduct);

  const handleSaveStock = (id: string) => {
    const val = parseInt(newStockVal, 10);
    if (!isNaN(val) && val >= 0) {
      updateProduct(id, { stock: val });
    }
    setEditingStockId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              100% Free Seller Account Active
            </span>
            <span className="text-gray-400 text-xs">• Zero Monthly Charges • Direct Payouts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Seller Workshop & Store Earnings
          </h1>
          <p className="text-xs text-gray-600 mt-0.5">
            Manage your items, set where buyer money is deposited, and withdraw your product sales funds anytime.
          </p>

          {/* Google / Gmail Account Status Banner for Store Owner */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <div className="flex items-center space-x-1.5">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              <span className="text-gray-500 font-medium">Owner Gmail:</span>
              {currentUser ? (
                <span className="font-bold text-gray-900 flex items-center space-x-1">
                  <span className="font-mono text-blue-700">{currentUser.email}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    Verified
                  </span>
                </span>
              ) : (
                <span className="text-amber-700 font-semibold">Not signed in</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsSignInModalOpen(true)}
              className="text-blue-600 hover:text-blue-800 font-bold underline cursor-pointer text-xs"
            >
              {currentUser ? 'Switch Gmail Account' : 'Sign in with Gmail'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="seller-hub-payment-settings-btn"
            onClick={() => setIsStorePaymentModalOpen(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3.5 py-2.5 rounded-md text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Store Payment Method</span>
          </button>

          <button
            id="seller-hub-withdraw-cta"
            onClick={() => setIsWithdrawModalOpen(true)}
            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 font-bold px-3.5 py-2.5 rounded-md text-xs flex items-center space-x-1 cursor-pointer"
          >
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <span>Withdraw (${storeWallet.availableBalance.toFixed(2)})</span>
          </button>

          <button
            id="seller-add-prod-cta"
            onClick={() => setIsAddProductOpen(true)}
            className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-bold px-4 py-2.5 rounded-md text-xs shadow-sm flex items-center space-x-1.5 cursor-pointer border border-[#fcd200]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Product</span>
          </button>

          <button
            id="seller-back-to-shop-btn"
            onClick={() => setActiveView('marketplace')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2.5 rounded-md text-xs cursor-pointer"
          >
            Preview as Shopper
          </button>
        </div>
      </div>

      {/* Payout & Earnings Spotlight Card */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-gray-900 text-white rounded-lg p-4 sm:p-5 shadow-sm border border-emerald-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40 flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Direct Buyer Deposit Route Active
            </span>
            <span className="text-emerald-200/70 text-xs">Money from buying products comes here</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-black text-white">
              ${storeWallet.availableBalance.toFixed(2)}
            </span>
            <span className="text-emerald-300 text-xs font-semibold">Available for payout</span>
          </div>
          <div className="text-xs text-emerald-100/80 flex items-center space-x-2">
            <span>Primary Receiving Account:</span>
            <strong className="text-white underline decoration-emerald-400">
              {activeStorePaymentMethod?.title || 'Chase Bank Checking (••••4829)'}
            </strong>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-extrabold px-4 py-2 rounded-md text-xs shadow-sm cursor-pointer flex items-center space-x-1.5"
          >
            <DollarSign className="w-4 h-4" />
            <span>Instant Cashout to Bank</span>
          </button>
          <button
            onClick={() => setIsStorePaymentModalOpen(true)}
            className="bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-600/50 font-semibold px-3 py-2 rounded-md text-xs cursor-pointer flex items-center space-x-1"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Change Payout Account</span>
          </button>
        </div>
      </div>

      {/* Universal Store One-Link & Big Markets 3% Commission Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-xl p-5 border-2 border-amber-300 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500 text-gray-950 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center">
              <Percent className="w-3.5 h-3.5 mr-1" /> 3% Commission System
            </span>
            <span className="text-gray-600 text-xs font-semibold">
              Linked Big Markets: <strong>Alibaba, Amazon, Shopify</strong>
            </span>
          </div>

          <div className="text-gray-900 font-extrabold text-sm sm:text-base">
            Your Store Universal One-Link is Active:
          </div>

          <div className="flex items-center bg-white border border-amber-300 rounded-lg p-1.5 max-w-xl shadow-2xs">
            <div className="text-gray-400 pl-2 pr-1 select-none font-mono text-xs">
              <LinkIcon className="w-3.5 h-3.5 text-amber-500 inline mr-1" />
            </div>
            <span className="text-xs font-mono font-bold text-gray-800 truncate flex-1">
              {storeOneLink.storeUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="bg-amber-400 hover:bg-amber-500 text-gray-950 px-3 py-1 rounded text-xs font-bold transition flex items-center space-x-1 cursor-pointer ml-2"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Install this link into any app/website or share anywhere. Whenever someone buys an item from Amazon, Alibaba, or Shopify, <strong>3% commission</strong> goes to your store balance automatically!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <div className="bg-white p-3 rounded-lg border border-amber-200 text-center flex-1 sm:flex-initial min-w-[150px]">
            <div className="text-[11px] text-gray-500 font-medium">3% Commission Earned</div>
            <div className="text-xl font-black text-emerald-700">
              ${storeWallet.totalCommissionEarned?.toFixed(2) || '442.25'}
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold">
              {commissionRecords.length} automated sales
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsStoreOneLinkModalOpen(true)}
              className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold px-4 py-2 rounded-lg text-xs shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Install & Share One-Link</span>
            </button>

            <button
              onClick={() => setIsMarketSyncModalOpen(true)}
              className="bg-[#131921] hover:bg-[#232f3e] text-white font-bold px-4 py-2 rounded-lg text-xs shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Big Markets Hub (3%)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Total Sales Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
            ${sellerStats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center">
            <ArrowUpRight className="w-3 h-3 mr-0.5" />
            100% credited to your store
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Orders Placed</span>
            <ShoppingBag className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {sellerStats.totalOrders}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            From buyers shopping
          </div>
        </div>

        {/* Units Sold */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Units Sold</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {sellerStats.totalUnitsSold}
          </div>
          <div className="text-[11px] text-indigo-600 font-medium mt-1">
            Items dispatched
          </div>
        </div>

        {/* Live Shoppers */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>Live Shoppers</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-600">
            {liveShoppersCount}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            Browsing right now
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-gray-500 text-xs mb-1">
            <span>My Active Items</span>
            <Package className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
            {sellerProducts.length}
          </div>
          <div className="text-[11px] text-purple-600 font-medium mt-1">
            Listed for free ($0/mo)
          </div>
        </div>
      </div>

      {/* Automated Sales & Traffic Machine Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-100/30 to-emerald-500/10 rounded-lg p-5 border border-amber-300 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base flex items-center">
              <Flame className="w-5 h-5 text-amber-600 mr-1.5 fill-amber-600" />
              Automated Sales & Buyer Traffic Machine
            </h3>
            <p className="text-xs text-gray-600">
              One-click flash sales trigger countdown timers and automated price discounts, prompting people to flood in and buy!
            </p>
          </div>

          <button
            id="seller-hub-simulate-instant"
            onClick={triggerInstantSale}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded text-xs shadow-sm flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>Simulate Sale Now!</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-200">
          <span className="text-xs font-bold text-gray-800">Launch Automatic Store Discount:</span>
          <button
            id="auto-sale-15-btn"
            onClick={() => triggerAutomatedStoreSale(15)}
            className="bg-white hover:bg-amber-100 text-gray-900 border border-gray-300 font-bold px-3 py-1 rounded text-xs cursor-pointer shadow-2xs"
          >
            ⚡ 15% OFF All Items
          </button>
          <button
            id="auto-sale-30-btn"
            onClick={() => triggerAutomatedStoreSale(30)}
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-extrabold px-3 py-1 rounded text-xs cursor-pointer shadow-2xs"
          >
            🔥 30% OFF Flash Deal
          </button>
          <button
            id="auto-sale-50-btn"
            onClick={() => triggerAutomatedStoreSale(50)}
            className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-3 py-1 rounded text-xs cursor-pointer shadow-2xs animate-pulse"
          >
            🚨 50% Mega Blowout
          </button>

          <div className="ml-auto flex items-center space-x-2 text-xs">
            <span className="text-gray-600">Shopper Traffic:</span>
            <select
              value={trafficMode}
              onChange={(e) => setTrafficMode(e.target.value as any)}
              className="bg-white border border-gray-300 rounded px-2 py-1 text-xs font-bold cursor-pointer"
            >
              <option value="normal">Steady Traffic</option>
              <option value="rush">Rush Hour (High Demand)</option>
              <option value="frenzy">Cyber Frenzy (Too Many Coming!)</option>
              <option value="off">Paused</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center space-x-2 border-b border-gray-200 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-2.5 px-3 border-b-2 cursor-pointer transition ${
            activeTab === 'inventory'
              ? 'border-amber-500 text-gray-900 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          My Inventory ({sellerProducts.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center ${
            activeTab === 'orders'
              ? 'border-amber-500 text-gray-900 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <span>Incoming Customer Orders</span>
          <span className="ml-1.5 bg-gray-200 text-gray-800 rounded-full px-1.5 py-0.2 text-xs">
            {orders.length}
          </span>
        </button>

        <button
          id="seller-hub-payouts-tab-btn"
          onClick={() => setActiveTab('payouts')}
          className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 ${
            activeTab === 'payouts'
              ? 'border-emerald-600 text-emerald-900 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <CreditCard className="w-4 h-4 text-emerald-700" />
          <span>Receiving Accounts & Payouts</span>
          <span className="ml-1 bg-emerald-100 text-emerald-800 rounded-full px-1.5 py-0.2 text-xs font-bold">
            ${storeWallet.availableBalance.toFixed(2)}
          </span>
        </button>

        <button
          id="seller-hub-commissions-tab-btn"
          onClick={() => setActiveTab('commissions')}
          className={`pb-2.5 px-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 ${
            activeTab === 'commissions'
              ? 'border-amber-500 text-amber-900 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Percent className="w-4 h-4 text-amber-600" />
          <span>Big Market 3% Commissions</span>
          <span className="ml-1 bg-amber-100 text-amber-800 rounded-full px-1.5 py-0.2 text-xs font-bold">
            ${storeWallet.totalCommissionEarned?.toFixed(2) || '442.25'}
          </span>
        </button>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
          {sellerProducts.length === 0 ? (
            <div className="text-center py-12 px-4">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-800">No products in your workshop yet</h3>
              <p className="text-xs text-gray-500 mb-4">
                List your first product for free without paying any monthly charges.
              </p>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold px-4 py-2 rounded-full text-xs shadow-sm cursor-pointer"
              >
                + Add Your First Product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-[11px] border-b border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Inventory Stock</th>
                    <th className="py-3 px-4">Flash Deal</th>
                    <th className="py-3 px-4">Units Sold</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sellerProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition">
                      {/* Product Thumbnail & Title */}
                      <td className="py-3 px-4 flex items-center space-x-3">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-12 h-12 object-contain bg-gray-50 rounded border border-gray-200 p-1 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="max-w-xs">
                          <div className="font-bold text-gray-900 line-clamp-1">{p.title}</div>
                          <div className="text-[11px] text-gray-500">ID: {p.id}</div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-gray-700">{p.category}</td>

                      {/* Price */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-gray-900">${p.price.toFixed(2)}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-[11px] text-gray-400 line-through ml-1.5">
                            ${p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Stock Inventory */}
                      <td className="py-3 px-4">
                        {editingStockId === p.id ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              min="0"
                              value={newStockVal}
                              onChange={(e) => setNewStockVal(e.target.value)}
                              className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-xs"
                            />
                            <button
                              onClick={() => handleSaveStock(p.id)}
                              className="p-1 bg-emerald-600 text-white rounded cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5">
                            <span
                              className={`font-semibold ${
                                p.stock <= 5 ? 'text-red-600 font-bold' : 'text-gray-800'
                              }`}
                            >
                              {p.stock} units
                            </span>
                            <button
                              onClick={() => {
                                setEditingStockId(p.id);
                                setNewStockVal(p.stock.toString());
                              }}
                              className="text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
                              title="Edit Stock"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Flash Deal Toggle */}
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleFlashSale(p.id, 30)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition flex items-center ${
                            p.isFlashDeal
                              ? 'bg-red-100 text-red-700 border border-red-300'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <Zap className="w-3 h-3 mr-1" />
                          {p.isFlashDeal ? `${p.flashDealDiscount}% OFF Active` : 'Turn ON'}
                        </button>
                      </td>

                      {/* Sales Count */}
                      <td className="py-3 px-4 font-bold text-gray-800">
                        {p.salesCount || 0} sold
                      </td>

                      {/* Delete */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Incoming Orders Stream */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-sm">
              Live Incoming Orders Log ({orders.length} orders)
            </h3>
            <span className="text-xs text-gray-500">
              Updates in real-time as buyers purchase products
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 px-4 text-gray-500 text-xs">
              No orders placed yet. Click <strong>"Simulate Sale Now"</strong> above to see incoming buyer orders!
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {orders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-gray-900">{order.id}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {order.status}
                      </span>
                      {order.isSimulatedSale && (
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-medium px-1.5 py-0.2 rounded">
                          Simulated Buyer
                        </span>
                      )}
                    </div>
                    <div className="text-gray-700">
                      <strong>{order.customerName}</strong> ({order.customerEmail}) • {order.city}
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      Ordered:{' '}
                      {order.items.map((i, idx) => (
                        <span key={idx} className="font-medium text-gray-800">
                          {i.quantity}x {i.product.title}{idx < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>

                    <div className="text-emerald-700 text-[11px] font-medium flex items-center pt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 flex-shrink-0" />
                      <span>
                        Money routed to: <strong>{order.storeRecipientMethod || activeStorePaymentMethod?.title || 'Chase Bank Checking'}</strong> (100% credited)
                      </span>
                    </div>
                  </div>

                  <div className="text-right sm:flex-shrink-0">
                    <div className="text-base font-extrabold text-emerald-700">
                      +${order.totalAmount.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      Paid via {order.paymentMethod} • {order.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Receiving Accounts & Payouts */}
      {activeTab === 'payouts' && (
        <div className="space-y-5">
          {/* How money flows banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/70 border border-emerald-200 rounded-lg p-4 sm:p-5 shadow-xs">
            <h3 className="text-sm sm:text-base font-extrabold text-emerald-950 flex items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-700 mr-2" />
              How Product Sales Money Comes to Your Store (0% Platform Cut)
            </h3>
            <p className="text-xs text-emerald-800 mt-1">
              Every time a customer buys a product in your online workshop, 100% of the funds are deposited directly into your store receiving account.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
              <div className="bg-white/90 rounded-lg p-3 border border-emerald-200 shadow-2xs">
                <div className="text-emerald-800 font-bold flex items-center space-x-1.5 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-black">1</span>
                  <span>Shopper Purchases</span>
                </div>
                <p className="text-gray-600 text-[11px]">
                  Customer checks out with Credit Card, PayPal, or Apple Pay.
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-3 border border-emerald-200 shadow-2xs">
                <div className="text-emerald-800 font-bold flex items-center space-x-1.5 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-black">2</span>
                  <span>Instant Credit ($0 Fee)</span>
                </div>
                <p className="text-gray-600 text-[11px]">
                  Full sale value immediately lands in your Store Payout Wallet.
                </p>
              </div>

              <div className="bg-white/90 rounded-lg p-3 border border-emerald-200 shadow-2xs">
                <div className="text-emerald-800 font-bold flex items-center space-x-1.5 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] flex items-center justify-center font-black">3</span>
                  <span>Withdraw Anytime</span>
                </div>
                <p className="text-gray-600 text-[11px]">
                  Instant wire or standard ACH to your Bank, PayPal, or Debit Card.
                </p>
              </div>
            </div>
          </div>

          {/* Accounts & Wallet Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left 2 Cols: Connected Receiving Accounts */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    Store Receiving Payment Accounts ({storePaymentMethods.length})
                  </h4>
                  <p className="text-gray-500 text-[11px]">
                    Sales funds are wired to your selected default account.
                  </p>
                </div>

                <button
                  onClick={() => setIsStorePaymentModalOpen(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded text-xs flex items-center space-x-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Method</span>
                </button>
              </div>

              <div className="p-4 divide-y divide-gray-100 space-y-3">
                {storePaymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      method.isPrimary ? 'bg-emerald-50/50 p-3 rounded-lg border border-emerald-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          method.isPrimary ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {method.type === 'bank' ? (
                          <Building2 className="w-4 h-4" />
                        ) : method.type === 'paypal' ? (
                          <DollarSign className="w-4 h-4" />
                        ) : (
                          <CreditCard className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-gray-900 text-xs sm:text-sm">
                            {method.title}
                          </span>
                          {method.isPrimary && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                              <Check className="w-3 h-3 mr-0.5 stroke-[3]" />
                              Default Receiving Account
                            </span>
                          )}
                        </div>
                        <div className="text-gray-600 text-xs mt-0.5">{method.accountDetails}</div>
                        <div className="text-gray-400 text-[11px] mt-0.5">
                          Holder: <strong className="text-gray-700">{method.accountHolder}</strong> •{' '}
                          <span className="text-emerald-700 font-semibold">{method.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-center">
                      <button
                        onClick={() => setIsStorePaymentModalOpen(true)}
                        className="text-emerald-700 hover:text-emerald-800 font-bold text-xs bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1 Col: Quick Cashout Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Store Wallet Balance
                </span>
                <div className="text-3xl font-black text-gray-900 mt-1">
                  ${storeWallet.availableBalance.toFixed(2)}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Ready to transfer immediately to your bank with zero deductions.
                </p>

                <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Lifetime Withdrawn:</span>
                    <strong className="text-gray-900">${storeWallet.totalWithdrawn.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Transfer Fee:</span>
                    <strong className="text-emerald-600">$0.00 (Free)</strong>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Transfer Time:</span>
                    <strong className="text-gray-900">Instant (1-2 mins)</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setIsWithdrawModalOpen(true)}
                  disabled={storeWallet.availableBalance <= 0}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-extrabold py-2.5 px-4 rounded-full text-xs shadow-sm cursor-pointer border border-[#fcd200] disabled:opacity-50 flex items-center justify-center space-x-1.5"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Withdraw to Bank Now</span>
                </button>

                <button
                  onClick={() => setIsStorePaymentModalOpen(true)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-full text-xs cursor-pointer text-center"
                >
                  Edit Receiving Accounts
                </button>
              </div>
            </div>
          </div>

          {/* Payout History Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-sm">
                Withdrawal & Payout History
              </h4>
              <span className="text-xs text-gray-500">
                Direct deposits sent to your receiving methods
              </span>
            </div>

            <div className="divide-y divide-gray-200 text-xs">
              {payoutTransactions.map((tx, idx) => (
                <div key={`${tx.id || 'tx'}-${idx}`} className="p-3.5 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        ${tx.amount.toFixed(2)} USD
                      </div>
                      <div className="text-gray-500 text-[11px]">
                        Sent to: <strong>{tx.destinationMethodTitle}</strong>
                      </div>
                      <div className="text-gray-400 font-mono text-[10px]">
                        Ref: {tx.referenceId}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                      {tx.status}
                    </span>
                    <div className="text-gray-400 text-[11px] mt-1">{tx.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Big Market 3% Commissions Ledger */}
      {activeTab === 'commissions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 shadow-xs p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-100 text-amber-900 font-black text-xs px-2.5 py-0.5 rounded-full flex items-center">
                  <Percent className="w-3.5 h-3.5 mr-1" /> 3% Direct Store Earnings
                </span>
                <span className="text-gray-500 text-xs">Linked to Alibaba, Amazon, Shopify</span>
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mt-1">
                Affiliate Commission Balance: ${storeWallet.totalCommissionEarned?.toFixed(2) || '442.25'}
              </h3>
              <p className="text-xs text-gray-600">
                Whenever any buyer orders products via your store one-link, 3% commission is automatically added to your store balance with 0 deductions.
              </p>
            </div>

            <div className="flex items-center space-x-2 self-start md:self-auto">
              <button
                onClick={() => triggerMarketCommissionSale()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-md shadow-xs flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate 3% Sale</span>
              </button>

              <button
                onClick={() => setIsMarketSyncModalOpen(true)}
                className="bg-[#131921] hover:bg-[#232f3e] text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-xs flex items-center space-x-1 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Manage Linked Markets</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h4 className="font-bold text-xs text-gray-800 uppercase tracking-wider">
                Automated Commission Transactions ({commissionRecords.length})
              </h4>
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="text-emerald-700 hover:text-emerald-800 font-bold text-xs underline cursor-pointer"
              >
                Withdraw to Bank (${storeWallet.availableBalance.toFixed(2)}) →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Market</th>
                    <th className="py-2.5 px-3">Product</th>
                    <th className="py-2.5 px-3">Buyer & Location</th>
                    <th className="py-2.5 px-3">Sale Total</th>
                    <th className="py-2.5 px-3 text-right">3% Commission Credited</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {commissionRecords.map((rec, idx) => (
                    <tr key={`${rec.id || 'rec'}-${idx}`} className="hover:bg-amber-50/40 transition">
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-gray-900">{rec.orderId}</div>
                        <div className="text-[11px] text-gray-400">{rec.timestamp}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded text-white ${
                            rec.platform === 'Amazon'
                              ? 'bg-amber-600'
                              : rec.platform === 'Alibaba'
                              ? 'bg-orange-600'
                              : rec.platform === 'Shopify'
                              ? 'bg-emerald-600'
                              : 'bg-gray-700'
                          }`}
                        >
                          {rec.platform}
                        </span>
                      </td>

                      <td className="py-3 px-3 max-w-[220px]">
                        <div className="flex items-center space-x-2">
                          <img
                            src={rec.productImage}
                            alt={rec.productTitle}
                            className="w-8 h-8 object-contain rounded bg-gray-50 border border-gray-200 p-0.5 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-semibold text-gray-900 truncate" title={rec.productTitle}>
                            {rec.productTitle}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-medium text-gray-900">{rec.buyerName}</div>
                        <div className="text-[11px] text-gray-400">{rec.buyerLocation}</div>
                      </td>

                      <td className="py-3 px-3 font-semibold text-gray-700">
                        ${rec.saleAmount.toFixed(2)}
                      </td>

                      <td className="py-3 px-3 text-right">
                        <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-1 rounded text-xs">
                          +${rec.commissionEarned.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
