import React from 'react';
import { ShieldCheck, Heart, ArrowUp, Palette, KeyRound, Wrench, Smartphone, Lock, Download, Globe, Percent } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { StoreLogo } from './StoreLogo';

export const Footer: React.FC = () => {
  const {
    setActiveView,
    setIsAddProductOpen,
    setIsFreeGuaranteeOpen,
    setIsStoreLogoStudioOpen,
    setIsAccountSecurityOpen,
    setIsErrorSolverOpen,
    setIsAppStorePublishOpen,
    setIsDownloadAppOpen,
    setIsMarketSyncModalOpen,
    storeBranding,
    currentUser,
    setIsSignInModalOpen,
  } = useMarketplace();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#232f3e] text-gray-300 text-xs mt-12 border-t border-gray-700">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white py-3 text-center font-medium cursor-pointer transition flex items-center justify-center space-x-1"
      >
        <ArrowUp className="w-4 h-4 mr-1" />
        <span>Back to top</span>
      </button>

      {/* Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-white text-sm mb-3">Store Branding & Design</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>
              <button
                onClick={() => setIsStoreLogoStudioOpen(true)}
                className="hover:underline text-amber-400 font-bold flex items-center space-x-1 cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5 mr-1" />
                <span>Store Logo Studio</span>
              </button>
            </li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); setIsFreeGuaranteeOpen(true); }} className="hover:underline">Pro Store Guarantee</a></li>
            <li><a href="#branding" onClick={(e) => { e.preventDefault(); setIsStoreLogoStudioOpen(true); }} className="hover:underline">Custom Badges & Typography</a></li>
            <li><a href="#security" onClick={(e) => { e.preventDefault(); setIsAccountSecurityOpen(true); }} className="hover:underline">256-Bit Bank Security</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Big Markets & Commission</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>
              <button
                onClick={() => setIsMarketSyncModalOpen(true)}
                className="text-amber-400 hover:underline font-bold flex items-center space-x-1 cursor-pointer text-left"
              >
                <Percent className="w-3.5 h-3.5 mr-1 text-amber-400" />
                <span>3% Big Market Commission</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsDownloadAppOpen(true)}
                className="hover:underline text-white font-bold flex items-center space-x-1 cursor-pointer text-left"
              >
                <Download className="w-3.5 h-3.5 mr-1 text-amber-400" />
                <span>Download Store App</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsAppStorePublishOpen(true)}
                className="hover:underline text-purple-300 flex items-center space-x-1 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 mr-1 text-purple-400" />
                <span>Publish (GitHub / App Stores)</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('seller-hub')}
                className="hover:underline cursor-pointer text-left"
              >
                Seller Hub Command Center
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Payment & Card Security</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>
              <button
                onClick={() => setIsAccountSecurityOpen(true)}
                className="hover:underline text-emerald-400 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 mr-1" />
                <span>Account Security PIN Code</span>
              </button>
            </li>
            <li><span className="text-gray-400">Tokenized Credit Card Protection</span></li>
            <li><span className="text-gray-400">AVS Postal / ZIP Code Verification</span></li>
            <li>
              <button
                onClick={() => setIsErrorSolverOpen(true)}
                className="hover:underline text-blue-300 font-semibold flex items-center space-x-1 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5 mr-1" />
                <span>1-Click Error Solver</span>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white text-sm mb-3">Google & Account</h4>
          <ul className="space-y-2 text-gray-400 text-xs">
            <li>
              <button
                onClick={() => setIsSignInModalOpen(true)}
                className="hover:underline text-blue-300 font-semibold cursor-pointer text-left flex items-center space-x-1"
              >
                <span>{currentUser ? `Gmail: ${currentUser.email}` : 'Sign in with Gmail'}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('orders')}
                className="hover:underline cursor-pointer text-left"
              >
                Your Orders & Tracking
              </button>
            </li>
            <li><span className="text-gray-400">Shipping Rates & Policies</span></li>
            <li>
              <button
                onClick={() => setIsErrorSolverOpen(true)}
                className="hover:underline text-emerald-400 cursor-pointer text-left"
              >
                Run Health Diagnostic
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#131921] py-6 px-4 border-t border-gray-800 text-center space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div onClick={() => setIsStoreLogoStudioOpen(true)} className="cursor-pointer">
            <StoreLogo size="sm" />
          </div>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-xs text-amber-400 font-bold flex items-center">
            <Percent className="w-3.5 h-3.5 mr-1" />
            3% Commission Payout to App Account
          </span>
          <span className="text-gray-500 hidden sm:inline">|</span>
          <span className="text-xs text-blue-300 flex items-center">
            <Lock className="w-3 h-3 mr-1" />
            PCI-DSS Level 1 & Bank AVS Certified
          </span>
        </div>
        <p className="text-[11px] text-gray-500">
          Conditions of Use • Privacy Notice • Consumer Health Data Privacy Disclosure • Your Ads Privacy Choices
        </p>
        <p className="text-[11px] text-gray-500">
          © {new Date().getFullYear()}, {storeBranding.storeName || 'Global zone Global'}, Inc. or its affiliates. Official Multi-Marketplace & Big Brands Hub.
        </p>
      </div>
    </footer>
  );
};
