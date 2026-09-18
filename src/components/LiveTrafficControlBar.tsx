import React from 'react';
import { Users, TrendingUp, Zap, ShoppingBag, DollarSign, Play, Pause, Flame } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const LiveTrafficControlBar: React.FC = () => {
  const {
    trafficMode,
    setTrafficMode,
    liveShoppersCount,
    sellerStats,
    triggerInstantSale,
    setActiveView,
  } = useMarketplace();

  return (
    <section className="bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 text-white border-b border-indigo-800 shadow-sm py-2 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs">
        {/* Left: Traffic status */}
        <div className="flex items-center space-x-2.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  trafficMode === 'off' ? 'bg-gray-400' : trafficMode === 'frenzy' ? 'bg-red-400' : 'bg-emerald-400'
                }`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  trafficMode === 'off' ? 'bg-gray-500' : trafficMode === 'frenzy' ? 'bg-red-500' : 'bg-emerald-500'
                }`}
              ></span>
            </span>
            <div className="flex items-center">
              <Users className="w-4 h-4 text-emerald-400 mr-1.5" />
              <span className="font-bold text-white text-sm">{liveShoppersCount} Shoppers</span>
              <span className="text-gray-300 ml-1.5 hidden sm:inline">flooding your marketplace & buying</span>
            </div>
          </div>

          {/* Quick trigger button */}
          <button
            id="traffic-trigger-instant-btn"
            onClick={triggerInstantSale}
            className="flex items-center bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded font-bold transition shadow-sm cursor-pointer active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 mr-1 text-amber-300 fill-amber-300" />
            <span>Simulate Sale Now!</span>
          </button>
        </div>

        {/* Center: Live Stats ticker */}
        <div className="flex items-center space-x-4 bg-black/40 px-3 py-1 rounded-full border border-gray-700/60">
          <div className="flex items-center text-gray-300">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400 mr-0.5" />
            <span>Revenue: </span>
            <span className="font-extrabold text-emerald-400 ml-1">
              ${sellerStats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <span className="text-gray-600">|</span>
          <div
            onClick={() => setActiveView('orders')}
            className="flex items-center text-gray-300 hover:text-amber-400 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400 mr-1" />
            <span>Orders: </span>
            <strong className="text-white ml-1">{sellerStats.totalOrders}</strong>
          </div>
          <span className="text-gray-600">|</span>
          <div className="flex items-center text-gray-300">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400 mr-1" />
            <span>Sold: </span>
            <strong className="text-white ml-1">{sellerStats.totalUnitsSold} units</strong>
          </div>
        </div>

        {/* Right: Traffic Speed controller */}
        <div className="flex items-center space-x-1.5 w-full md:w-auto justify-end">
          <span className="text-gray-400 text-[11px] mr-1 hidden lg:inline">Live Shoppers Mode:</span>
          <button
            id="traffic-mode-steady"
            onClick={() => setTrafficMode('normal')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
              trafficMode === 'normal'
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Steady
          </button>
          <button
            id="traffic-mode-rush"
            onClick={() => setTrafficMode('rush')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
              trafficMode === 'rush'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Rush Hour
          </button>
          <button
            id="traffic-mode-frenzy"
            onClick={() => setTrafficMode('frenzy')}
            className={`flex items-center px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
              trafficMode === 'frenzy'
                ? 'bg-red-600 text-white font-bold animate-pulse'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title="Max traffic: Lots of people constantly buying your products!"
          >
            <Flame className="w-3 h-3 mr-0.5" />
            Frenzy!
          </button>
          <button
            id="traffic-mode-pause"
            onClick={() => setTrafficMode(trafficMode === 'off' ? 'normal' : 'off')}
            className="p-1 text-gray-400 hover:text-white rounded bg-gray-800 cursor-pointer"
            title={trafficMode === 'off' ? 'Resume Live Traffic' : 'Pause Live Traffic'}
          >
            {trafficMode === 'off' ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </section>
  );
};
