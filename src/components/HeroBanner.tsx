import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Zap, ChevronLeft, ChevronRight, ArrowRight, Store, CheckCircle2, Lock, Download, Globe } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const {
    setIsAddProductOpen,
    setIsFreeGuaranteeOpen,
    triggerAutomatedStoreSale,
    setActiveView,
    setIsDownloadAppOpen,
    setIsAppStorePublishOpen,
    storeBranding,
  } = useMarketplace();

  const slides = [
    {
      id: 'slide-pro-store',
      title: `${storeBranding.storeName || 'Ameez Store Pro'} — Global Marketplace & Brands Hub`,
      subtitle: 'Sell your products, link Amazon, Alibaba & Shopify for 3% commissions, and download the official app to shop anywhere.',
      badge: 'Official Pro Store • Big Market Hub',
      gradient: 'from-amber-700 via-amber-900 to-gray-900',
      ctaPrimary: { label: 'Download Store App', action: () => setIsDownloadAppOpen(true) },
      ctaSecondary: { label: 'Publish All Websites', action: () => setIsAppStorePublishOpen(true) },
      icon: Download,
    },
    {
      id: 'slide-auto-sale',
      title: 'Automatic 3% Commission & Flash Deals Engine',
      subtitle: 'Trigger instant flash deals up to 50% off with automated sales and 3% Big Market earnings credited straight to your app wallet.',
      badge: 'Automated Sales & Commission Machine',
      gradient: 'from-indigo-900 via-purple-900 to-gray-900',
      ctaPrimary: { label: '🔥 Trigger 30% Flash Sale', action: () => triggerAutomatedStoreSale(30) },
      ctaSecondary: { label: 'Open Seller Hub', action: () => setActiveView('seller-hub') },
      icon: Zap,
    },
    {
      id: 'slide-secure',
      title: 'Bank-Grade 256-Bit Encrypted Secure Checkout',
      subtitle: 'Zero risk, protected credit cards, PIN code lock security, and lightning-fast delivery tracking on every order.',
      badge: 'Encrypted & Safe Guarantee',
      gradient: 'from-emerald-900 via-teal-950 to-gray-900',
      ctaPrimary: { label: 'Shop Verified Deals', action: () => setActiveView('marketplace') },
      ctaSecondary: { label: 'Pro Store Guarantee', action: () => setIsFreeGuaranteeOpen(true) },
      icon: Lock,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden shadow-inner">
      {/* Background gradient */}
      <div
        className={`w-full bg-gradient-to-r ${slide.gradient} transition-all duration-700 ease-in-out py-8 sm:py-12 px-4 sm:px-8`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl text-left space-y-3">
            {/* Top pill badge */}
            <div className="inline-flex items-center space-x-1.5 bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-amber-300">
              <IconComponent className="w-3.5 h-3.5 text-amber-400" />
              <span>{slide.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-gray-200 leading-relaxed drop-shadow">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id={`hero-cta-primary-${slide.id}`}
                onClick={slide.ctaPrimary.action}
                className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold px-5 py-2.5 rounded-md text-sm shadow-md transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer flex items-center"
              >
                <span>{slide.ctaPrimary.label}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>

              <button
                id={`hero-cta-secondary-${slide.id}`}
                onClick={slide.ctaSecondary.action}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-4 py-2.5 rounded-md text-sm backdrop-blur-sm transition cursor-pointer"
              >
                {slide.ctaSecondary.label}
              </button>
            </div>

            {/* Trust highlights */}
            <div className="flex items-center space-x-4 pt-2 text-xs text-gray-300">
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mr-1" />
                3% Commission Payout
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                256-Bit TLS Security
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mr-1" />
                Download App Ready
              </span>
            </div>
          </div>

          {/* Right visual card showcase */}
          <div className="hidden lg:flex flex-col items-center justify-center p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl max-w-xs text-center">
            <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center mb-3">
              <Store className="w-6 h-6 text-amber-400" />
            </div>
            <div className="font-bold text-white text-base">{storeBranding.storeName || 'Ameez Store Pro'}</div>
            <p className="text-xs text-gray-300 mt-1">
              Official marketplace, Big Market 3% links, and 1-click installable app for all shoppers.
            </p>
            <button
              id="hero-open-workshop-card"
              onClick={() => setActiveView('seller-hub')}
              className="mt-3 w-full bg-amber-400 hover:bg-amber-300 text-gray-950 py-1.5 px-3 rounded text-xs font-black cursor-pointer shadow transition"
            >
              Open Seller Workshop →
            </button>
          </div>
        </div>
      </div>

      {/* Slider nav arrows */}
      <button
        id="hero-prev-slide-btn"
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm cursor-pointer z-20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        id="hero-next-slide-btn"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm cursor-pointer z-20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
              currentSlide === idx ? 'bg-amber-400 w-5' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
