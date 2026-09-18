import React, { useState } from 'react';
import {
  X,
  Link as LinkIcon,
  Copy,
  Check,
  Share2,
  Code,
  QrCode,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Globe,
  Smartphone,
  Layers,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import confetti from 'canvas-confetti';

export const StoreOneLinkModal: React.FC = () => {
  const {
    isStoreOneLinkModalOpen,
    setIsStoreOneLinkModalOpen,
    storeOneLink,
    updateStoreSlug,
    storeWallet,
    triggerMarketCommissionSale,
    setIsMarketSyncModalOpen,
  } = useMarketplace();

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'embed' | 'qr' | 'social'>('link');
  const [slugInput, setSlugInput] = useState(storeOneLink.storeSlug);
  const [isEditingSlug, setIsEditingSlug] = useState(false);

  if (!isStoreOneLinkModalOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(storeOneLink.storeUrl);
    setCopiedLink(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard?.writeText(storeOneLink.embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2500);
  };

  const handleCopyIframe = () => {
    navigator.clipboard?.writeText(storeOneLink.iframeCode);
    setCopiedIframe(true);
    setTimeout(() => setCopiedIframe(false), 2500);
  };

  const handleSaveSlug = () => {
    if (slugInput.trim()) {
      updateStoreSlug(slugInput);
      setIsEditingSlug(false);
    }
  };

  const shareText = encodeURIComponent(
    `Visit my official AmazeFree online store! Buy top products from Amazon, Alibaba, Shopify & custom brands: ${storeOneLink.storeUrl}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#131921] via-[#1d2634] to-[#232f3e] text-white p-5 flex items-start justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black tracking-tight text-white">
                  My Store One-Link & Install
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> 3% Commission Active
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Install your store anywhere or share one link. Any product bought earns you 3% commission!
              </p>
            </div>
          </div>

          <button
            id="store-one-link-close-btn"
            onClick={() => setIsStoreOneLinkModalOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Banner: 3% Commission Mechanism */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-xs text-amber-900">
            <div className="w-7 h-7 rounded-full bg-amber-400 text-gray-900 font-extrabold flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
              3%
            </div>
            <div>
              <span className="font-bold text-amber-950">Universal 3% Commission Guarantee: </span>
              <span>
                When anyone clicks your One-Link and buys products from <strong>Alibaba, Amazon, or Shopify</strong>, 3% of the sale goes directly to your Store Wallet!
              </span>
            </div>
          </div>

          <button
            id="quick-test-sale-btn"
            onClick={() => triggerMarketCommissionSale()}
            className="hidden sm:flex items-center space-x-1 bg-amber-500 hover:bg-amber-400 text-gray-950 px-3 py-1.5 rounded-md text-xs font-bold transition shadow-sm cursor-pointer whitespace-nowrap ml-3"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Test 3% Sale</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-5 text-xs font-semibold text-gray-600 gap-2">
          <button
            onClick={() => setActiveTab('link')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'link'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Store Link</span>
          </button>

          <button
            onClick={() => setActiveTab('embed')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'embed'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Install in App / Website</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'social'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Share All Apps</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Store QR Code</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: ONE LINK */}
          {activeTab === 'link' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Permanent Store URL
                </label>
                <div className="flex items-center rounded-lg border-2 border-amber-400/80 bg-amber-50/40 p-1.5 shadow-sm">
                  <div className="pl-3 pr-2 text-gray-500 text-xs font-mono select-none">
                    https://amazefree.store/shop/
                  </div>
                  {isEditingSlug ? (
                    <input
                      type="text"
                      value={slugInput}
                      onChange={(e) => setSlugInput(e.target.value)}
                      className="flex-1 bg-white px-2 py-1 text-sm font-bold text-gray-900 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  ) : (
                    <span className="flex-1 text-sm font-extrabold text-gray-900 font-mono">
                      {storeOneLink.storeSlug}
                    </span>
                  )}

                  {isEditingSlug ? (
                    <button
                      onClick={handleSaveSlug}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5 rounded-md font-bold transition ml-2 cursor-pointer"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditingSlug(true)}
                      className="text-xs text-gray-600 hover:text-gray-900 underline px-2 cursor-pointer"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    id="copy-store-one-link-btn"
                    onClick={handleCopyLink}
                    className="bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-gray-950 px-4 py-2 rounded-md text-xs font-extrabold flex items-center space-x-1.5 transition shadow-sm ml-2 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-800" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Performance Stats for this link */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                  <span className="text-[11px] text-gray-500 font-medium block">Total Link Clicks</span>
                  <span className="text-xl font-black text-gray-900 mt-1 block">
                    {storeOneLink.totalClicks.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">↑ 18% this week</span>
                </div>

                <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                  <span className="text-[11px] text-gray-500 font-medium block">Orders from Link</span>
                  <span className="text-xl font-black text-gray-900 mt-1 block">
                    {storeOneLink.totalLinkSales}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">Automatic sale conversion</span>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-lg border border-emerald-200">
                  <span className="text-[11px] text-emerald-700 font-bold block">3% Commission Earned</span>
                  <span className="text-xl font-black text-emerald-800 mt-1 block">
                    ${storeWallet.totalCommissionEarned?.toFixed(2) || '442.25'}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium">Direct to your wallet</span>
                </div>
              </div>

              {/* Quick instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 space-y-1.5">
                <div className="font-bold flex items-center text-blue-950">
                  <Sparkles className="w-4 h-4 text-blue-600 mr-1.5" />
                  How Your One-Link Generates 3% Commission:
                </div>
                <p>1. Give this one link to buyers, friends, social media, or add it to your profile.</p>
                <p>2. Your link displays all your custom items PLUS synced products from <strong>Alibaba, Amazon & Shopify</strong>.</p>
                <p>3. Whenever anyone buys products from the big markets, <strong>3% Commission</strong> is automatically transferred to your Store Balance!</p>
              </div>
            </div>
          )}

          {/* TAB 2: EMBED / INSTALL IN APPS */}
          {activeTab === 'embed' && (
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-800 flex items-center">
                    <Code className="w-3.5 h-3.5 mr-1 text-amber-500" />
                    Option 1: JavaScript Widget Script (Install in any HTML / WordPress / Web App)
                  </label>
                  <button
                    onClick={handleCopyEmbed}
                    className="text-amber-600 hover:text-amber-700 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedEmbed ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmbed ? 'Copied' : 'Copy Script'}</span>
                  </button>
                </div>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto border border-gray-800">
                  {storeOneLink.embedCode}
                </div>
                <p className="text-gray-500 text-[11px] mt-1">
                  Paste before the closing &lt;/body&gt; tag of your website or app. Displays your store with 3% affiliate automation.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-gray-800 flex items-center">
                    <Layers className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                    Option 2: Responsive Full Store IFrame Embed
                  </label>
                  <button
                    onClick={handleCopyIframe}
                    className="text-amber-600 hover:text-amber-700 font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedIframe ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIframe ? 'Copied' : 'Copy IFrame'}</span>
                  </button>
                </div>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-[11px] overflow-x-auto border border-gray-800">
                  {storeOneLink.iframeCode}
                </div>
                <p className="text-gray-500 text-[11px] mt-1">
                  Embeds your complete storefront smoothly inside any mobile app view, blog post, or e-commerce portal.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                <span className="text-gray-600">Want to connect your Amazon/Alibaba API key or seller link?</span>
                <button
                  onClick={() => {
                    setIsStoreOneLinkModalOpen(false);
                    setIsMarketSyncModalOpen(true);
                  }}
                  className="text-amber-600 hover:text-amber-700 font-bold flex items-center cursor-pointer"
                >
                  Manage Big Markets →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL & MESSAGING APPS */}
          {activeTab === 'social' && (
            <div className="space-y-3 text-xs">
              <p className="text-gray-600">
                Share your store one-link across all major social networks and messaging apps. Every sale made earns you 3%:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-lg flex items-center space-x-2.5 transition text-gray-900 font-bold cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xs">
                    WA
                  </div>
                  <span>WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(storeOneLink.storeUrl)}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 rounded-lg flex items-center space-x-2.5 transition text-gray-900 font-bold cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0088cc] text-white flex items-center justify-center text-xs">
                    TG
                  </div>
                  <span>Telegram</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeOneLink.storeUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#1877f2]/10 hover:bg-[#1877f2]/20 border border-[#1877f2]/30 rounded-lg flex items-center space-x-2.5 transition text-gray-900 font-bold cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#1877f2] text-white flex items-center justify-center text-xs">
                    FB
                  </div>
                  <span>Facebook</span>
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/10 hover:bg-black/20 border border-black/20 rounded-lg flex items-center space-x-2.5 transition text-gray-900 font-bold cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs">
                    𝕏
                  </div>
                  <span>X / Twitter</span>
                </a>

                {/* TikTok / Instagram copy */}
                <button
                  onClick={handleCopyLink}
                  className="p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-pink-300 rounded-lg flex items-center space-x-2.5 transition text-gray-900 font-bold cursor-pointer text-left"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-xs">
                    IG
                  </div>
                  <span>Instagram Bio Link</span>
                </button>

                {/* General Link Copy */}
                <button
                  onClick={handleCopyLink}
                  className="p-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg flex items-center space-x-2.5 transition text-gray-900 font-bold cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center text-xs font-black">
                    🔗
                  </div>
                  <span>Direct Copy</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
              <div className="p-4 bg-white border-2 border-gray-900 rounded-2xl shadow-lg inline-block">
                {/* High quality SVG QR code graphic */}
                <svg
                  className="w-48 h-48"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner markers */}
                  <rect x="5" y="5" width="24" height="24" rx="3" fill="#131921" />
                  <rect x="9" y="9" width="16" height="16" rx="2" fill="white" />
                  <rect x="13" y="13" width="8" height="8" rx="1" fill="#ff9900" />

                  <rect x="71" y="5" width="24" height="24" rx="3" fill="#131921" />
                  <rect x="75" y="9" width="16" height="16" rx="2" fill="white" />
                  <rect x="79" y="13" width="8" height="8" rx="1" fill="#ff9900" />

                  <rect x="5" y="71" width="24" height="24" rx="3" fill="#131921" />
                  <rect x="9" y="75" width="16" height="16" rx="2" fill="white" />
                  <rect x="13" y="79" width="8" height="8" rx="1" fill="#ff9900" />

                  {/* QR dot matrix pattern */}
                  <rect x="35" y="8" width="6" height="6" fill="#131921" />
                  <rect x="45" y="8" width="6" height="6" fill="#ff9900" />
                  <rect x="55" y="8" width="6" height="6" fill="#131921" />

                  <rect x="35" y="18" width="6" height="6" fill="#ff9900" />
                  <rect x="55" y="18" width="6" height="6" fill="#131921" />

                  <rect x="10" y="35" width="6" height="6" fill="#131921" />
                  <rect x="20" y="35" width="6" height="6" fill="#131921" />
                  <rect x="35" y="35" width="8" height="8" fill="#131921" />
                  <rect x="47" y="35" width="8" height="8" fill="#ff9900" />
                  <rect x="60" y="35" width="6" height="6" fill="#131921" />
                  <rect x="75" y="35" width="6" height="6" fill="#131921" />
                  <rect x="85" y="35" width="6" height="6" fill="#ff9900" />

                  <rect x="10" y="47" width="6" height="6" fill="#ff9900" />
                  <rect x="25" y="47" width="6" height="6" fill="#131921" />
                  <rect x="38" y="47" width="6" height="6" fill="#ff9900" />
                  <rect x="50" y="47" width="8" height="8" fill="#131921" />
                  <rect x="65" y="47" width="6" height="6" fill="#ff9900" />
                  <rect x="80" y="47" width="6" height="6" fill="#131921" />

                  <rect x="35" y="60" width="6" height="6" fill="#131921" />
                  <rect x="47" y="60" width="8" height="8" fill="#131921" />
                  <rect x="60" y="60" width="6" height="6" fill="#ff9900" />
                  <rect x="75" y="60" width="6" height="6" fill="#131921" />

                  <rect x="35" y="75" width="6" height="6" fill="#ff9900" />
                  <rect x="45" y="75" width="6" height="6" fill="#131921" />
                  <rect x="55" y="75" width="6" height="6" fill="#ff9900" />
                  <rect x="68" y="75" width="6" height="6" fill="#131921" />
                  <rect x="80" y="75" width="8" height="8" fill="#131921" />

                  <rect x="35" y="85" width="6" height="6" fill="#131921" />
                  <rect x="50" y="85" width="6" height="6" fill="#131921" />
                  <rect x="65" y="85" width="6" height="6" fill="#ff9900" />
                  <rect x="85" y="85" width="6" height="6" fill="#131921" />
                </svg>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-gray-900">
                  Scan to Open Store & Buy
                </h4>
                <p className="text-xs text-gray-500 max-w-sm mt-0.5">
                  Customers scan this with their phone camera to instantly browse and order. 3% commission is attributed automatically!
                </p>
              </div>

              <button
                onClick={handleCopyLink}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-lg border border-gray-300 transition cursor-pointer"
              >
                Copy Link Under QR Code
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Store Slug: <strong className="text-gray-800">{storeOneLink.storeSlug}</strong> • 3% Commission Active
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsStoreOneLinkModalOpen(false);
                setIsMarketSyncModalOpen(true);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer"
            >
              Big Markets Sync
            </button>

            <button
              onClick={handleCopyLink}
              className="bg-amber-400 hover:bg-amber-500 text-gray-950 px-4 py-1.5 rounded-lg text-xs font-extrabold transition shadow cursor-pointer"
            >
              {copiedLink ? 'Copied Link!' : 'Copy My One-Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
