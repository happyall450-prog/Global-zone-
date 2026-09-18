import React from 'react';
import {
  Crown,
  Zap,
  ShieldCheck,
  Gem,
  Rocket,
  ShoppingBag,
  Sparkles,
  CheckCircle,
  Star
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { StoreLogoStyle } from '../types';

interface StoreLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  showRatingBadge?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StoreLogo: React.FC<StoreLogoProps> = ({
  size = 'md',
  showTagline = true,
  showRatingBadge = false,
  onClick,
  className = '',
}) => {
  const { storeBranding, setIsStoreLogoStudioOpen } = useMarketplace();

  const renderIcon = (style: StoreLogoStyle, iconSizeClass: string) => {
    switch (style) {
      case 'crown-apex':
        return <Crown className={iconSizeClass} />;
      case 'spark-cart':
        return <Zap className={iconSizeClass} />;
      case 'shield-vault':
        return <ShieldCheck className={iconSizeClass} />;
      case 'diamond-gem':
        return <Gem className={iconSizeClass} />;
      case 'rocket-fast':
        return <Rocket className={iconSizeClass} />;
      case 'modern-monogram':
      default:
        return <ShoppingBag className={iconSizeClass} />;
    }
  };

  const getContainerSizes = () => {
    switch (size) {
      case 'sm':
        return {
          iconBox: 'w-7 h-7 text-xs',
          iconSize: 'w-4 h-4',
          title: 'text-sm font-extrabold',
          subtitle: 'text-[9px]',
          gap: 'space-x-2',
        };
      case 'lg':
        return {
          iconBox: 'w-12 h-12 text-base',
          iconSize: 'w-6 h-6',
          title: 'text-2xl font-black',
          subtitle: 'text-xs',
          gap: 'space-x-3.5',
        };
      case 'md':
      default:
        return {
          iconBox: 'w-9 h-9 text-sm',
          iconSize: 'w-5 h-5',
          title: 'text-lg font-black',
          subtitle: 'text-[10px]',
          gap: 'space-x-2.5',
        };
    }
  };

  const s = getContainerSizes();

  return (
    <div
      onClick={onClick}
      className={`flex items-center ${s.gap} cursor-pointer group select-none ${className}`}
      title="Store Logo • Click to customize in Store Logo Studio"
    >
      {/* Visual Logo Emblem */}
      <div className="relative">
        <div
          className={`${s.iconBox} rounded-xl flex items-center justify-center text-white shadow-md relative overflow-hidden transition-transform group-hover:scale-105`}
          style={{
            background: `linear-gradient(135deg, ${storeBranding.brandColor || '#f59e0b'}, #b45309)`,
          }}
        >
          {storeBranding.customLogoUrl ? (
            <img
              src={storeBranding.customLogoUrl}
              alt={storeBranding.storeName}
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          ) : (
            renderIcon(storeBranding.logoStyle, s.iconSize)
          )}
          {/* Subtle glossy sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        </div>

        {/* Small verified checkmark pip */}
        {storeBranding.verifiedStoreBadge && (
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-sm border border-[#131921]">
            <CheckCircle className="w-2.5 h-2.5" />
          </div>
        )}
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center space-x-1.5">
          <span className={`${s.title} text-white tracking-tight group-hover:text-amber-300 transition-colors flex items-center`}>
            {storeBranding.storeName || 'Global Zone Global'}
          </span>
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider hidden sm:inline-block shadow-xs border border-amber-300">
            GLOBAL
          </span>
        </div>

        {showTagline && (
          <div className={`flex items-center ${s.subtitle} text-gray-300 font-medium tracking-wide mt-0.5`}>
            <span className="truncate max-w-[200px] sm:max-w-[280px]">
              {storeBranding.storeTagline || 'Global Marketplace, Verified Brands & 3% Commission Hub'}
            </span>
          </div>
        )}

        {showRatingBadge && (
          <div className="flex items-center space-x-1 mt-1">
            <div className="flex items-center text-amber-400 text-[10px] font-bold">
              <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
              <span>{storeBranding.customerRating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-gray-400">
              ({storeBranding.customerReviewCount.toLocaleString()} shoppers admire this store)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
