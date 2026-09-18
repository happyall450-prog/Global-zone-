import React from 'react';
import { X, ShieldCheck, Check, DollarSign, Lock, Sparkles, HeartHandshake, Percent, Download, Globe } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const FreeGuaranteeModal: React.FC = () => {
  const { isFreeGuaranteeOpen, setIsFreeGuaranteeOpen, setIsAddProductOpen, storeBranding, setIsDownloadAppOpen } = useMarketplace();

  if (!isFreeGuaranteeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="pro-guarantee-modal"
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full relative text-gray-900 border border-gray-200 overflow-hidden"
      >
        {/* Header banner */}
        <div className="bg-gradient-to-r from-[#131921] via-gray-900 to-amber-950 text-white p-5 relative">
          <button
            id="close-pro-guarantee-btn"
            onClick={() => setIsFreeGuaranteeOpen(false)}
            className="absolute top-3 right-3 text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1 bg-amber-400 text-gray-950 px-2.5 py-0.5 rounded-full text-xs font-black mb-2">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Verified Pro Store Guarantee
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {storeBranding.storeName || 'Ameez Store Pro'} Standards
          </h2>
          <p className="text-xs text-amber-200 mt-1">
            Built for serious entrepreneurs, workshops, and global brands who demand the highest standard of security, big market commissions, and mobile reach.
          </p>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Comparison table */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 space-y-2.5">
            <div className="font-bold text-gray-900 text-xs uppercase tracking-wider">
              {storeBranding.storeName || 'Ameez Store Pro'} vs. Standard Platforms
            </div>

            <div className="grid grid-cols-3 text-center border-b border-gray-200 pb-2 font-bold text-gray-700">
              <span className="text-left">Feature</span>
              <span className="text-gray-500">Standard Platforms</span>
              <span className="text-amber-800">Ameez Store Pro</span>
            </div>

            <div className="grid grid-cols-3 text-center items-center py-1 border-b border-gray-100">
              <span className="text-left text-gray-600 font-medium">Big Markets Link</span>
              <span className="text-gray-500">Not Supported</span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 py-0.5 rounded">3% Commission</span>
            </div>

            <div className="grid grid-cols-3 text-center items-center py-1 border-b border-gray-100">
              <span className="text-left text-gray-600 font-medium">App Download</span>
              <span className="text-gray-500">App Store Only</span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 py-0.5 rounded">1-Click Android/iOS</span>
            </div>

            <div className="grid grid-cols-3 text-center items-center py-1 border-b border-gray-100">
              <span className="text-left text-gray-600 font-medium">Security</span>
              <span className="text-gray-500">Basic SSL</span>
              <span className="font-extrabold text-emerald-700 bg-emerald-50 py-0.5 rounded">256-Bit + PIN Code</span>
            </div>

            <div className="grid grid-cols-3 text-center items-center py-1">
              <span className="text-left text-gray-600 font-medium">GitHub & Web Publish</span>
              <span className="text-gray-500">Manual / Paid</span>
              <span className="font-extrabold text-emerald-700">Instant CI/CD</span>
            </div>
          </div>

          {/* 3 Pillars */}
          <div className="space-y-2.5">
            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                <Percent className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-gray-900">3% Big Market Commission System:</strong>
                <p className="text-gray-600 mt-0.5">
                  Link Amazon, Alibaba, and Shopify directly into your store. Every order deposits a verified 3% commission straight into your app account.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-gray-900">Credit Card & PIN Code Account Security:</strong>
                <p className="text-gray-600 mt-0.5">
                  All credit card numbers are tokenized with AES-256 encryption. Payouts and settings are guarded by your personalized 6-digit Security PIN.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Download className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-gray-900">Official App Installation:</strong>
                <p className="text-gray-600 mt-0.5">
                  Customers can download your store directly onto any phone, tablet, or desktop with instant push updates and offline support.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setIsFreeGuaranteeOpen(false);
                setIsDownloadAppOpen(true);
              }}
              className="flex-1 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-black py-3 px-4 rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-[#fcd200]"
            >
              <Download className="w-4 h-4" />
              <span>Download Store App</span>
            </button>
            <button
              onClick={() => {
                setIsFreeGuaranteeOpen(false);
                setIsAddProductOpen(true);
              }}
              className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>+ Add Product to Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
