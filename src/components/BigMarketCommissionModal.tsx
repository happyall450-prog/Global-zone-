import React, { useState } from 'react';
import {
  X,
  Globe,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  DollarSign,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Layers,
  Zap,
  Clock,
  ArrowRight,
  Percent
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { TRENDING_MARKET_IMPORTS } from '../data/initialProducts';
import { MarketPlatform } from '../types';
import confetti from 'canvas-confetti';

export const BigMarketCommissionModal: React.FC = () => {
  const {
    isMarketSyncModalOpen,
    setIsMarketSyncModalOpen,
    linkedMarkets,
    commissionRecords,
    storeWallet,
    toggleMarketConnection,
    importMarketProduct,
    triggerMarketCommissionSale,
    setIsStoreOneLinkModalOpen,
    setIsWithdrawModalOpen,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'markets' | 'commissions' | 'import'>('markets');
  const [selectedPlatformForSale, setSelectedPlatformForSale] = useState<MarketPlatform>('Amazon');
  const [importedTitles, setImportedTitles] = useState<string[]>([]);

  if (!isMarketSyncModalOpen) return null;

  const handleImport = (item: typeof TRENDING_MARKET_IMPORTS[0]) => {
    importMarketProduct({
      title: item.title,
      category: item.category,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      description: `Imported from ${item.platform}. Guaranteed 3% affiliate commission on every sale paid directly to your store wallet.`,
      features: item.features,
      stock: 45,
      isBestSeller: true,
      marketPlatform: item.platform,
    });
    setImportedTitles((prev) => [...prev, item.title]);
  };

  const handleSimulateSale = (platform: MarketPlatform) => {
    triggerMarketCommissionSale(platform);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#131921] via-[#1d2634] to-[#232f3e] text-white p-5 flex items-start justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black tracking-tight text-white">
                  Big Market Links & 3% Commission
                </h2>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center">
                  <Percent className="w-3 h-3 mr-1" /> 3% Affiliate Commission
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1">
                Link Alibaba, Amazon, Shopify & big markets to your store. Who buys products earns you 3% automatic commission!
              </p>
            </div>
          </div>

          <button
            id="big-market-modal-close-btn"
            onClick={() => setIsMarketSyncModalOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Earnings & Simulation Bar */}
        <div className="bg-amber-50 border-b border-amber-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
              3%
            </div>
            <div>
              <div className="text-[11px] text-amber-900 font-semibold uppercase tracking-wider">
                Total 3% Commission Credited to Store
              </div>
              <div className="text-xl font-black text-emerald-700 flex items-center">
                <span>${storeWallet.totalCommissionEarned?.toFixed(2) || '442.25'}</span>
                <span className="text-xs font-medium text-gray-600 ml-2">
                  ({storeWallet.commissionSalesCount || commissionRecords.length} automated sales)
                </span>
              </div>
            </div>
          </div>

          {/* Instant Commission Sale Simulator */}
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <select
              value={selectedPlatformForSale}
              onChange={(e) => setSelectedPlatformForSale(e.target.value as MarketPlatform)}
              className="bg-white border border-gray-300 text-gray-800 text-xs rounded-md px-2.5 py-2 font-bold focus:ring-2 focus:ring-amber-500 focus:outline-none cursor-pointer"
            >
              <option value="Amazon">Amazon</option>
              <option value="Alibaba">Alibaba</option>
              <option value="Shopify">Shopify</option>
              <option value="AliExpress">AliExpress</option>
              <option value="eBay">eBay</option>
              <option value="Walmart">Walmart</option>
            </select>

            <button
              id="simulate-3pct-commission-btn"
              onClick={() => handleSimulateSale(selectedPlatformForSale)}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-black text-xs px-4 py-2 rounded-md transition shadow flex items-center space-x-1.5 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate 3% Sale Now!</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-5 text-xs font-semibold text-gray-600 gap-2">
          <button
            onClick={() => setActiveTab('markets')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'markets'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Connected Big Markets ({linkedMarkets.filter((m) => m.isConnected).length})</span>
          </button>

          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'import'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Import Trending Products (1-Click)</span>
          </button>

          <button
            onClick={() => setActiveTab('commissions')}
            className={`py-3 px-3 border-b-2 transition flex items-center space-x-1.5 cursor-pointer ${
              activeTab === 'commissions'
                ? 'border-amber-500 text-amber-600 font-bold bg-white'
                : 'border-transparent hover:text-gray-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Commission Ledger ({commissionRecords.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: CONNECTED BIG MARKETS */}
          {activeTab === 'markets' && (
            <div className="space-y-4">
              <div className="text-xs text-gray-600">
                All big markets below are pre-configured to route <strong>3% Commission</strong> directly to your AmazeFree store bank/PayPal account whenever customers purchase through your store one-link.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {linkedMarkets.map((market) => (
                  <div
                    key={market.id}
                    className={`rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between ${
                      market.isConnected
                        ? 'border-gray-200 bg-white shadow-xs hover:shadow-md'
                        : 'border-gray-200 bg-gray-50 opacity-75'
                    }`}
                  >
                    <div>
                      {/* Top platform bar */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: market.color }}
                        >
                          {market.platform}
                        </span>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center ${
                            market.isConnected
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-gray-200 text-gray-600'
                          }`}
                        >
                          {market.isConnected ? (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5 mr-1 text-emerald-600" />
                              Active Link
                            </>
                          ) : (
                            'Paused'
                          )}
                        </span>
                      </div>

                      {/* Market Name & Details */}
                      <h3 className="font-extrabold text-sm text-gray-900 mt-2.5">{market.name}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                        {market.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100 text-xs">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Commission Rate</span>
                          <span className="font-black text-emerald-600 text-sm">
                            {market.commissionRate}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 block">Total Earned</span>
                          <span className="font-black text-gray-900 text-sm">
                            ${market.totalEarned.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-4 pt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleSimulateSale(market.platform)}
                        disabled={!market.isConnected}
                        className="flex-1 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 text-amber-900 text-xs font-bold py-1.5 px-2 rounded-md transition text-center cursor-pointer flex items-center justify-center space-x-1 disabled:opacity-50"
                        title="Simulate sale and collect 3% commission"
                      >
                        <Sparkles className="w-3 h-3 text-amber-700" />
                        <span>Test Sale</span>
                      </button>

                      <button
                        onClick={() => toggleMarketConnection(market.id)}
                        className={`text-xs font-bold py-1.5 px-3 rounded-md transition cursor-pointer ${
                          market.isConnected
                            ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {market.isConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Banner explaining link integration */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3 text-xs text-gray-700">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">Universal Attribution Engine</span>
                    <span>All Alibaba, Amazon, and Shopify catalog links contain your affiliate identifier. Payments settle directly in USD to your store.</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsMarketSyncModalOpen(false);
                    setIsStoreOneLinkModalOpen(true);
                  }}
                  className="bg-[#131921] hover:bg-[#232f3e] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Get My Store One-Link →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: IMPORT TRENDING PRODUCTS */}
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <p className="text-gray-600">
                  Import high-demand items from <strong>Amazon, Alibaba & Shopify</strong> directly into your store catalog. Every sale generates 3% commission:
                </p>
                <span className="text-emerald-700 font-bold">
                  {importedTitles.length} items added this session
                </span>
              </div>

              <div className="space-y-3">
                {TRENDING_MARKET_IMPORTS.map((item, idx) => {
                  const isImported = importedTitles.includes(item.title);
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-md transition"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain rounded-lg bg-gray-50 border border-gray-200 p-1 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1 text-xs">
                          <div className="flex items-center space-x-2 mb-1">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded text-white ${
                                item.platform === 'Amazon'
                                  ? 'bg-amber-600'
                                  : item.platform === 'Alibaba'
                                  ? 'bg-orange-600'
                                  : 'bg-emerald-600'
                              }`}
                            >
                              {item.platform}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{item.category}</span>
                          </div>

                          <h4 className="font-bold text-gray-900 line-clamp-1 text-sm">{item.title}</h4>
                          <div className="flex items-center space-x-3 mt-1 text-gray-600">
                            <span className="font-extrabold text-gray-900">${item.price.toFixed(2)}</span>
                            <span className="line-through text-gray-400">${item.originalPrice.toFixed(2)}</span>
                            <span className="text-emerald-600 font-bold">
                              💰 +${item.commissionAmount.toFixed(2)} (3% Commission)
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleImport(item)}
                        disabled={isImported}
                        className={`text-xs font-bold px-4 py-2 rounded-lg transition flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
                          isImported
                            ? 'bg-emerald-100 text-emerald-800 cursor-default'
                            : 'bg-amber-400 hover:bg-amber-500 text-gray-950 shadow-sm'
                        }`}
                      >
                        {isImported ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Imported to Store!</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Import to My Store</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: COMMISSION LEDGER */}
          {activeTab === 'commissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">
                  Real-time ledger of all 3% commissions automatically credited to your store:
                </span>
                <button
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer"
                >
                  Withdraw Available Funds (${storeWallet.availableBalance.toFixed(2)}) →
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-3">Order ID / Time</th>
                      <th className="py-2.5 px-3">Platform</th>
                      <th className="py-2.5 px-3">Product Sold</th>
                      <th className="py-2.5 px-3">Buyer & Location</th>
                      <th className="py-2.5 px-3">Sale Total</th>
                      <th className="py-2.5 px-3 text-right">3% Commission Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {commissionRecords.map((record, idx) => (
                      <tr key={`${record.id || 'com'}-${idx}`} className="hover:bg-amber-50/40 transition">
                        <td className="py-3 px-3">
                          <div className="font-mono font-bold text-gray-900">{record.orderId}</div>
                          <div className="text-[11px] text-gray-400">{record.timestamp}</div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded text-white ${
                              record.platform === 'Amazon'
                                ? 'bg-amber-600'
                                : record.platform === 'Alibaba'
                                ? 'bg-orange-600'
                                : record.platform === 'Shopify'
                                ? 'bg-emerald-600'
                                : 'bg-gray-700'
                            }`}
                          >
                            {record.platform}
                          </span>
                        </td>

                        <td className="py-3 px-3 max-w-[200px]">
                          <div className="flex items-center space-x-2">
                            <img
                              src={record.productImage}
                              alt={record.productTitle}
                              className="w-8 h-8 object-contain rounded bg-gray-50 border border-gray-200 p-0.5 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <span className="font-semibold text-gray-900 truncate" title={record.productTitle}>
                              {record.productTitle}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-medium text-gray-900">{record.buyerName}</div>
                          <div className="text-[11px] text-gray-400">{record.buyerLocation}</div>
                        </td>

                        <td className="py-3 px-3 font-semibold text-gray-700">
                          ${record.saleAmount.toFixed(2)}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <span className="bg-emerald-100 text-emerald-800 font-extrabold px-2 py-1 rounded text-xs">
                            +${record.commissionEarned.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-5 py-3.5 border-t border-gray-200 flex items-center justify-between text-xs">
          <div className="text-gray-500">
            Automated 3% commission credited with <strong>0 monthly fees</strong> to your store.
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsMarketSyncModalOpen(false);
                setIsStoreOneLinkModalOpen(true);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              My Store One-Link
            </button>

            <button
              onClick={() => setIsMarketSyncModalOpen(false)}
              className="bg-[#131921] hover:bg-[#232f3e] text-white font-bold px-4 py-1.5 rounded-lg transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
