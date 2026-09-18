import React, { useMemo } from 'react';
import {
  SlidersHorizontal,
  Zap,
  Sparkles,
  ArrowUpDown,
  Search,
  Check,
  Package,
  Plus
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from './ProductCard';
import { HeroBanner } from './HeroBanner';
import { ProductCategory } from '../types';

export const MarketplaceCatalog: React.FC = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    setIsAddProductOpen,
    triggerAutomatedStoreSale,
    executeDirectSearch,
    aiAgentsState,
    setIsAiAgentsModalOpen,
    triggerAiAddTrendingProducts,
    triggerAiFastSales,
  } = useMarketplace();

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory === 'My Custom Products' && !p.isSellerProduct) {
        return false;
      }
      if (
        selectedCategory !== 'All' &&
        selectedCategory !== 'My Custom Products' &&
        p.category !== selectedCategory
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchCat = p.category.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        return matchTitle || matchCat || matchDesc;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') {
        const discA = a.flashDealDiscount || 0;
        const discB = b.flashDealDiscount || 0;
        return discB - discA;
      }
      // 'featured'
      return (b.salesCount || 0) - (a.salesCount || 0);
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

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
    <div className="space-y-6">
      {/* Hero Banner Carousel */}
      {!searchQuery && selectedCategory === 'All' && <HeroBanner />}

      {/* Main Catalog Container */}
      <div id="products-catalog-section" className="max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-4">
        {/* AI Autonomous Agents Live Strip */}
        <div className="bg-gradient-to-r from-[#0d1627] via-[#12223f] to-[#182b52] text-white rounded-xl p-3 sm:p-3.5 shadow-md border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xs sm:text-sm text-white">
                  AI Autonomous Agents Active
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase">
                  {aiAgentsState.isAutoPilotActive ? 'AutoPilot ON' : 'Paused'}
                </span>
              </div>
              <p className="text-[11px] text-cyan-200/80 mt-0.5">
                Auto-Sourcing Products &bull; High-Velocity Faast Sales &bull; 3% Commission credited to your account
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap text-xs">
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="text-gray-300 text-[11px]">3% Earned:</span>
              <strong className="text-emerald-400 font-black">${aiAgentsState.totalCommissionsHarvested.toFixed(2)}</strong>
            </div>

            <button
              id="catalog-ai-add-products-btn"
              onClick={() => triggerAiAddTrendingProducts(1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg shadow-xs transition cursor-pointer flex items-center space-x-1"
              title="AI Sourcing Agent: Adds trending products from Amazon, Alibaba & Shopify"
            >
              <Plus className="w-3 h-3" />
              <span>AI +1 Product</span>
            </button>

            <button
              id="catalog-ai-fast-sales-btn"
              onClick={() => triggerAiFastSales(1)}
              className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-black px-2.5 py-1 rounded-lg shadow-xs transition cursor-pointer flex items-center space-x-1"
              title="Flash Sales Closer: Closes instant sales with 3% commission to your account"
            >
              <Zap className="w-3 h-3" />
              <span>AI Faast Sale</span>
            </button>

            <button
              id="catalog-ai-open-hub-btn"
              onClick={() => setIsAiAgentsModalOpen(true)}
              className="bg-white/15 hover:bg-white/25 text-white font-bold px-2.5 py-1 rounded-lg border border-white/20 shadow-xs transition cursor-pointer"
            >
              AI Control Room &rarr;
            </button>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center space-x-1.5 flex-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => executeDirectSearch(undefined, cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#131921] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat === 'My Custom Products' ? '✨ My Store Items' : cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddProductOpen(true)}
            className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-full whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>+ Sell Your Item Free</span>
          </button>
        </div>

        {/* Filter and Results Meta Bar */}
        <div className="bg-white rounded-md border border-gray-200 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-600 shadow-2xs">
          <div>
            <span>Showing </span>
            <strong className="text-gray-900">{filteredProducts.length}</strong>
            <span> results for </span>
            <strong className="text-gray-900">
              "{searchQuery ? searchQuery : selectedCategory}"
            </strong>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick deals only toggle */}
            <button
              onClick={() => triggerAutomatedStoreSale(25)}
              className="flex items-center text-red-700 hover:text-red-900 font-semibold cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
              <span>Trigger 25% Automated Sale</span>
            </button>

            {/* Sort By selector */}
            <div className="flex items-center space-x-1.5">
              <label htmlFor="sort-by-select" className="text-gray-500 font-medium flex items-center">
                <ArrowUpDown className="w-3.5 h-3.5 mr-1" />
                Sort:
              </label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 font-semibold cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="discount">Biggest Discount %</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center my-6">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-base font-bold text-gray-800 mb-1">No products match your search</h3>
            <p className="text-xs text-gray-500 mb-4">
              Try adjusting your keywords, selecting "All" categories, or add your own product to sell for free!
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-full text-xs cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 font-bold px-4 py-2 rounded-full text-xs shadow-sm cursor-pointer"
              >
                + Add New Product to Sell
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
