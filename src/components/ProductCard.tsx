import React from 'react';
import { Star, Check, Zap, ShoppingCart, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { useMarketplace } from '../context/MarketplaceContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForDetail, toggleFlashSale } = useMarketplace();

  // Price calculation
  const intPart = Math.floor(product.price);
  const decPart = Math.round((product.price - intPart) * 100).toString().padStart(2, '0');

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : product.flashDealDiscount || 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-white rounded-md border border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group relative"
    >
      {/* Top Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 items-start">
        {product.marketPlatform && product.marketPlatform !== 'AmazeFree' && (
          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm flex items-center text-white ${
              product.marketPlatform === 'Amazon'
                ? 'bg-[#131921] border border-amber-400'
                : product.marketPlatform === 'Alibaba'
                ? 'bg-[#ff6000]'
                : product.marketPlatform === 'Shopify'
                ? 'bg-[#008060]'
                : 'bg-indigo-600'
            }`}
          >
            {product.marketPlatform} • 3% Com.
          </span>
        )}

        {product.isBestSeller && (
          <span className="bg-[#e67a00] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
            #1 Best Seller
          </span>
        )}

        {product.isFlashDeal && (
          <span className="bg-[#cc0c39] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm flex items-center">
            <Zap className="w-3 h-3 mr-0.5 fill-white" />
            Limited Time Deal
          </span>
        )}

        {product.isSellerProduct && (
          <span className="bg-emerald-700 text-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-amber-300" />
            My Store Product
          </span>
        )}
      </div>

      {/* Product Image */}
      <div
        onClick={() => setSelectedProductForDetail(product)}
        className="relative bg-gray-50 p-4 aspect-square flex items-center justify-center overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Quick look overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center">
            <Eye className="w-3.5 h-3.5 mr-1" /> Quick View
          </span>
        </div>
      </div>

      {/* Content details */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] text-gray-500 font-medium mb-1 truncate">
            {product.category}
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-[#007185] cursor-pointer mb-1.5 leading-snug"
            title={product.title}
          >
            {product.title}
          </h3>

          {/* Rating stars & review count */}
          <div className="flex items-center space-x-1.5 mb-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : i < product.rating
                      ? 'fill-amber-400/50 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gray-700">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price display (Amazon format) */}
          <div className="mb-2">
            <div className="flex items-baseline space-x-1.5">
              {discountPercent > 0 && (
                <span className="text-red-700 font-normal text-sm sm:text-base">
                  -{discountPercent}%
                </span>
              )}

              <div className="flex items-start text-gray-900">
                <span className="text-xs font-normal mt-0.5">$</span>
                <span className="text-2xl font-bold tracking-tight">{intPart}</span>
                <span className="text-xs font-normal mt-0.5">{decPart}</span>
              </div>

              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Free shipping prime check */}
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <span className="font-extrabold text-[#007185] flex items-center mr-1">
                <Check className="w-3.5 h-3.5 mr-0.5 text-amber-500 stroke-[3]" />
                prime
              </span>
              <span>FREE Delivery</span>
              <strong className="text-gray-800 ml-1">Tomorrow</strong>
            </div>

            {/* 3% Commission indicator for external markets */}
            {product.marketPlatform && product.marketPlatform !== 'AmazeFree' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded px-2 py-0.5 mt-1.5 text-[11px] text-emerald-800 font-bold flex items-center justify-between">
                <span>💰 3% Store Commission:</span>
                <span className="text-emerald-700 font-black">
                  +${((product.price * 0.03)).toFixed(2)} on sale
                </span>
              </div>
            )}

            {/* Stock status */}
            {product.stock <= 5 && product.stock > 0 && (
              <div className="text-[11px] text-red-700 font-medium mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Only {product.stock} left in stock - order soon.
              </div>
            )}
            {product.stock === 0 && (
              <div className="text-[11px] text-red-600 font-bold mt-1">
                Currently Out of Stock
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col gap-1.5">
          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className={`w-full py-2 px-3 rounded-full text-xs font-bold transition shadow-sm flex items-center justify-center space-x-1.5 ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] text-gray-900 cursor-pointer border border-[#fcd200]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>

          {/* If it's the seller's product, provide a quick flash deal toggle */}
          {product.isSellerProduct && (
            <button
              id={`toggle-deal-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFlashSale(product.id, 30);
              }}
              className="text-[11px] text-indigo-700 hover:text-indigo-900 font-semibold text-center hover:underline py-0.5 cursor-pointer flex items-center justify-center"
            >
              <Zap className="w-3 h-3 mr-1 text-amber-500" />
              {product.isFlashDeal ? 'Remove Flash Deal' : 'Turn On 30% Flash Deal'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
