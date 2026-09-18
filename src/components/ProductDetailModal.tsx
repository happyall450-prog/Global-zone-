import React, { useState } from 'react';
import {
  X,
  Star,
  Check,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  CreditCard,
  Sparkles,
  Share2,
  Heart
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    setIsCheckoutOpen,
  } = useMarketplace();

  const [selectedQty, setSelectedQty] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    setSelectedProductForDetail(null);
    setIsCheckoutOpen(true);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : product.flashDealDiscount || 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div
        id="product-detail-modal-card"
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Close Button */}
        <button
          id="close-product-detail-btn"
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-3 right-3 z-20 p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Image */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full bg-gray-50 rounded-lg p-6 flex items-center justify-center border border-gray-200 aspect-square relative">
              {product.isFlashDeal && (
                <div className="absolute top-3 left-3 bg-[#cc0c39] text-white text-xs font-bold px-2.5 py-1 rounded shadow flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-1 fill-white" />
                  Limited Time Deal (-{discountPercent}%)
                </div>
              )}
              {product.isSellerProduct && (
                <div className="absolute bottom-3 left-3 bg-emerald-700 text-white text-xs font-semibold px-2 py-0.5 rounded flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
                  Direct From Your Store
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="max-h-72 object-contain hover:scale-105 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Share */}
            <div className="flex items-center space-x-4 mt-4 text-xs text-gray-500">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  setCopiedLink(true);
                  setTimeout(() => setCopiedLink(false), 2000);
                }}
                className="flex items-center hover:text-gray-900 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 mr-1" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
              </button>
              <span>•</span>
              <span className="flex items-center text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                Verified Authentic
              </span>
            </div>
          </div>

          {/* Center Column: Details & Specs */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs text-[#007185] font-semibold hover:underline cursor-pointer mb-1">
                {product.isSellerProduct ? 'Visit Store: Your Official Shop' : `Brand: AmazePro ${product.category}`}
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2">
                {product.title}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center space-x-2 pb-3 border-b border-gray-200">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-800">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-[#007185] hover:underline cursor-pointer">
                  {product.reviewCount.toLocaleString()} ratings
                </span>
              </div>

              {/* Price block */}
              <div className="py-3 border-b border-gray-200">
                <div className="flex items-baseline space-x-2">
                  {discountPercent > 0 && (
                    <span className="text-red-700 font-normal text-lg">
                      -{discountPercent}%
                    </span>
                  )}
                  <span className="text-2xl font-extrabold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="text-xs text-gray-500 mt-0.5">
                    Typical price: <span className="line-through">${product.originalPrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="text-xs text-gray-600 mt-1 flex items-center">
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  No hidden checkout fees or surcharges
                </div>
              </div>

              {/* About this item (Feature bullets) */}
              <div className="py-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  About this item
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-700 list-disc list-inside">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-2.5 rounded border border-gray-200">
                {product.description}
              </p>
            </div>
          </div>

          {/* Right Column: Amazon Buy Box */}
          <div className="md:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="text-2xl font-extrabold text-gray-900 mb-1">
                  ${(product.price * selectedQty).toFixed(2)}
                </div>

                <div className="text-xs text-gray-700 space-y-1 mb-3">
                  <div className="flex items-center text-emerald-700 font-semibold">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    FREE Delivery
                  </div>
                  <div>
                    Estimated arrival: <strong className="text-gray-900">Tomorrow</strong>
                  </div>
                  <div className="text-gray-500 text-[11px]">
                    Ships from & sold by:{' '}
                    <strong>
                      {product.isSellerProduct
                        ? 'Your Store ($0 fees)'
                        : product.marketPlatform && product.marketPlatform !== 'AmazeFree'
                        ? `${product.marketPlatform} Direct (3% Store Commission)`
                        : 'AmazeFree Official'}
                    </strong>
                  </div>

                  {product.marketPlatform && product.marketPlatform !== 'AmazeFree' && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-emerald-800 text-xs font-bold space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span>3% Store Commission:</span>
                        <span className="text-emerald-700 text-sm font-black">
                          +${(product.price * selectedQty * 0.03).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[10px] text-emerald-600 font-normal">
                        Automatically deposited into your store wallet when purchased.
                      </div>
                    </div>
                  )}
                </div>

                {/* Stock status */}
                {product.stock > 0 ? (
                  <div className="text-emerald-700 font-bold text-sm mb-3">
                    In Stock ({product.stock} available)
                  </div>
                ) : (
                  <div className="text-red-600 font-bold text-sm mb-3">
                    Currently Out of Stock
                  </div>
                )}

                {/* Quantity selector */}
                {product.stock > 0 && (
                  <div className="flex items-center space-x-2 mb-4">
                    <label htmlFor="detail-qty-select" className="text-xs text-gray-600 font-medium">
                      Quantity:
                    </label>
                    <select
                      id="detail-qty-select"
                      value={selectedQty}
                      onChange={(e) => setSelectedQty(Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1 text-xs bg-gray-50 cursor-pointer focus:outline-none"
                    >
                      {[...Array(Math.min(10, product.stock))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={() => {
                    addToCart(product, selectedQty);
                    setSelectedProductForDetail(null);
                  }}
                  disabled={product.stock === 0}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-bold shadow-sm transition flex items-center justify-center space-x-1.5 ${
                    product.stock === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-900 cursor-pointer border border-[#fcd200]'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-bold shadow-sm transition flex items-center justify-center space-x-1.5 ${
                    product.stock === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-[#ffa41c] hover:bg-[#fa8900] text-gray-900 cursor-pointer border border-[#ff8f00]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="border-t border-gray-200 pt-3 space-y-2 text-[11px] text-gray-600">
                <div className="flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1.5 flex-shrink-0" />
                  <span>256-Bit SSL Secure Simulated Transaction</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-600 mr-1.5 flex-shrink-0" />
                  <span>Returnable within 30 days of receipt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
