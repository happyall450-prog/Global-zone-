import React, { useState } from 'react';
import {
  X,
  Sparkles,
  DollarSign,
  Upload,
  Image as ImageIcon,
  Tag,
  Zap,
  Check,
  ShieldCheck,
  PackagePlus
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCategory } from '../types';
import { PRESET_PRODUCT_IMAGES } from '../data/initialProducts';

export const AddProductModal: React.FC = () => {
  const { isAddProductOpen, setIsAddProductOpen, addProduct } = useMarketplace();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Electronics');
  const [price, setPrice] = useState('49.99');
  const [originalPrice, setOriginalPrice] = useState('89.99');
  const [stock, setStock] = useState('50');
  const [imageUrl, setImageUrl] = useState(PRESET_PRODUCT_IMAGES[0].url);
  const [description, setDescription] = useState(
    'Premium quality craftsmanship designed for ultimate performance and daily durability.'
  );
  const [feature1, setFeature1] = useState('Engineered with premium durable materials');
  const [feature2, setFeature2] = useState('Fast charging with extended battery life');
  const [feature3, setFeature3] = useState('Universal compatibility with 1-year replacement warranty');
  const [enableFlashDeal, setEnableFlashDeal] = useState(true);
  const [dealDiscount, setDealDiscount] = useState('35');

  if (!isAddProductOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const parsedPrice = parseFloat(price) || 19.99;
    const parsedOriginal = parseFloat(originalPrice) || parsedPrice * 1.4;
    const parsedStock = parseInt(stock, 10) || 25;
    const parsedDiscount = parseInt(dealDiscount, 10) || 30;

    const finalPrice = enableFlashDeal
      ? parseFloat((parsedOriginal * (1 - parsedDiscount / 100)).toFixed(2))
      : parsedPrice;

    addProduct({
      title: title.trim(),
      category,
      price: finalPrice,
      originalPrice: parsedOriginal,
      image: imageUrl,
      description: description.trim(),
      features: [feature1, feature2, feature3].filter(Boolean),
      stock: parsedStock,
      isFlashDeal: enableFlashDeal,
      flashDealDiscount: enableFlashDeal ? parsedDiscount : 0,
      dealEndsInSeconds: enableFlashDeal ? 86400 : 0,
      isBestSeller: true,
      freeShipping: true,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="add-product-modal-panel"
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-[#131921] text-white px-5 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <PackagePlus className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-bold text-base">Add Product to Your Online Workshop</h2>
              <p className="text-[11px] text-emerald-400 font-medium">
                100% Free Listing • Never pay monthly fees • 0% commission
              </p>
            </div>
          </div>
          <button
            id="close-add-product-btn"
            onClick={() => setIsAddProductOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Product Title */}
          <div>
            <label className="block text-gray-800 font-bold mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. UltraFit Wireless Earbuds with Touch Control & Waterproof Case"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-bold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-white cursor-pointer focus:outline-none"
              >
                <option value="Electronics">Electronics</option>
                <option value="Gadgets & Accessories">Gadgets & Accessories</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Fashion & Apparel">Fashion & Apparel</option>
                <option value="Health & Beauty">Health & Beauty</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
                <option value="My Custom Products">My Custom Products</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-1">Initial Stock Inventory</label>
              <input
                type="number"
                min="1"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="50"
              />
            </div>
          </div>

          {/* Pricing & Automatic Flash Sale */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 flex items-center">
                <Zap className="w-4 h-4 text-amber-500 mr-1 fill-amber-500" />
                Automatic Sale & Pricing Engine
              </span>
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableFlashDeal}
                  onChange={(e) => setEnableFlashDeal(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4 cursor-pointer"
                />
                <span className="text-xs font-semibold text-gray-800">Launch with Flash Deal</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Regular List Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.99"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white"
                  placeholder="89.99"
                />
              </div>

              {enableFlashDeal ? (
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Automated Discount (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    value={dealDiscount}
                    onChange={(e) => setDealDiscount(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white font-bold text-red-600"
                    placeholder="35"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white"
                    placeholder="49.99"
                  />
                </div>
              )}

              <div className="flex flex-col justify-center">
                <span className="text-gray-500 text-[11px]">Final Buyer Price:</span>
                <span className="text-lg font-extrabold text-emerald-700">
                  $
                  {enableFlashDeal
                    ? (
                        (parseFloat(originalPrice) || 0) *
                        (1 - (parseInt(dealDiscount, 10) || 0) / 100)
                      ).toFixed(2)
                    : (parseFloat(price) || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Product Image Selection */}
          <div>
            <label className="block text-gray-700 font-bold mb-1.5">Product Photo</label>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-gray-500 text-[11px]">Quick Presets:</span>
              {PRESET_PRODUCT_IMAGES.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => setImageUrl(preset.url)}
                  className={`px-2 py-1 rounded text-[11px] border cursor-pointer transition ${
                    imageUrl === preset.url
                      ? 'border-amber-500 bg-amber-100 font-bold text-amber-900'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste an image URL from the web..."
                className="flex-1 border border-gray-300 rounded px-3 py-1.5"
              />
              <label className="bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-1.5 rounded cursor-pointer flex items-center space-x-1 text-gray-700">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            {/* Preview image */}
            {imageUrl && (
              <div className="mt-2 flex items-center space-x-3 bg-gray-50 p-2 rounded border border-gray-200">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-14 h-14 object-contain bg-white rounded border border-gray-200"
                  referrerPolicy="no-referrer"
                />
                <div className="text-[11px] text-gray-600">
                  Image preview active. Will display on Amazon-style product cards with high-res zoom.
                </div>
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="space-y-1.5">
            <label className="block text-gray-700 font-bold">Key Bullet Features (Amazon style)</label>
            <input
              type="text"
              value={feature1}
              onChange={(e) => setFeature1(e.target.value)}
              placeholder="Feature bullet #1"
              className="w-full border border-gray-300 rounded px-3 py-1.5"
            />
            <input
              type="text"
              value={feature2}
              onChange={(e) => setFeature2(e.target.value)}
              placeholder="Feature bullet #2"
              className="w-full border border-gray-300 rounded px-3 py-1.5"
            />
            <input
              type="text"
              value={feature3}
              onChange={(e) => setFeature3(e.target.value)}
              placeholder="Feature bullet #3"
              className="w-full border border-gray-300 rounded px-3 py-1.5"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-bold mb-1">Product Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-1.5"
            />
          </div>

          {/* Bottom fee notice & submit */}
          <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center text-emerald-700 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
              <span>Listing Fee: $0.00 • Monthly Fee: $0.00 • Commission: 0%</span>
            </div>

            <button
              id="publish-product-btn"
              type="submit"
              className="w-full sm:w-auto bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-bold px-6 py-2.5 rounded-full text-xs shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-[#fcd200]"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>List Product for Free & Start Selling</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
