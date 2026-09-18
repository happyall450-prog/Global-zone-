import React from 'react';
import {
  Menu,
  Zap,
  Flame,
  ShieldAlert,
  Sparkles,
  Tag,
  Layers,
  RefreshCw,
  Globe,
  Link as LinkIcon,
  Percent,
  Palette,
  KeyRound,
  Wrench,
  Smartphone,
  Download
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCategory } from '../types';

export const SubNavbar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    activeView,
    setActiveView,
    setIsAddProductOpen,
    setIsFreeGuaranteeOpen,
    triggerAutomatedStoreSale,
    trafficMode,
    setTrafficMode,
    triggerInstantSale,
    setIsStoreOneLinkModalOpen,
    setIsMarketSyncModalOpen,
    triggerMarketCommissionSale,
    setIsStoreLogoStudioOpen,
    setIsAccountSecurityOpen,
    setIsErrorSolverOpen,
    setIsAppStorePublishOpen,
    setIsDownloadAppOpen,
    currentUser,
    setIsSignInModalOpen,
    executeDirectSearch,
    isAiAgentsModalOpen,
    setIsAiAgentsModalOpen,
    triggerAiFastSales,
    triggerAiAddTrendingProducts,
  } = useMarketplace();

  return (
    <div className="bg-[#232f3e] text-white text-xs border-b border-gray-700 shadow-sm overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-h-[38px] gap-2 whitespace-nowrap">
        {/* Left category quick-links */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* All button */}
          <button
            id="subnav-all-btn"
            onClick={() => executeDirectSearch('', 'All')}
            className={`flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer font-bold ${
              selectedCategory === 'All' && activeView === 'marketplace' ? 'bg-gray-700 text-amber-400' : 'text-white'
            }`}
          >
            <Menu className="w-4 h-4 mr-1" />
            <span>All</span>
          </button>

          {/* AI Agents Hub quick button */}
          <button
            id="subnav-ai-agents-quick-btn"
            onClick={() => setIsAiAgentsModalOpen(true)}
            className="flex items-center px-2 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 font-extrabold border border-cyan-400/50 cursor-pointer shadow-xs"
            title="AI Agents Hub: Auto Products, Fast Sales, 3% Commission & 100% Happy Sellers"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 mr-1 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI Agents (Auto Products & Sales)</span>
          </button>

          {/* Big Market Links & 3% Commission quick button */}
          <button
            id="subnav-big-market-links"
            onClick={() => setIsMarketSyncModalOpen(true)}
            className="flex items-center px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40 cursor-pointer"
            title="Link Alibaba, Amazon, Shopify to your store & earn 3% commission"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400 mr-1" />
            <span>Big Markets (3% Commission)</span>
          </button>

          {/* Store One-Link quick button */}
          <button
            id="subnav-one-link-btn"
            onClick={() => setIsStoreOneLinkModalOpen(true)}
            className="flex items-center px-2 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/40 cursor-pointer"
            title="Install and share your store one-link across all apps"
          >
            <LinkIcon className="w-3.5 h-3.5 text-emerald-400 mr-1" />
            <span>My Store One-Link</span>
          </button>

          {/* Logo Studio quick button */}
          <button
            id="subnav-logo-studio-btn"
            onClick={() => setIsStoreLogoStudioOpen(true)}
            className="hidden sm:flex items-center px-2 py-1 rounded hover:bg-gray-700 text-amber-300 font-medium cursor-pointer"
            title="Open Store Logo Studio"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400 mr-1" />
            <span>Store Logo</span>
          </button>

          {/* Account Security PIN quick button */}
          <button
            id="subnav-security-pin-btn"
            onClick={() => setIsAccountSecurityOpen(true)}
            className="hidden md:flex items-center px-2 py-1 rounded hover:bg-gray-700 text-emerald-300 font-medium cursor-pointer"
            title="Account Security PIN & 2FA protection"
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-400 mr-1" />
            <span>Security PIN</span>
          </button>

          {/* Download App quick button */}
          <button
            id="subnav-download-app-btn"
            onClick={() => setIsDownloadAppOpen(true)}
            className="flex items-center px-2 py-1 rounded bg-amber-400 text-gray-950 hover:bg-amber-300 font-extrabold cursor-pointer shadow-xs"
            title="Download Global Zone Global App on Android, iOS & Desktop"
          >
            <Download className="w-3.5 h-3.5 mr-1 text-gray-950 animate-pulse" />
            <span>Download App</span>
          </button>

          {/* App Store & GitHub Publishing quick button */}
          <button
            id="subnav-app-store-btn"
            onClick={() => setIsAppStorePublishOpen(true)}
            className="hidden lg:flex items-center px-2 py-1 rounded hover:bg-gray-700 text-purple-300 font-medium cursor-pointer"
            title="Publish Store to GitHub, All Websites, Google Play & Apple App Store"
          >
            <Globe className="w-3.5 h-3.5 text-purple-400 mr-1" />
            <span>Publish (GitHub / Stores)</span>
          </button>

          {/* Today's Deals */}
          <button
            id="subnav-deals-btn"
            onClick={() => executeDirectSearch('', 'All')}
            className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer text-gray-200 hover:text-amber-400"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 mr-1" />
            <span>Lightning Deals</span>
          </button>

          {/* My Store Products category */}
          <button
            id="subnav-my-products-btn"
            onClick={() => executeDirectSearch(undefined, 'My Custom Products')}
            className={`flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer ${
              selectedCategory === 'My Custom Products' ? 'bg-emerald-900 text-emerald-300 font-semibold' : 'text-gray-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400 mr-1" />
            <span>My Products</span>
          </button>

          {/* Electronics */}
          <button
            id="subnav-cat-electronics"
            onClick={() => executeDirectSearch(undefined, 'Electronics')}
            className={`px-2 py-1 rounded hover:bg-gray-700 cursor-pointer ${
              selectedCategory === 'Electronics' ? 'text-amber-400 font-bold' : 'text-gray-200'
            }`}
          >
            Electronics
          </button>

          {/* Home & Kitchen */}
          <button
            id="subnav-cat-home"
            onClick={() => executeDirectSearch(undefined, 'Home & Kitchen')}
            className={`hidden md:inline-block px-2 py-1 rounded hover:bg-gray-700 cursor-pointer ${
              selectedCategory === 'Home & Kitchen' ? 'text-amber-400 font-bold' : 'text-gray-200'
            }`}
          >
            Home & Kitchen
          </button>

          {/* Pro Store Guarantee */}
          <button
            id="subnav-pro-guarantee"
            onClick={() => setIsFreeGuaranteeOpen(true)}
            className="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer text-amber-400 font-medium"
          >
            <Tag className="w-3.5 h-3.5 mr-1" />
            <span>Pro Store Guarantee</span>
          </button>
        </div>

        {/* Right action shortcuts */}
        <div className="flex items-center space-x-2 pl-2">
          {/* Gmail Quick Status */}
          <button
            id="subnav-gmail-quick-btn"
            onClick={() => setIsSignInModalOpen(true)}
            className="flex items-center space-x-1.5 px-2 py-1 rounded bg-blue-600/25 hover:bg-blue-600/40 text-blue-200 border border-blue-400/40 font-semibold cursor-pointer text-xs"
            title="Google / Gmail Authentication"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="truncate max-w-[130px] sm:max-w-[170px]">{currentUser ? currentUser.email : 'Sign in with Gmail'}</span>
          </button>

          {/* Test 3% Commission Sale Trigger */}
          <button
            id="subnav-test-3pct-btn"
            onClick={() => triggerMarketCommissionSale()}
            className="flex items-center bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-2.5 py-1 rounded font-bold transition shadow cursor-pointer text-xs"
            title="Simulate a customer buying an Amazon/Alibaba item and depositing 3% commission to your store"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            <span>Test 3% Sale</span>
          </button>

          {/* Fast Automated Sale trigger button */}
          <button
            id="subnav-auto-sale-trigger"
            onClick={() => triggerAutomatedStoreSale(35)}
            className="hidden sm:flex items-center bg-amber-500 hover:bg-amber-400 text-gray-950 px-2.5 py-1 rounded font-bold transition shadow cursor-pointer text-xs"
            title="Automatically discount your products and launch deals"
          >
            <Flame className="w-3.5 h-3.5 mr-1 text-red-700 fill-red-700 animate-pulse" />
            <span>Automate 35% Sale</span>
          </button>

          {/* Instant sale generator for excitement */}
          <button
            id="subnav-simulate-sale-btn"
            onClick={triggerInstantSale}
            className="hidden lg:flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-2 py-1 rounded font-medium text-xs cursor-pointer"
            title="Simulate a customer buying an item right now"
          >
            <RefreshCw className="w-3 h-3 mr-1 text-emerald-400" />
            <span>Any Sale</span>
          </button>
        </div>
      </div>
    </div>
  );
};

