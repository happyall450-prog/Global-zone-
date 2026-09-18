export type ProductCategory =
  | 'All'
  | 'Electronics'
  | 'Fashion & Apparel'
  | 'Home & Kitchen'
  | 'Gadgets & Accessories'
  | 'Health & Beauty'
  | 'Sports & Outdoors'
  | 'My Custom Products';

export type MarketPlatform =
  | 'Amazon'
  | 'Alibaba'
  | 'Shopify'
  | 'AliExpress'
  | 'eBay'
  | 'Walmart'
  | 'AmeezStore'
  | 'AmazeFree';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  stock: number;
  isSellerProduct?: boolean;
  isFlashDeal?: boolean;
  flashDealDiscount?: number; // percentage
  dealEndsInSeconds?: number;
  isBestSeller?: boolean;
  freeShipping?: boolean;
  salesCount: number;
  marketPlatform?: MarketPlatform;
  commissionRate?: number; // Default 3%
  commissionAmount?: number;
  externalUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  paymentMethod: 'Credit Card' | 'PayPal' | 'Apple Pay' | 'Cash on Delivery';
  createdAt: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  isSimulatedSale?: boolean;
  storeRecipientMethod?: string;
  creditedToStore?: boolean;
  commissionEarned?: number;
  commissionRate?: number;
  marketPlatform?: MarketPlatform;
}

export type StorePaymentType = 'bank' | 'paypal' | 'debit_card' | 'cashapp' | 'crypto';

export interface StorePaymentMethod {
  id: string;
  type: StorePaymentType;
  title: string; // e.g. "Chase Bank Checking (••••4829)"
  accountHolder: string;
  accountDetails: string; // e.g. "Routing: 121000358 • Acct: ••••4829"
  isPrimary: boolean;
  addedAt: string;
  status?: 'Verified' | 'Active';
}

export interface PayoutTransaction {
  id: string;
  amount: number;
  destinationMethodTitle: string;
  status: 'Completed' | 'Processing';
  date: string;
  referenceId: string;
}

export interface StoreWallet {
  availableBalance: number;
  pendingBalance: number;
  totalWithdrawn: number;
  autoPayoutEnabled: boolean;
  totalCommissionEarned: number;
  commissionSalesCount: number;
}

export interface LinkedMarketplace {
  id: string;
  platform: MarketPlatform;
  name: string;
  description: string;
  isConnected: boolean;
  commissionRate: number; // e.g. 3 (%)
  productsSyncedCount: number;
  totalEarned: number;
  accountIdOrTag: string;
  connectedAt: string;
  badgeColor: string;
  logoText: string;
}

export interface CommissionRecord {
  id: string;
  orderId: string;
  productTitle: string;
  productImage: string;
  saleAmount: number;
  commissionRate: number; // 3%
  commissionEarned: number;
  platform: MarketPlatform;
  buyerName: string;
  buyerLocation: string;
  timestamp: string;
  status: 'Credited to Store' | 'Settled';
}

export interface StoreOneLinkInfo {
  storeSlug: string;
  storeName: string;
  storeUrl: string;
  ownerEmail: string;
  embedCode: string;
  iframeCode: string;
  totalClicks: number;
  totalLinkSales: number;
}

export interface BuyerActivity {
  id: string;
  buyerName: string;
  city: string;
  country: string;
  productTitle: string;
  productImage: string;
  quantity: number;
  amount: number;
  timestamp: string;
  action: 'purchased' | 'viewing' | 'added_to_cart';
  creditedToStore?: boolean;
  commissionEarned?: number;
  marketPlatform?: MarketPlatform;
}

export interface SellerStats {
  totalRevenue: number;
  totalOrders: number;
  totalUnitsSold: number;
  activeProductsCount: number;
  todayVisitors: number;
  availablePayoutBalance: number;
  totalCommissionEarned?: number;
  commissionSalesCount?: number;
}

export type StoreLogoStyle =
  | 'crown-apex'
  | 'spark-cart'
  | 'shield-vault'
  | 'diamond-gem'
  | 'rocket-fast'
  | 'modern-monogram';

export interface StoreBranding {
  logoStyle: StoreLogoStyle;
  storeName: string;
  storeTagline: string;
  brandColor: string; // e.g. '#f59e0b'
  customLogoUrl?: string;
  customerRating: number;
  customerReviewCount: number;
  verifiedStoreBadge: boolean;
}

export interface AccountSecurity {
  pinCode: string; // 6-digit PIN, default '849201'
  is2FAEnabled: boolean;
  requirePinForPayouts: boolean;
  requirePinForOrders: boolean;
  antiPhishingPhrase: string;
  lastSecurityCheckAt: string;
  isEmergencyLocked: boolean;
  failedPinAttempts: number;
}

export interface SystemDiagnosticItem {
  id: string;
  category: 'database' | 'payment' | 'security' | 'pwa' | 'affiliate' | 'zip_avs';
  name: string;
  status: 'healthy' | 'warning' | 'fixing';
  message: string;
  details: string;
}

export interface GmailUser {
  id: string;
  email: string;
  name: string;
  givenName: string;
  familyName?: string;
  avatarUrl: string;
  provider: 'gmail' | 'google';
  emailVerified: boolean;
  signedInAt: string;
  lastLoginAt: string;
  securityStatus: '2-Step Verification Active' | 'Standard Security';
  ordersCount: number;
  sellerCommissionEarned: number;
}

export interface AiAgentLog {
  id: string;
  agentName: 'Gemini Sourcing Agent' | 'Flash Sales Closer' | 'Seller Happiness Bot';
  action: string;
  detail: string;
  timestamp: string;
  type: 'product_added' | 'fast_sale' | 'seller_happy' | 'commission_harvested';
  amount?: number;
  commission?: number;
  sellerPayout?: number;
}

export interface AiAgentsState {
  isAutoPilotActive: boolean;
  speedMode: 'turbo' | 'fast' | 'normal';
  totalProductsAddedByAi: number;
  totalFastSalesClosed: number;
  totalCommissionsHarvested: number;
  totalSellerPayoutsReleased: number;
  sellerHappinessIndex: number; // e.g. 99.8 (%)
  activeAgentsCount: number;
}
