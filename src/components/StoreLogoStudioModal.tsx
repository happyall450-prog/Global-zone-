import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Crown,
  Zap,
  ShieldCheck,
  Gem,
  Rocket,
  ShoppingBag,
  Star,
  Check,
  Palette,
  Heart,
  Eye,
  Smartphone,
  Globe,
  Share2,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../context/MarketplaceContext';
import { StoreLogoStyle } from '../types';

export const StoreLogoStudioModal: React.FC = () => {
  const {
    isStoreLogoStudioOpen,
    setIsStoreLogoStudioOpen,
    storeBranding,
    updateStoreBranding,
  } = useMarketplace();

  const [selectedStyle, setSelectedStyle] = useState<StoreLogoStyle>(storeBranding.logoStyle);
  const [storeName, setStoreName] = useState(storeBranding.storeName);
  const [storeTagline, setStoreTagline] = useState(storeBranding.storeTagline);
  const [brandColor, setBrandColor] = useState(storeBranding.brandColor);
  const [customLogoUrl, setCustomLogoUrl] = useState(storeBranding.customLogoUrl || '');
  const [activeTab, setActiveTab] = useState<'designer' | 'showcase'>('designer');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isStoreLogoStudioOpen) return null;

  const logoTemplates: {
    id: StoreLogoStyle;
    name: string;
    description: string;
    icon: React.ReactNode;
    defaultColor: string;
  }[] = [
    {
      id: 'crown-apex',
      name: 'Royal Crown Apex',
      description: 'Golden majesty & #1 seller trust badge',
      icon: <Crown className="w-6 h-6" />,
      defaultColor: '#f59e0b',
    },
    {
      id: 'spark-cart',
      name: 'Electric Spark Vault',
      description: 'High-voltage lightning deals & fast shipping',
      icon: <Zap className="w-6 h-6" />,
      defaultColor: '#eab308',
    },
    {
      id: 'shield-vault',
      name: 'Emerald Shield Safe',
      description: '256-bit safe checkout & verified seller guarantee',
      icon: <ShieldCheck className="w-6 h-6" />,
      defaultColor: '#10b981',
    },
    {
      id: 'diamond-gem',
      name: 'Sapphire Diamond Pro',
      description: 'Luxury grade premium storefront identity',
      icon: <Gem className="w-6 h-6" />,
      defaultColor: '#3b82f6',
    },
    {
      id: 'rocket-fast',
      name: 'Ruby Rocket Velocity',
      description: 'Ultra-speed automated sales & instant delivery',
      icon: <Rocket className="w-6 h-6" />,
      defaultColor: '#ef4444',
    },
    {
      id: 'modern-monogram',
      name: 'Minimalist Storefront',
      description: 'Clean modern boutique shopping emblem',
      icon: <ShoppingBag className="w-6 h-6" />,
      defaultColor: '#6366f1',
    },
  ];

  const colorPalettes = [
    { name: 'Imperial Amber', value: '#f59e0b' },
    { name: 'Emerald Vault', value: '#10b981' },
    { name: 'Sapphire Blue', value: '#2563eb' },
    { name: 'Cyber Purple', value: '#8b5cf6' },
    { name: 'Ruby Crimson', value: '#e11d48' },
    { name: 'Obsidian Gold', value: '#d97706' },
  ];

  const handleSaveLogo = () => {
    updateStoreBranding({
      logoStyle: selectedStyle,
      storeName: storeName.trim() || 'AmazeFree Pro Store',
      storeTagline: storeTagline.trim() || 'Verified Zero-Fee Marketplace',
      brandColor: brandColor,
      customLogoUrl: customLogoUrl.trim() || undefined,
      verifiedStoreBadge: true,
    });

    setSavedSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setSavedSuccess(false);
      setIsStoreLogoStudioOpen(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="store-logo-studio-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-[#131921] text-white p-4 sm:p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow"
              style={{ background: brandColor }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  Store Logo & Brand Identity Studio
                </h2>
                <span className="bg-amber-400 text-gray-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                  PRO CRAFT
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Customize your store logo design so customers looking at your store will love it!
              </p>
            </div>
          </div>
          <button
            id="close-logo-studio-btn"
            onClick={() => setIsStoreLogoStudioOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="bg-gray-50 border-b border-gray-200 px-5 flex items-center space-x-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('designer')}
            className={`py-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 ${
              activeTab === 'designer'
                ? 'border-amber-500 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-500" />
            <span>Logo Designer & Styles</span>
          </button>
          <button
            onClick={() => setActiveTab('showcase')}
            className={`py-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 ${
              activeTab === 'showcase'
                ? 'border-amber-500 text-gray-950'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Customer Admiration & Live Preview (99.8% Love)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {activeTab === 'designer' ? (
            <div className="space-y-6">
              {/* Live Preview Hero Card */}
              <div className="bg-gradient-to-r from-gray-900 via-[#1a2332] to-gray-900 text-white rounded-xl p-5 border border-gray-800 shadow-md">
                <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold mb-3 flex items-center justify-between">
                  <span className="flex items-center">
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    Live Store Logo Header Preview
                  </span>
                  <span className="text-emerald-400 font-medium">✓ Auto-Optimized for All Devices</span>
                </div>

                <div className="bg-[#131921]/90 rounded-lg p-3.5 border border-gray-700/60 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden transition-all"
                      style={{ background: brandColor }}
                    >
                      {customLogoUrl ? (
                        <img
                          src={customLogoUrl}
                          alt="Custom logo"
                          className="w-full h-full object-cover rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        logoTemplates.find((t) => t.id === selectedStyle)?.icon || (
                          <Crown className="w-6 h-6" />
                        )
                      )}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black tracking-tight text-white">
                          {storeName || 'AmazeFree Pro Store'}
                        </span>
                        <span className="bg-amber-400 text-gray-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase">
                          0% FEE
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 font-medium">
                        {storeTagline || 'Verified Zero-Fee Marketplace'}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center bg-gray-800/80 border border-gray-700 rounded-lg px-2.5 py-1 text-xs">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
                    <span className="font-bold text-white">4.9/5</span>
                    <span className="text-gray-400 ml-1">(14.2k Loves)</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Select Designer Logo Style */}
              <div>
                <label className="block text-xs font-bold text-gray-900 mb-2">
                  1. Choose Designer Logo Emblem
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {logoTemplates.map((template) => {
                    const isSelected = selectedStyle === template.id && !customLogoUrl;
                    return (
                      <div
                        key={template.id}
                        onClick={() => {
                          setSelectedStyle(template.id);
                          setCustomLogoUrl('');
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-sm"
                            style={{ background: brandColor }}
                          >
                            {template.icon}
                          </div>
                          {isSelected && (
                            <span className="bg-amber-500 text-white rounded-full p-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-gray-900">{template.name}</div>
                          <div className="text-[10px] text-gray-500 leading-tight mt-0.5">
                            {template.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Store Name & Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Store Brand Name
                  </label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. AmazeFree Pro Store"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Appears on your store header and customer receipts.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Store Slogan / Tagline
                  </label>
                  <input
                    type="text"
                    value={storeTagline}
                    onChange={(e) => setStoreTagline(e.target.value)}
                    placeholder="e.g. Verified Zero-Fee Marketplace"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Short badge phrase seen by customers.</p>
                </div>
              </div>

              {/* Step 3: Color Palette & Custom Image */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-2">
                    Brand Color Theme
                  </label>
                  <div className="flex items-center space-x-2">
                    {colorPalettes.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() => setBrandColor(c.value)}
                        className={`w-7 h-7 rounded-full cursor-pointer transition transform hover:scale-110 flex items-center justify-center ${
                          brandColor === c.value ? 'ring-2 ring-offset-2 ring-gray-900 scale-105' : ''
                        }`}
                        style={{ background: c.value }}
                        title={c.name}
                      >
                        {brandColor === c.value && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-800 mb-1">
                    Optional Custom Logo URL
                  </label>
                  <input
                    type="url"
                    value={customLogoUrl}
                    onChange={(e) => setCustomLogoUrl(e.target.value)}
                    placeholder="https://example.com/my-logo.png"
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">Direct PNG/SVG image link for custom branding.</p>
                </div>
              </div>

              {/* Save CTA */}
              <div className="pt-2">
                <button
                  id="save-store-logo-btn"
                  onClick={handleSaveLogo}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-black py-3 px-4 rounded-xl text-sm shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-[#fcd200]"
                >
                  {savedSuccess ? (
                    <span className="flex items-center text-emerald-900 font-extrabold">
                      <Check className="w-5 h-5 mr-1 text-emerald-800" />
                      Store Logo Saved & Published Live!
                    </span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-gray-900" />
                      <span>Apply & Publish Store Logo Across Entire App</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            /* Showcase & Customer Admiration View */
            <div className="space-y-5">
              {/* Admiration score banner */}
              <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border border-rose-200/80 rounded-2xl p-5 text-center">
                <div className="flex items-center justify-center space-x-1.5 text-rose-600 mb-1">
                  <Heart className="w-5 h-5 fill-rose-500" />
                  <span className="text-xs font-black uppercase tracking-wider">Shopper Brand Love Metric</span>
                </div>
                <div className="text-3xl font-black text-gray-900">
                  99.8% Customer Admiration Score
                </div>
                <p className="text-xs text-gray-600 max-w-lg mx-auto mt-1">
                  Shoppers visiting your store consistently praise the high-craft logo design, sleek typography, and verified security badges!
                </p>
              </div>

              {/* Showcase Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile App Icon Preview */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-800 mb-3">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>Mobile App Homescreen Icon</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl relative overflow-hidden"
                      style={{ background: brandColor }}
                    >
                      {logoTemplates.find((t) => t.id === selectedStyle)?.icon || <Crown className="w-8 h-8" />}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{storeName}</div>
                      <div className="text-[11px] text-gray-500">Android & iOS App Icon</div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-1">✓ Play Store & App Store Ready</div>
                    </div>
                  </div>
                </div>

                {/* Checkout & Packaging Seal Preview */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-800 mb-3">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Customer Receipt & Packaging Seal</span>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-xs text-xs space-y-1">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                      <span className="font-black text-gray-900">{storeName}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                        VERIFIED STORE
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500">
                      "Thank you for shopping with {storeName}! 100% Protected."
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer quotes */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 mb-2">Recent Shopper Feedback:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      "The store logo looks so professional and trustworthy. It gave me complete confidence to purchase!"
                    </p>
                    <div className="text-[10px] text-gray-500 mt-1 font-semibold">— Jessica M. • Verified Buyer</div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">
                      "Love the brand emblem and verified seller badge. Cleanest store experience on the web."
                    </p>
                    <div className="text-[10px] text-gray-500 mt-1 font-semibold">— David K. • Global Customer</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => setActiveTab('designer')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-5 py-2.5 rounded-full text-xs cursor-pointer"
                >
                  ← Edit Logo in Designer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
