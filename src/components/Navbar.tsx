import React from 'react';
import {
  Search,
  ShoppingCart,
  Store,
  MapPin,
  ShieldCheck,
  Zap,
  TrendingUp,
  X,
  Sparkles,
  PackageCheck,
  CreditCard,
  DollarSign,
  Link as LinkIcon,
  Globe,
  Percent,
  Palette,
  KeyRound,
  Wrench,
  Smartphone,
  ShieldAlert,
  Download
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCategory } from '../types';
import { StoreLogo } from './StoreLogo';

export const Navbar: React.FC = () => {
  const {
    cart,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    activeView,
    setActiveView,
    setIsAddProductOpen,
    setIsFreeGuaranteeOpen,
    liveShoppersCount,
    trafficMode,
    orders,
    storeWallet,
    setIsStorePaymentModalOpen,
    setIsStoreOneLinkModalOpen,
    setIsMarketSyncModalOpen,
    storeOneLink,
    setIsStoreLogoStudioOpen,
    setIsAccountSecurityOpen,
    setIsErrorSolverOpen,
    setIsAppStorePublishOpen,
    setIsDownloadAppOpen,
    accountSecurity,
    currentUser,
    setIsSignInModalOpen,
    storeBranding,
    executeDirectSearch,
    isAiAgentsModalOpen,
    setIsAiAgentsModalOpen,
    aiAgentsState,
  } = useMarketplace();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories: ProductCategory[] = [
    'All',
    'Electronics',
    'Fashion & Apparel',
    'Home & Kitchen',
    'Gadgets & Accessories',
    'Health & Beauty',
    'Sports & Outdoors',
    'My Custom Products',
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#131921] text-white shadow-md">
      {/* Top micro-bar: Free seller guarantee, Branding, Security PIN, Error Solver, App Stores */}
      <div className="bg-[#232f3e] px-3 sm:px-4 py-1.5 text-xs text-gray-300 flex items-center justify-between border-b border-gray-800 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-2.5 sm:space-x-3 whitespace-nowrap">
          {/* Logo Studio button */}
          <button
            id="nav-logo-studio-top-btn"
            onClick={() => setIsStoreLogoStudioOpen(true)}
            className="text-amber-400 hover:text-amber-300 font-bold flex items-center space-x-1 cursor-pointer"
            title="Design and customize your store logo"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Store Logo Studio</span>
            <span className="bg-amber-400 text-gray-950 text-[9px] font-black px-1 rounded-sm">
              NEW
            </span>
          </button>
          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* Account Security & PIN button */}
          <button
            id="nav-security-top-btn"
            onClick={() => setIsAccountSecurityOpen(true)}
            className={`font-semibold flex items-center space-x-1 cursor-pointer ${
              accountSecurity.isEmergencyLocked
                ? 'text-red-400 animate-pulse font-black'
                : 'text-emerald-400 hover:text-emerald-300'
            }`}
            title="Account Security Code & 2FA PIN Settings"
          >
            {accountSecurity.isEmergencyLocked ? (
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>
              {accountSecurity.isEmergencyLocked ? 'LOCKED • Security Code' : 'Security PIN Active'}
            </span>
          </button>
          <span className="text-gray-600 hidden md:inline">|</span>

          {/* Error Solver Diagnostic button */}
          <button
            id="nav-error-solver-top-btn"
            onClick={() => setIsErrorSolverOpen(true)}
            className="text-blue-300 hover:text-blue-200 font-medium flex items-center space-x-1 cursor-pointer hidden sm:flex"
            title="Diagnose & auto-solve any application or payment error"
          >
            <Wrench className="w-3.5 h-3.5 text-blue-400" />
            <span>Error Solver</span>
            <span className="text-emerald-400 font-bold text-[10px]">(0 Errors)</span>
          </button>
          <span className="text-gray-600 hidden lg:inline">|</span>

          {/* Download App Quick Button */}
          <button
            id="nav-download-app-top-btn"
            onClick={() => setIsDownloadAppOpen(true)}
            className="text-amber-400 hover:text-amber-300 font-black flex items-center space-x-1 cursor-pointer bg-amber-400/15 px-2 py-0.5 rounded border border-amber-400/40"
            title="Download Global Zone Global App for Android, iOS & Desktop"
          >
            <Download className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Download App</span>
          </button>
          <span className="text-gray-600 hidden md:inline">|</span>

          {/* Publish to GitHub & All App Stores */}
          <button
            id="nav-publish-stores-top-btn"
            onClick={() => setIsAppStorePublishOpen(true)}
            className="text-purple-300 hover:text-purple-200 font-medium flex items-center space-x-1 cursor-pointer hidden lg:flex"
            title="Publish to GitHub, All Websites, Google Play & Apple App Store"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400" />
            <span>Publish All (GitHub / Stores)</span>
          </button>
          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* Big Markets 3% Commission highlight */}
          <button
            id="nav-big-market-top-btn"
            onClick={() => setIsMarketSyncModalOpen(true)}
            className="text-amber-300 hover:text-amber-200 font-bold flex items-center space-x-1 cursor-pointer"
            title="Alibaba, Amazon, Shopify 3% commission system"
          >
            <Percent className="w-3 h-3 text-amber-400" />
            <span className="hidden xl:inline">Alibaba • Amazon • Shopify: Earn 3%</span>
            <span className="xl:hidden">Big Markets 3%</span>
          </button>
          <span className="text-gray-600 hidden sm:inline">|</span>

          {/* AI Autonomous Agents Top Button */}
          <button
            id="nav-ai-agents-top-btn"
            onClick={() => setIsAiAgentsModalOpen(true)}
            className="text-cyan-300 hover:text-cyan-200 font-bold flex items-center space-x-1 cursor-pointer bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-500/40"
            title="AI Agents: Auto Sourcing, Faast Sales & 3% Commission"
          >
            <Sparkles className="w-3 h-3 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI Agents</span>
            <span className="text-emerald-400 font-black text-[9px] bg-emerald-950/70 px-1 rounded">
              {aiAgentsState.isAutoPilotActive ? 'ACTIVE' : 'PAUSED'}
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4 pl-3 whitespace-nowrap">
          {/* Gmail Sign In status in top micro-bar */}
          <button
            id="nav-top-gmail-btn"
            onClick={() => setIsSignInModalOpen(true)}
            className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 transition cursor-pointer text-white font-medium"
            title="Google / Gmail Authentication"
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                  className="w-3.5 h-3.5 rounded-full object-cover ring-1 ring-emerald-400"
                  referrerPolicy="no-referrer"
                />
                <span className="text-emerald-300 font-bold truncate max-w-[130px]">{currentUser.email}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                <span>Login with Gmail</span>
              </>
            )}
          </button>
          <span className="text-gray-600 hidden sm:inline">|</span>

          <div className="flex items-center space-x-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${trafficMode === 'off' ? 'bg-gray-400' : 'bg-emerald-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${trafficMode === 'off' ? 'bg-gray-400' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="text-gray-300">
              <strong className="text-white">{liveShoppersCount}</strong> shoppers live
            </span>
          </div>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center text-gray-300 text-xs">
            <span>Currency: </span>
            <strong className="ml-1 text-amber-400">USD ($)</strong>
          </div>
        </div>
      </div>

      {/* Main Amazon-style bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 md:gap-4">
        {/* Brand Logo with StoreLogo component */}
        <div
          id="nav-logo"
          onClick={() => setIsStoreLogoStudioOpen(true)}
          className="flex items-center cursor-pointer group flex-shrink-0"
          title="Click to customize Store Logo & Brand"
        >
          <StoreLogo size="md" />
        </div>

        {/* Deliver to address pill */}
        <div
          onClick={() => setActiveView('marketplace')}
          className="hidden lg:flex items-center p-1.5 rounded-sm hover:ring-1 hover:ring-white cursor-pointer text-xs"
        >
          <MapPin className="w-4 h-4 text-amber-400 mr-1 flex-shrink-0" />
          <div className="leading-tight">
            <div className="text-gray-400 text-[11px]">Deliver to</div>
            <div className="font-bold text-white text-xs">Worldwide (Free)</div>
          </div>
        </div>

        {/* Amazon-style Search Bar with category picker */}
        <div className="flex-1 max-w-2xl min-w-[180px]">
          <div className="flex rounded-md overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-amber-500">
            {/* Category select */}
            <select
              id="nav-category-select"
              value={selectedCategory}
              onChange={(e) => {
                const newCat = e.target.value as ProductCategory;
                executeDirectSearch(undefined, newCat);
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2 sm:px-3 py-2 border-r border-gray-300 focus:outline-none cursor-pointer max-w-[110px] sm:max-w-[140px] truncate font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <input
                id="nav-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeDirectSearch(searchQuery, selectedCategory);
                  }
                }}
                placeholder="Search products or any category direct coming..."
                className="w-full px-3 py-2 text-sm text-gray-900 focus:outline-none placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  id="nav-clear-search-btn"
                  onClick={() => {
                    setSearchQuery('');
                    executeDirectSearch('', selectedCategory);
                  }}
                  className="p-1 mr-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Button */}
            <button
              id="nav-search-submit-btn"
              onClick={() => executeDirectSearch(searchQuery, selectedCategory)}
              className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-4 py-2 flex items-center justify-center transition-colors cursor-pointer"
              title="Search products direct coming"
            >
              <Search className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* Right side navigation buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          {/* AI Agents Hub Button */}
          <button
            id="nav-ai-agents-main-btn"
            onClick={() => setIsAiAgentsModalOpen(true)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 text-white px-2.5 sm:px-3 py-1.5 rounded text-xs font-black shadow-md border border-cyan-400/40 transition cursor-pointer"
            title="Open AI Agents Hub: Auto Products, Fast Sales, 3% Commission & 100% Happy Sellers"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">AI Agents</span>
            <span className="sm:hidden">AI</span>
            <span className="bg-cyan-400 text-gray-950 text-[9px] font-black px-1 rounded-sm">
              3%
            </span>
          </button>

          {/* Download App Button - Prominent for users */}
          <button
            id="nav-download-app-main-btn"
            onClick={() => setIsDownloadAppOpen(true)}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-950 px-3 py-1.5 rounded text-xs font-black shadow-md transition cursor-pointer"
            title="Download Global Zone Global App on Android, iOS & Desktop"
          >
            <Download className="w-4 h-4 text-gray-950" />
            <span className="hidden sm:inline">Download App</span>
            <span className="sm:hidden">App</span>
          </button>

          {/* Store One-Link Button */}
          <button
            id="nav-store-onelink-btn"
            onClick={() => setIsStoreOneLinkModalOpen(true)}
            className="hidden xl:flex items-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-2.5 py-1.5 rounded text-xs font-bold shadow transition cursor-pointer"
            title="Get your store universal one-link and embed code"
          >
            <LinkIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Store One-Link</span>
          </button>

          {/* Big Markets 3% Commission Hub Button */}
          <button
            id="nav-big-markets-btn"
            onClick={() => setIsMarketSyncModalOpen(true)}
            className="hidden md:flex items-center space-x-1.5 bg-gray-800 hover:bg-gray-700 text-amber-300 border border-amber-400/40 px-2.5 py-1.5 rounded text-xs font-bold shadow transition cursor-pointer"
            title="Amazon, Alibaba, Shopify 3% commission hub"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Big Markets (3%)</span>
          </button>

          {/* Sell Button - Highlighted for the user */}
          <button
            id="nav-sell-product-btn"
            onClick={() => setIsAddProductOpen(true)}
            className="hidden sm:flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow transition cursor-pointer"
            title="Add your product to sell on Global Zone Global"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>+ Sell My Product</span>
            <span className="bg-emerald-800 text-[10px] px-1 py-0.2 rounded font-semibold text-emerald-200">
              PRO
            </span>
          </button>

          {/* Store Wallet Payout Quick Button */}
          <button
            id="nav-payout-wallet-btn"
            onClick={() => setIsStorePaymentModalOpen(true)}
            className="hidden lg:block p-1.5 rounded-sm hover:ring-1 hover:ring-white cursor-pointer text-left"
            title="Configure receiving payment method and view incoming sales money"
          >
            <div className="text-[11px] text-gray-400 flex items-center">
              <CreditCard className="w-3 h-3 mr-1 text-emerald-400" />
              Store Payout
            </div>
            <div className="font-bold text-xs text-emerald-400 flex items-center">
              <span>${storeWallet.availableBalance.toFixed(2)}</span>
              <span className="ml-1 text-[10px] text-amber-300 font-semibold">(+3% Com.)</span>
            </div>
          </button>

          {/* Seller Workshop / Hub Toggle */}
          <button
            id="nav-seller-hub-toggle"
            onClick={() => setActiveView(activeView === 'seller-hub' ? 'marketplace' : 'seller-hub')}
            className={`p-1.5 rounded-sm hover:ring-1 hover:ring-white cursor-pointer text-left ${
              activeView === 'seller-hub' ? 'bg-[#232f3e] ring-1 ring-amber-400' : ''
            }`}
          >
            <div className="text-[11px] text-gray-400 flex items-center">
              <Store className="w-3 h-3 mr-1 text-amber-400" />
              Seller Workshop
            </div>
            <div className="font-bold text-xs text-white flex items-center">
              <span>My Sales & Hub</span>
              <span className="ml-1 text-amber-400 text-[10px] font-bold">PRO</span>
            </div>
          </button>

          {/* Google / Gmail Account Sign In & Profile Button */}
          <button
            id="nav-gmail-account-btn"
            onClick={() => setIsSignInModalOpen(true)}
            className="p-1.5 rounded-sm hover:ring-1 hover:ring-white cursor-pointer text-left flex items-center space-x-2"
            title={currentUser ? `Signed in with Gmail as ${currentUser.email}` : "Sign in and login with Gmail"}
          >
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1.5 ring-emerald-400"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-gray-900"></span>
                </div>
                <div className="hidden lg:block leading-tight">
                  <div className="text-[10px] text-gray-400 flex items-center">
                    <span>Hello, {currentUser.givenName}</span>
                  </div>
                  <div className="font-bold text-xs text-white flex items-center truncate max-w-[110px]">
                    <span>Gmail Account</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded text-xs font-bold border border-white/20">
                <svg className="w-3.5 h-3.5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                <span className="hidden sm:inline">Sign in Gmail</span>
                <span className="sm:hidden">Login</span>
              </div>
            )}
          </button>

          {/* Orders link */}
          <button
            id="nav-orders-btn"
            onClick={() => setActiveView('orders')}
            className={`hidden md:block p-1.5 rounded-sm hover:ring-1 hover:ring-white cursor-pointer text-left ${
              activeView === 'orders' ? 'bg-[#232f3e] ring-1 ring-amber-400' : ''
            }`}
          >
            <div className="text-[11px] text-gray-400">Returns</div>
            <div className="font-bold text-xs text-white flex items-center">
              <span>& Orders</span>
              {orders.length > 0 && (
                <span className="ml-1 px-1 bg-amber-400 text-gray-900 rounded-full text-[10px]">
                  {orders.length}
                </span>
              )}
            </div>
          </button>

          {/* Shopping Cart */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="flex items-center p-1.5 rounded-sm hover:ring-1 hover:ring-white cursor-pointer text-white relative"
          >
            <div className="relative">
              <ShoppingCart className="w-7 h-7 text-white" />
              <span
                id="cart-badge-count"
                className="absolute -top-1.5 -right-1 bg-amber-400 text-gray-900 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow"
              >
                {totalCartItems}
              </span>
            </div>
            <span className="hidden sm:inline-block ml-2 font-bold text-xs">Cart</span>
          </button>
        </div>
      </div>
    </header>
  );
};
