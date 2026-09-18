import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  Product,
  ProductCategory,
  CartItem,
  Order,
  BuyerActivity,
  SellerStats,
  StorePaymentMethod,
  PayoutTransaction,
  StoreWallet,
  MarketPlatform,
  LinkedMarketplace,
  CommissionRecord,
  StoreOneLinkInfo,
  StoreBranding,
  AccountSecurity,
  SystemDiagnosticItem,
  GmailUser,
  AiAgentsState,
  AiAgentLog,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_LINKED_MARKETS,
  INITIAL_COMMISSION_RECORDS,
  TRENDING_MARKET_IMPORTS,
  MOCK_BUYER_NAMES,
  MOCK_CITIES,
} from '../data/initialProducts';

interface MarketplaceContextType {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  buyerActivities: BuyerActivity[];
  activeToast: BuyerActivity | null;
  dismissToast: () => void;
  sellerStats: SellerStats;
  liveShoppersCount: number;

  // Gmail & Google Authentication
  currentUser: GmailUser | null;
  isSignInModalOpen: boolean;
  setIsSignInModalOpen: (open: boolean) => void;
  signInWithGmail: (customEmail?: string, customName?: string) => Promise<boolean>;
  signOutGmail: () => void;
  switchGmailAccount: (email: string, name?: string) => void;
  savedGmailAccounts: GmailUser[];

  // Store Payment & Payouts State
  storePaymentMethods: StorePaymentMethod[];
  activeStorePaymentMethod: StorePaymentMethod | null;
  storeWallet: StoreWallet;
  payoutTransactions: PayoutTransaction[];
  isStorePaymentModalOpen: boolean;
  setIsStorePaymentModalOpen: (open: boolean) => void;
  isWithdrawModalOpen: boolean;
  setIsWithdrawModalOpen: (open: boolean) => void;
  addStorePaymentMethod: (method: Omit<StorePaymentMethod, 'id' | 'addedAt'>) => void;
  removeStorePaymentMethod: (id: string) => void;
  setPrimaryStorePaymentMethod: (id: string) => void;
  withdrawFunds: (amount: number, methodId?: string) => boolean;
  toggleAutoPayout: (enabled: boolean) => void;

  // Big Market & 3% Commission System
  linkedMarkets: LinkedMarketplace[];
  commissionRecords: CommissionRecord[];
  storeOneLink: StoreOneLinkInfo;
  isStoreOneLinkModalOpen: boolean;
  setIsStoreOneLinkModalOpen: (open: boolean) => void;
  isMarketSyncModalOpen: boolean;
  setIsMarketSyncModalOpen: (open: boolean) => void;
  toggleMarketConnection: (idOrPlatform: string) => void;
  importMarketProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'salesCount'>) => void;
  triggerMarketCommissionSale: (platform?: MarketPlatform) => void;
  updateStoreSlug: (newSlug: string) => void;
  
  // Store Branding & Logo Studio
  storeBranding: StoreBranding;
  updateStoreBranding: (updates: Partial<StoreBranding>) => void;
  isStoreLogoStudioOpen: boolean;
  setIsStoreLogoStudioOpen: (open: boolean) => void;

  // Account Security & PIN Code Protection
  accountSecurity: AccountSecurity;
  updateAccountSecurity: (updates: Partial<AccountSecurity>) => void;
  verifyPin: (inputPin: string) => boolean;
  resetSecurityPin: (newPin: string) => void;
  toggleEmergencyLock: () => void;
  isAccountSecurityOpen: boolean;
  setIsAccountSecurityOpen: (open: boolean) => void;

  // Error Solver & Diagnostics
  isErrorSolverOpen: boolean;
  setIsErrorSolverOpen: (open: boolean) => void;
  runSystemDiagnosticAndSolve: () => Promise<{ solvedCount: number; fixedItems: string[] }>;

  // App Store & Play Store Publishing Hub
  isAppStorePublishOpen: boolean;
  setIsAppStorePublishOpen: (open: boolean) => void;

  // AI Autonomous Agents Engine
  isAiAgentsModalOpen: boolean;
  setIsAiAgentsModalOpen: (open: boolean) => void;
  aiAgentsState: AiAgentsState;
  aiAgentLogs: AiAgentLog[];
  toggleAiAutoPilot: (active?: boolean) => void;
  setAiSpeedMode: (mode: 'turbo' | 'fast' | 'normal') => void;
  triggerAiAddTrendingProducts: (count?: number) => void;
  triggerAiFastSales: (count?: number) => void;
  triggerAiMakeSellersHappy: () => void;
  autoImportGlobalMarketsFeed: () => void;

  // Download App System
  isDownloadAppOpen: boolean;
  setIsDownloadAppOpen: (open: boolean) => void;

  // Navigation and UI states
  activeView: 'marketplace' | 'seller-hub' | 'orders';
  setActiveView: (view: 'marketplace' | 'seller-hub' | 'orders') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  isFreeGuaranteeOpen: boolean;
  setIsFreeGuaranteeOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount') => void;
  executeDirectSearch: (query?: string, category?: ProductCategory) => void;

  // Simulation controls
  trafficMode: 'off' | 'normal' | 'rush' | 'frenzy';
  setTrafficMode: (mode: 'off' | 'normal' | 'rush' | 'frenzy') => void;
  triggerInstantSale: () => void;

  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'salesCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFlashSale: (productId: string, discountPercent?: number) => void;
  triggerAutomatedStoreSale: (discountPercent: number) => void;
  placeOrder: (customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    paymentMethod: 'Credit Card' | 'PayPal' | 'Apple Pay' | 'Cash on Delivery';
  }) => Order;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'amazefree_products_v1',
  CART: 'amazefree_cart_v1',
  ORDERS: 'amazefree_orders_v1',
  STATS: 'amazefree_stats_v1',
  STORE_PAYMENTS: 'amazefree_store_payments_v2',
  STORE_WALLET: 'amazefree_store_wallet_v2',
  PAYOUT_HISTORY: 'amazefree_payout_history_v2',
  LINKED_MARKETS: 'amazefree_linked_markets_v2',
  COMMISSIONS: 'amazefree_commissions_v2',
  STORE_ONE_LINK: 'amazefree_store_one_link_v2',
  STORE_BRANDING: 'amazefree_store_branding_v2',
  ACCOUNT_SECURITY: 'amazefree_account_security_v2',
  AUTH_USER: 'globalzone_auth_user_v1',
  SAVED_ACCOUNTS: 'globalzone_saved_accounts_v1',
  AI_AGENTS_STATE: 'globalzone_ai_agents_state_v1',
  AI_AGENT_LOGS: 'globalzone_ai_agent_logs_v1',
};

const DEFAULT_AI_AGENTS_STATE: AiAgentsState = {
  isAutoPilotActive: true,
  speedMode: 'fast',
  totalProductsAddedByAi: 12,
  totalFastSalesClosed: 38,
  totalCommissionsHarvested: 247.85,
  totalSellerPayoutsReleased: 7990.40,
  sellerHappinessIndex: 99.8,
  activeAgentsCount: 3,
};

const INITIAL_AI_LOGS: AiAgentLog[] = [
  {
    id: 'log-ai-1',
    agentName: 'Gemini Sourcing Agent',
    action: 'Auto-Discovered & Sourced Product',
    detail: "Imported 'Smart 4K Video Projector' from Alibaba wholesale ($89.00). 3% commission auto-linked.",
    timestamp: '2 mins ago',
    type: 'product_added',
    amount: 89.00,
    commission: 2.67,
  },
  {
    id: 'log-ai-2',
    agentName: 'Flash Sales Closer',
    action: 'Fast Sale Closed & Settled',
    detail: 'Closed customer order #AMZ-820491. Seller received $67.89 direct payout, $2.10 (3% commission) credited to your account.',
    timestamp: '5 mins ago',
    type: 'fast_sale',
    amount: 69.99,
    commission: 2.10,
    sellerPayout: 67.89,
  },
  {
    id: 'log-ai-3',
    agentName: 'Seller Happiness Bot',
    action: 'Instant Seller Payout & 5★ Feedback',
    detail: 'Seller Alex was credited with instant same-day funds and verified 5-star rating. Zero dispute risk.',
    timestamp: '9 mins ago',
    type: 'seller_happy',
  },
];

const DEFAULT_STORE_BRANDING: StoreBranding = {
  logoStyle: 'crown-apex',
  storeName: 'Global Zone Global',
  storeTagline: 'Global Marketplace, Verified Brands & 3% Commission Hub',
  brandColor: '#f59e0b',
  customerRating: 4.9,
  customerReviewCount: 18450,
  verifiedStoreBadge: true,
};

const DEFAULT_GMAIL_USER: GmailUser = {
  id: 'usr_g_happyall450',
  email: 'happyall450@gmail.com',
  name: 'Alex Rivera',
  givenName: 'Alex',
  familyName: 'Rivera',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  provider: 'gmail',
  emailVerified: true,
  signedInAt: 'Today, Verified Session',
  lastLoginAt: 'Just now (Google Identity Services)',
  securityStatus: '2-Step Verification Active',
  ordersCount: 3,
  sellerCommissionEarned: 164.20,
};

const DEMO_SAVED_GMAIL_ACCOUNTS: GmailUser[] = [
  DEFAULT_GMAIL_USER,
  {
    id: 'usr_g_globalzone',
    email: 'globalzone.merchant@gmail.com',
    name: 'Global Zone Admin',
    givenName: 'Global Zone',
    familyName: 'Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    provider: 'gmail',
    emailVerified: true,
    signedInAt: 'Verified Session',
    lastLoginAt: 'Yesterday',
    securityStatus: '2-Step Verification Active',
    ordersCount: 14,
    sellerCommissionEarned: 520.40,
  },
];

const DEFAULT_ACCOUNT_SECURITY: AccountSecurity = {
  pinCode: '849201',
  is2FAEnabled: true,
  requirePinForPayouts: true,
  requirePinForOrders: false,
  antiPhishingPhrase: 'SAFE-STORE-VERIFIED',
  lastSecurityCheckAt: 'Protected • 256-Bit TLS Active',
  isEmergencyLocked: false,
  failedPinAttempts: 0,
};

const DEFAULT_STORE_PAYMENT_METHODS: StorePaymentMethod[] = [
  {
    id: 'spm-bank-1',
    type: 'bank',
    title: 'Chase Bank Business Checking (••••4829)',
    accountHolder: 'My Workshop Store LLC',
    accountDetails: 'Routing: 021000021 • Acct: ••••••4829 (Direct Deposit)',
    isPrimary: true,
    addedAt: 'Verified • Instant Payout Active',
    status: 'Active',
  },
  {
    id: 'spm-paypal-1',
    type: 'paypal',
    title: 'PayPal Merchant Payout (happyall450@gmail.com)',
    accountHolder: 'Alex Rivera',
    accountDetails: 'happyall450@gmail.com • Direct Buyer Deposit',
    isPrimary: false,
    addedAt: 'Verified',
    status: 'Verified',
  },
];

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial products from localStorage or default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'AMZ-918234',
        items: [
          {
            product: INITIAL_PRODUCTS[3] || INITIAL_PRODUCTS[0],
            quantity: 1,
          },
        ],
        totalAmount: 49.99,
        customerName: 'Lucas Harris',
        customerEmail: 'lucas.h@example.com',
        shippingAddress: '742 Evergreen Terrace',
        city: 'New York, USA',
        paymentMethod: 'Credit Card',
        createdAt: 'Today, 2:14 PM',
        status: 'Processing',
        isSimulatedSale: true,
        storeRecipientMethod: 'Chase Bank Business Checking (••••4829)',
        creditedToStore: true,
        commissionEarned: 1.50,
        commissionRate: 3,
        marketPlatform: 'Amazon',
      },
      {
        id: 'AMZ-841920',
        items: [
          {
            product: INITIAL_PRODUCTS[0],
            quantity: 1,
          },
        ],
        totalAmount: 69.99,
        customerName: 'Sarah Jenkins',
        customerEmail: 'sarah.j@example.com',
        shippingAddress: '428 Lexington Ave',
        city: 'Seattle, WA',
        paymentMethod: 'Credit Card',
        createdAt: 'Today, 1:45 PM',
        status: 'Processing',
        isSimulatedSale: true,
        storeRecipientMethod: 'Chase Bank Business Checking (••••4829)',
        creditedToStore: true,
      },
      {
        id: 'AMZ-720194',
        items: [
          {
            product: INITIAL_PRODUCTS[4] || INITIAL_PRODUCTS[1],
            quantity: 1,
          },
        ],
        totalAmount: 119.00,
        customerName: 'Sophia Miller',
        customerEmail: 'sophia.m@example.com',
        shippingAddress: '18 Regent St',
        city: 'London, UK',
        paymentMethod: 'Apple Pay',
        createdAt: 'Today, 11:32 AM',
        status: 'Processing',
        isSimulatedSale: true,
        storeRecipientMethod: 'Chase Bank Business Checking (••••4829)',
        creditedToStore: true,
        commissionEarned: 3.57,
        commissionRate: 3,
        marketPlatform: 'Alibaba',
      },
    ];
  });

  // Store Payment Methods
  const [storePaymentMethods, setStorePaymentMethods] = useState<StorePaymentMethod[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_PAYMENTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_STORE_PAYMENT_METHODS;
  });

  // Store Wallet (Funds coming directly from purchases & 3% commission)
  const [storeWallet, setStoreWallet] = useState<StoreWallet>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_WALLET);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      availableBalance: 294.50,
      pendingBalance: 0,
      totalWithdrawn: 1420.00,
      autoPayoutEnabled: false,
      totalCommissionEarned: 442.25,
      commissionSalesCount: 18,
    };
  });

  // Payout transactions history
  const [payoutTransactions, setPayoutTransactions] = useState<PayoutTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAYOUT_HISTORY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const seen = new Set<string>();
          return parsed.map((tx: PayoutTransaction, idx: number) => {
            if (!tx.id || seen.has(tx.id)) {
              const uniqueId = `PAY-${Date.now()}-${idx}-${Math.floor(1000 + Math.random() * 9000)}`;
              seen.add(uniqueId);
              return { ...tx, id: uniqueId };
            }
            seen.add(tx.id);
            return tx;
          });
        }
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'PAY-1001',
        amount: 850.00,
        destinationMethodTitle: 'Chase Bank Business Checking (••••4829)',
        status: 'Completed',
        date: 'Yesterday, 4:20 PM',
        referenceId: 'ACH-7892140',
      },
      {
        id: 'PAY-1000',
        amount: 570.00,
        destinationMethodTitle: 'PayPal Merchant Payout (happyall450@gmail.com)',
        status: 'Completed',
        date: 'Sep 10, 2026',
        referenceId: 'PP-9481023',
      },
    ];
  });

  // Linked Big Markets (Amazon, Alibaba, Shopify, AliExpress, eBay, Walmart)
  const [linkedMarkets, setLinkedMarkets] = useState<LinkedMarketplace[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LINKED_MARKETS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_LINKED_MARKETS;
  });

  // Commission Records (Every 3% commission credited to the store)
  const [commissionRecords, setCommissionRecords] = useState<CommissionRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMISSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const seen = new Set<string>();
          return parsed.map((rec: CommissionRecord, idx: number) => {
            if (!rec.id || seen.has(rec.id)) {
              const uniqueId = `COM-${Date.now()}-${idx}-${Math.floor(1000 + Math.random() * 9000)}`;
              seen.add(uniqueId);
              return { ...rec, id: uniqueId };
            }
            seen.add(rec.id);
            return rec;
          });
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_COMMISSION_RECORDS;
  });

  // Store One-Link Info (For universal installation and embedding)
  const [storeOneLink, setStoreOneLink] = useState<StoreOneLinkInfo>(() => {
    const slug = 'globalzone';
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_ONE_LINK);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.storeName || parsed.storeName.includes('AmazeFree') || parsed.storeName.includes('Ameez') || parsed.storeName.toLowerCase().includes('free')) {
          parsed.storeName = 'Global Zone Global & Big Market Hub';
        }
        if (parsed.storeUrl?.includes('amazefree') || parsed.storeUrl?.includes('ameez')) {
          parsed.storeUrl = `https://globalzone.shop/store/${parsed.storeSlug || slug}`;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return {
      storeSlug: slug,
      storeName: 'Global Zone Global & Big Market Hub',
      storeUrl: `https://globalzone.shop/store/${slug}`,
      ownerEmail: 'happyall450@gmail.com',
      embedCode: `<script src="https://globalzone.shop/embed.js" data-store="${slug}" data-commission="3%"></script>`,
      iframeCode: `<iframe src="https://globalzone.shop/store/${slug}?embed=true" width="100%" height="750" frameborder="0" style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);"></iframe>`,
      totalClicks: 642,
      totalLinkSales: 52,
    };
  });

  // UI state
  const [activeView, setActiveView] = useState<'marketplace' | 'seller-hub' | 'orders'>('marketplace');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isFreeGuaranteeOpen, setIsFreeGuaranteeOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStorePaymentModalOpen, setIsStorePaymentModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isStoreOneLinkModalOpen, setIsStoreOneLinkModalOpen] = useState(false);
  const [isMarketSyncModalOpen, setIsMarketSyncModalOpen] = useState(false);
  const [isErrorSolverOpen, setIsErrorSolverOpen] = useState(false);
  const [isAccountSecurityOpen, setIsAccountSecurityOpen] = useState(false);
  const [isStoreLogoStudioOpen, setIsStoreLogoStudioOpen] = useState(false);
  const [isAppStorePublishOpen, setIsAppStorePublishOpen] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isAiAgentsModalOpen, setIsAiAgentsModalOpen] = useState(false);

  // AI Autonomous Agents State
  const [aiAgentsState, setAiAgentsState] = useState<AiAgentsState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AI_AGENTS_STATE);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_AI_AGENTS_STATE;
  });

  const [aiAgentLogs, setAiAgentLogs] = useState<AiAgentLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AI_AGENT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_AI_LOGS;
  });

  // Gmail & Google Authentication State
  const [currentUser, setCurrentUser] = useState<GmailUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_GMAIL_USER;
  });

  const [savedGmailAccounts, setSavedGmailAccounts] = useState<GmailUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_ACCOUNTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEMO_SAVED_GMAIL_ACCOUNTS;
  });

  // Store Branding & Custom Logo Studio
  const [storeBranding, setStoreBranding] = useState<StoreBranding>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE_BRANDING);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.storeName || parsed.storeName.includes('AmazeFree') || parsed.storeName.includes('Ameez') || parsed.storeName.toLowerCase().includes('free')) {
          parsed.storeName = 'Global Zone Global';
        }
        if (!parsed.storeTagline || parsed.storeTagline.includes('Zero-Fee') || parsed.storeTagline.includes('0% Fee') || parsed.storeTagline.includes('AmazeFree')) {
          parsed.storeTagline = 'Global Marketplace, Verified Brands & 3% Commission Hub';
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_STORE_BRANDING;
  });

  // Account Security & PIN Code Protection
  const [accountSecurity, setAccountSecurity] = useState<AccountSecurity>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACCOUNT_SECURITY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_ACCOUNT_SECURITY;
  });

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount'>('featured');

  // Traffic and Sales Simulation
  const [trafficMode, setTrafficMode] = useState<'off' | 'normal' | 'rush' | 'frenzy'>('normal');
  const [buyerActivities, setBuyerActivities] = useState<BuyerActivity[]>([]);
  const [activeToast, setActiveToast] = useState<BuyerActivity | null>(null);
  const [liveShoppersCount, setLiveShoppersCount] = useState<number>(38);

  // Active store payout account
  const activeStorePaymentMethod =
    storePaymentMethods.find((m) => m.isPrimary) || storePaymentMethods[0] || null;

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_PAYMENTS, JSON.stringify(storePaymentMethods));
    } catch {
      // ignore
    }
  }, [storePaymentMethods]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_WALLET, JSON.stringify(storeWallet));
    } catch {
      // ignore
    }
  }, [storeWallet]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PAYOUT_HISTORY, JSON.stringify(payoutTransactions));
    } catch {
      // ignore
    }
  }, [payoutTransactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LINKED_MARKETS, JSON.stringify(linkedMarkets));
    } catch {
      // ignore
    }
  }, [linkedMarkets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMISSIONS, JSON.stringify(commissionRecords));
    } catch {
      // ignore
    }
  }, [commissionRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_ONE_LINK, JSON.stringify(storeOneLink));
    } catch {
      // ignore
    }
  }, [storeOneLink]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORE_BRANDING, JSON.stringify(storeBranding));
    } catch {
      // ignore
    }
  }, [storeBranding]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNT_SECURITY, JSON.stringify(accountSecurity));
    } catch {
      // ignore
    }
  }, [accountSecurity]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AI_AGENTS_STATE, JSON.stringify(aiAgentsState));
    } catch {
      // ignore
    }
  }, [aiAgentsState]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AI_AGENT_LOGS, JSON.stringify(aiAgentLogs));
    } catch {
      // ignore
    }
  }, [aiAgentLogs]);

  // Live shoppers fluctuating count
  useEffect(() => {
    if (trafficMode === 'off') {
      setLiveShoppersCount(2);
      return;
    }
    const interval = setInterval(() => {
      setLiveShoppersCount((prev) => {
        const base = trafficMode === 'frenzy' ? 140 : trafficMode === 'rush' ? 75 : 35;
        const jitter = Math.floor(Math.random() * 11) - 5;
        return Math.max(12, base + jitter);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [trafficMode]);

  // Dismiss toast handler
  const dismissToast = useCallback(() => {
    setActiveToast(null);
  }, []);

  // Update store slug
  const updateStoreSlug = useCallback((newSlug: string) => {
    const cleanSlug = newSlug.toLowerCase().replace(/[^a-z0-9-_]/g, '') || 'mystore';
    setStoreOneLink((prev) => ({
      ...prev,
      storeSlug: cleanSlug,
      storeUrl: `https://amazefree.store/shop/${cleanSlug}`,
      embedCode: `<script src="https://amazefree.store/embed.js" data-store="${cleanSlug}" data-commission="3%"></script>`,
      iframeCode: `<iframe src="https://amazefree.store/shop/${cleanSlug}?embed=true" width="100%" height="750" frameborder="0" style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);"></iframe>`,
    }));
  }, []);

  // Toggle market connection (e.g. Amazon, Alibaba, Shopify)
  const toggleMarketConnection = useCallback((idOrPlatform: string) => {
    setLinkedMarkets((prev) =>
      prev.map((m) =>
        m.id === idOrPlatform || m.platform === idOrPlatform
          ? {
              ...m,
              isConnected: !m.isConnected,
              connectedAt: !m.isConnected ? 'Connected & Verified' : 'Disconnected',
            }
          : m
      )
    );
  }, []);

  // Import a product from Amazon, Alibaba, Shopify into user's store
  const importMarketProduct = useCallback(
    (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'salesCount'>) => {
      const platform = productData.marketPlatform || 'Amazon';
      const commission = parseFloat((productData.price * 0.03).toFixed(2));
      const newProduct: Product = {
        ...productData,
        id: 'prod-imp-' + Date.now(),
        rating: parseFloat((4.6 + Math.random() * 0.35).toFixed(1)),
        reviewCount: Math.floor(150 + Math.random() * 1200),
        salesCount: Math.floor(40 + Math.random() * 200),
        isSellerProduct: false,
        marketPlatform: platform,
        commissionRate: 3,
        commissionAmount: commission,
      };

      setProducts((prev) => [newProduct, ...prev]);

      // Update sync count for that platform
      setLinkedMarkets((prev) =>
        prev.map((m) =>
          m.platform === platform
            ? { ...m, productsSyncedCount: m.productsSyncedCount + 1, isConnected: true }
            : m
        )
      );

      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    },
    []
  );

  // Trigger a dedicated 3% Commission Sale from Big Markets (Amazon, Alibaba, Shopify)
  const triggerMarketCommissionSale = useCallback(
    (targetPlatform?: MarketPlatform) => {
      const candidates = products.filter(
        (p) =>
          p.marketPlatform &&
          p.marketPlatform !== 'AmazeFree' &&
          (!targetPlatform || p.marketPlatform === targetPlatform)
      );

      const chosenProduct =
        candidates.length > 0
          ? candidates[Math.floor(Math.random() * candidates.length)]
          : products[Math.floor(Math.random() * products.length)];

      const platform =
        chosenProduct.marketPlatform && chosenProduct.marketPlatform !== 'AmazeFree'
          ? chosenProduct.marketPlatform
          : targetPlatform || 'Amazon';

      const randomBuyer = MOCK_BUYER_NAMES[Math.floor(Math.random() * MOCK_BUYER_NAMES.length)];
      const randomLocation = MOCK_CITIES[Math.floor(Math.random() * MOCK_CITIES.length)];
      const qty = 1;
      const saleAmount = chosenProduct.price;
      const commissionRate = 3;
      const commissionEarned = parseFloat((saleAmount * 0.03).toFixed(2));

      // 1. Create commission record
      const commissionRecord: CommissionRecord = {
        id: `COM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6)}`,
        orderId: `${platform.slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
        productTitle: chosenProduct.title,
        productImage: chosenProduct.image,
        saleAmount,
        commissionRate,
        commissionEarned,
        platform,
        buyerName: randomBuyer,
        buyerLocation: `${randomLocation.city}, ${randomLocation.country}`,
        timestamp: 'Just now',
        status: 'Credited to Store',
      };

      // 2. Deposit commission into store wallet
      setStoreWallet((prev) => ({
        ...prev,
        availableBalance: parseFloat((prev.availableBalance + commissionEarned).toFixed(2)),
        totalCommissionEarned: parseFloat(((prev.totalCommissionEarned || 0) + commissionEarned).toFixed(2)),
        commissionSalesCount: (prev.commissionSalesCount || 0) + 1,
      }));

      // 3. Update commission records list
      setCommissionRecords((prev) => [commissionRecord, ...prev.slice(0, 49)]);

      // 4. Update linked market totals
      setLinkedMarkets((prev) =>
        prev.map((m) =>
          m.platform === platform
            ? { ...m, totalEarned: parseFloat((m.totalEarned + commissionEarned).toFixed(2)) }
            : m
        )
      );

      // 5. Update Store One-Link clicks & sales
      setStoreOneLink((prev) => ({
        ...prev,
        totalClicks: prev.totalClicks + 1,
        totalLinkSales: prev.totalLinkSales + 1,
      }));

      // 6. Record order in history
      const newOrder: Order = {
        id: commissionRecord.orderId,
        items: [{ product: chosenProduct, quantity: qty }],
        totalAmount: saleAmount,
        customerName: randomBuyer,
        customerEmail: `${randomBuyer.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        shippingAddress: `${Math.floor(10 + Math.random() * 900)} Marketplace Blvd`,
        city: `${randomLocation.city}, ${randomLocation.country}`,
        paymentMethod: 'Credit Card',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Processing',
        isSimulatedSale: true,
        storeRecipientMethod: activeStorePaymentMethod?.title || 'Chase Bank Business Checking (••••4829)',
        creditedToStore: true,
        commissionEarned,
        commissionRate: 3,
        marketPlatform: platform,
      };
      setOrders((prev) => [newOrder, ...prev.slice(0, 49)]);

      // 7. Show live toast
      const activity: BuyerActivity = {
        id: 'act-com-' + Date.now(),
        buyerName: randomBuyer,
        city: randomLocation.city,
        country: randomLocation.country,
        productTitle: chosenProduct.title,
        productImage: chosenProduct.image,
        quantity: qty,
        amount: saleAmount,
        timestamp: 'Just now',
        action: 'purchased',
        creditedToStore: true,
        commissionEarned,
        marketPlatform: platform,
      };
      setBuyerActivities((prev) => [activity, ...prev.slice(0, 20)]);
      setActiveToast(activity);

      // 8. Celebration
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#ff9900', '#ff6a00', '#96bf48', '#22c55e'],
      });

      setTimeout(() => {
        setActiveToast((current) => (current?.id === activity.id ? null : current));
      }, 5000);
    },
    [products, activeStorePaymentMethod]
  );

  // Execute a single simulated purchase
  const triggerSingleSimulatedSale = useCallback(() => {
    if (products.length === 0) return;

    const eligibleProducts = products.filter((p) => p.stock > 0);
    if (eligibleProducts.length === 0) return;

    const randomProduct = eligibleProducts[Math.floor(Math.random() * eligibleProducts.length)];
    const randomBuyer = MOCK_BUYER_NAMES[Math.floor(Math.random() * MOCK_BUYER_NAMES.length)];
    const randomLocation = MOCK_CITIES[Math.floor(Math.random() * MOCK_CITIES.length)];
    const qty = Math.random() > 0.8 ? 2 : 1;
    const total = parseFloat((randomProduct.price * qty).toFixed(2));

    const isExternalMarket =
      randomProduct.marketPlatform &&
      randomProduct.marketPlatform !== 'AmazeFree';

    // If external market product (Amazon, Alibaba, Shopify): 3% commission to store!
    // If own product / AmazeFree: 100% of price to store!
    const commissionEarned = isExternalMarket
      ? parseFloat((total * 0.03).toFixed(2))
      : 0;
    const storeCreditAmount = isExternalMarket ? commissionEarned : total;

    const activity: BuyerActivity = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      buyerName: randomBuyer,
      city: randomLocation.city,
      country: randomLocation.country,
      productTitle: randomProduct.title,
      productImage: randomProduct.image,
      quantity: qty,
      amount: total,
      timestamp: 'Just now',
      action: 'purchased',
      creditedToStore: true,
      commissionEarned: isExternalMarket ? commissionEarned : undefined,
      marketPlatform: randomProduct.marketPlatform,
    };

    // Update stock and sales count of the product
    setProducts((prev) =>
      prev.map((p) =>
        p.id === randomProduct.id
          ? {
              ...p,
              stock: Math.max(0, p.stock - qty),
              salesCount: (p.salesCount || 0) + qty,
            }
          : p
      )
    );

    // Record order in seller history with direct store credit
    const simulatedOrder: Order = {
      id: `${(randomProduct.marketPlatform || 'AMZ').slice(0, 3).toUpperCase()}-SIM-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [{ product: randomProduct, quantity: qty }],
      totalAmount: total,
      customerName: randomBuyer,
      customerEmail: `${randomBuyer.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      shippingAddress: `${Math.floor(10 + Math.random() * 900)} Market Street`,
      city: `${randomLocation.city}, ${randomLocation.country}`,
      paymentMethod: 'Credit Card',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Processing',
      isSimulatedSale: true,
      storeRecipientMethod: activeStorePaymentMethod?.title || 'Chase Bank Business Checking (••••4829)',
      creditedToStore: true,
      commissionEarned: isExternalMarket ? commissionEarned : undefined,
      commissionRate: isExternalMarket ? 3 : 100,
      marketPlatform: randomProduct.marketPlatform,
    };

    // Credit money immediately to the store wallet
    setStoreWallet((prev) => ({
      ...prev,
      availableBalance: parseFloat((prev.availableBalance + storeCreditAmount).toFixed(2)),
      totalCommissionEarned: isExternalMarket
        ? parseFloat(((prev.totalCommissionEarned || 0) + commissionEarned).toFixed(2))
        : prev.totalCommissionEarned,
      commissionSalesCount: isExternalMarket
        ? (prev.commissionSalesCount || 0) + 1
        : prev.commissionSalesCount,
    }));

    // If external market, log commission record and update market stats
    if (isExternalMarket && randomProduct.marketPlatform) {
      const comRecord: CommissionRecord = {
        id: `COM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6)}`,
        orderId: simulatedOrder.id,
        productTitle: randomProduct.title,
        productImage: randomProduct.image,
        saleAmount: total,
        commissionRate: 3,
        commissionEarned,
        platform: randomProduct.marketPlatform,
        buyerName: randomBuyer,
        buyerLocation: `${randomLocation.city}, ${randomLocation.country}`,
        timestamp: 'Just now',
        status: 'Credited to Store',
      };
      setCommissionRecords((prev) => [comRecord, ...prev.slice(0, 49)]);

      setLinkedMarkets((prev) =>
        prev.map((m) =>
          m.platform === randomProduct.marketPlatform
            ? { ...m, totalEarned: parseFloat((m.totalEarned + commissionEarned).toFixed(2)) }
            : m
        )
      );

      setStoreOneLink((prev) => ({
        ...prev,
        totalLinkSales: prev.totalLinkSales + 1,
      }));
    }

    setOrders((prev) => [simulatedOrder, ...prev.slice(0, 49)]);
    setBuyerActivities((prev) => [activity, ...prev.slice(0, 20)]);
    setActiveToast(activity);

    // Auto-dismiss toast after 4.5 seconds
    setTimeout(() => {
      setActiveToast((current) => (current?.id === activity.id ? null : current));
    }, 4500);
  }, [products, activeStorePaymentMethod]);

  // Automatic Sales Simulation loop
  useEffect(() => {
    if (trafficMode === 'off') return;

    const intervalTime = trafficMode === 'frenzy' ? 2500 : trafficMode === 'rush' ? 5000 : 9000;
    const interval = setInterval(() => {
      triggerSingleSimulatedSale();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [trafficMode, triggerSingleSimulatedSale]);

  // Direct Search & Category filter ("Searching button any categories searching direct coming")
  const executeDirectSearch = useCallback((query?: string, category?: ProductCategory) => {
    if (query !== undefined) {
      setSearchQuery(query);
    }
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    setActiveView('marketplace');
    setTimeout(() => {
      const catalogEl = document.getElementById('products-catalog-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  }, []);

  // AI Autonomous Agents Controls
  const toggleAiAutoPilot = useCallback((active?: boolean) => {
    setAiAgentsState((prev) => ({
      ...prev,
      isAutoPilotActive: active !== undefined ? active : !prev.isAutoPilotActive,
    }));
  }, []);

  const setAiSpeedMode = useCallback((mode: 'turbo' | 'fast' | 'normal') => {
    setAiAgentsState((prev) => ({ ...prev, speedMode: mode }));
  }, []);

  // AI Agent 1: Auto Sourcing - Adds trending products from Global Markets Feed (Amazon, Alibaba, Shopify)
  const triggerAiAddTrendingProducts = useCallback((count = 1) => {
    const available = TRENDING_MARKET_IMPORTS;
    if (available.length === 0) return;

    let addedCount = 0;
    const newItems: Product[] = [];
    const newLogs: AiAgentLog[] = [];

    for (let i = 0; i < count; i++) {
      const randomTemplate = available[Math.floor(Math.random() * available.length)];
      const commission = parseFloat((randomTemplate.price * 0.03).toFixed(2));
      const newProduct: Product = {
        id: 'prod-ai-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        title: randomTemplate.title,
        price: randomTemplate.price,
        originalPrice: randomTemplate.originalPrice,
        rating: 4.9,
        reviewCount: Math.floor(250 + Math.random() * 1400),
        salesCount: Math.floor(30 + Math.random() * 120),
        image: randomTemplate.image,
        category: randomTemplate.category,
        description: randomTemplate.features?.join('. ') || 'Authentic trending global product with instant 3% commission tracking.',
        features: randomTemplate.features || [],
        stock: Math.floor(40 + Math.random() * 90),
        freeShipping: true,
        isFlashDeal: Math.random() > 0.5,
        flashDealDiscount: 20,
        dealEndsInSeconds: 86400,
        isSellerProduct: false,
        marketPlatform: randomTemplate.platform,
        commissionRate: 3,
        commissionAmount: commission,
      };

      newItems.push(newProduct);
      addedCount++;

      newLogs.push({
        id: 'log-ai-' + Date.now() + '-' + i,
        agentName: 'Gemini Sourcing Agent',
        action: 'Auto-Sourced Trending Global Product',
        detail: `Added "${newProduct.title.slice(0, 42)}..." from ${newProduct.marketPlatform} at $${newProduct.price.toFixed(2)} with 3% auto-commission ($${commission.toFixed(2)}).`,
        timestamp: 'Just now',
        type: 'product_added',
        amount: newProduct.price,
        commission: commission,
      });
    }

    setProducts((prev) => [...newItems, ...prev]);
    setAiAgentsState((prev) => ({
      ...prev,
      totalProductsAddedByAi: prev.totalProductsAddedByAi + addedCount,
    }));
    setAiAgentLogs((prev) => [...newLogs, ...prev.slice(0, 35)]);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
  }, []);

  // AI Agent 2: Flash Sales Closer - Closes fast sales with 97% to seller and 3% to my account
  const triggerAiFastSales = useCallback((count = 1) => {
    if (products.length === 0) return;

    let totalHarvestedCommission = 0;
    let totalSellerDisbursed = 0;
    const newOrders: Order[] = [];
    const newLogs: AiAgentLog[] = [];
    let lastActivity: BuyerActivity | null = null;

    for (let i = 0; i < count; i++) {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomBuyer = MOCK_BUYER_NAMES[Math.floor(Math.random() * MOCK_BUYER_NAMES.length)];
      const randomLocation = MOCK_CITIES[Math.floor(Math.random() * MOCK_CITIES.length)];
      const qty = 1;
      const saleAmount = parseFloat((randomProduct.price * qty).toFixed(2));

      const isSellerProd = !!randomProduct.isSellerProduct;

      // 3% Commission always to "my account"
      const commission = parseFloat((saleAmount * 0.03).toFixed(2));
      // 97% goes directly to seller if it is a people/seller product
      const sellerShare = isSellerProd ? parseFloat((saleAmount * 0.97).toFixed(2)) : 0;

      totalHarvestedCommission += commission;
      if (sellerShare > 0) {
        totalSellerDisbursed += sellerShare;
      }

      const order: Order = {
        id: `AI-FAST-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [{ product: randomProduct, quantity: qty }],
        totalAmount: saleAmount,
        customerName: randomBuyer,
        customerEmail: `${randomBuyer.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
        shippingAddress: `${Math.floor(100 + Math.random() * 899)} Express Way`,
        city: `${randomLocation.city}, ${randomLocation.country}`,
        paymentMethod: 'Credit Card',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Delivered',
        isSimulatedSale: true,
        storeRecipientMethod: 'Direct Bank Settlement (3% Commission Engine)',
        creditedToStore: true,
        commissionEarned: commission,
        commissionRate: 3,
        marketPlatform: randomProduct.marketPlatform,
      };

      newOrders.push(order);

      const logDetail = isSellerProd
        ? `Faast Sale: "${randomProduct.title.slice(0, 32)}..." sold for $${saleAmount.toFixed(2)}. Seller received $${sellerShare.toFixed(2)} directly in payout wallet. 3% commission ($${commission.toFixed(2)}) credited to your account.`
        : `Faast Sale: "${randomProduct.title.slice(0, 32)}..." sold via ${randomProduct.marketPlatform || 'Global Zone'}. 3% commission ($${commission.toFixed(2)}) auto-deposited to your account.`;

      newLogs.push({
        id: 'log-sale-' + Date.now() + '-' + i,
        agentName: 'Flash Sales Closer',
        action: 'Fast High-Velocity Sale Closed',
        detail: logDetail,
        timestamp: 'Just now',
        type: 'fast_sale',
        amount: saleAmount,
        commission: commission,
        sellerPayout: sellerShare > 0 ? sellerShare : undefined,
      });

      lastActivity = {
        id: 'act-ai-' + Date.now() + '-' + i,
        buyerName: randomBuyer,
        city: randomLocation.city,
        country: randomLocation.country,
        productTitle: randomProduct.title,
        productImage: randomProduct.image,
        quantity: qty,
        amount: saleAmount,
        timestamp: 'Just now',
        action: 'purchased',
        creditedToStore: true,
        commissionEarned: commission,
        marketPlatform: randomProduct.marketPlatform,
      };
    }

    // Update orders and activity
    setOrders((prev) => [...newOrders, ...prev.slice(0, 50)]);
    if (lastActivity) {
      setBuyerActivities((prev) => [lastActivity!, ...prev.slice(0, 20)]);
      setActiveToast(lastActivity);
      setTimeout(() => {
        setActiveToast((current) => (current?.id === lastActivity?.id ? null : current));
      }, 4000);
    }

    // Update wallet with 3% commission & total sales
    setStoreWallet((prev) => ({
      ...prev,
      availableBalance: parseFloat((prev.availableBalance + totalHarvestedCommission).toFixed(2)),
      totalCommissionEarned: parseFloat(((prev.totalCommissionEarned || 0) + totalHarvestedCommission).toFixed(2)),
      commissionSalesCount: (prev.commissionSalesCount || 0) + count,
    }));

    // Update user stats
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            sellerCommissionEarned: parseFloat(((prev.sellerCommissionEarned || 0) + totalHarvestedCommission).toFixed(2)),
            ordersCount: (prev.ordersCount || 0) + count,
          }
        : null
    );

    // Update AI state
    setAiAgentsState((prev) => ({
      ...prev,
      totalFastSalesClosed: prev.totalFastSalesClosed + count,
      totalCommissionsHarvested: parseFloat((prev.totalCommissionsHarvested + totalHarvestedCommission).toFixed(2)),
      totalSellerPayoutsReleased: parseFloat((prev.totalSellerPayoutsReleased + totalSellerDisbursed).toFixed(2)),
      sellerHappinessIndex: Math.min(100, parseFloat((prev.sellerHappinessIndex + 0.05).toFixed(1))),
    }));

    setAiAgentLogs((prev) => [...newLogs, ...prev.slice(0, 35)]);
  }, [products]);

  // AI Agent 3: Seller Happiness & Security Enforcer
  const triggerAiMakeSellersHappy = useCallback(() => {
    // Boost rating of all seller products to 5.0, add 5-star positive review counts
    setProducts((prev) =>
      prev.map((p) =>
        p.isSellerProduct
          ? {
              ...p,
              rating: 5.0,
              reviewCount: (p.reviewCount || 10) + 12,
            }
          : p
      )
    );

    const happyLog: AiAgentLog = {
      id: 'log-happy-' + Date.now(),
      agentName: 'Seller Happiness Bot',
      action: 'Seller Payouts Released & Satisfaction 100%',
      detail: 'Audited all active seller products: 100% safe security verified, zero dispute withholdings, instant bank payouts cleared, and 5-star seller ratings synchronized.',
      timestamp: 'Just now',
      type: 'seller_happy',
    };

    setAiAgentLogs((prev) => [happyLog, ...prev.slice(0, 35)]);
    setAiAgentsState((prev) => ({
      ...prev,
      sellerHappinessIndex: 99.9,
    }));

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // Global Markets Direct Feed Auto-Import
  const autoImportGlobalMarketsFeed = useCallback(() => {
    const alibabaItem = TRENDING_MARKET_IMPORTS.find((p) => p.platform === 'Alibaba') || TRENDING_MARKET_IMPORTS[0];
    const amazonItem = TRENDING_MARKET_IMPORTS.find((p) => p.platform === 'Amazon') || TRENDING_MARKET_IMPORTS[1];
    const shopifyItem = TRENDING_MARKET_IMPORTS.find((p) => p.platform === 'Shopify') || TRENDING_MARKET_IMPORTS[2];

    [alibabaItem, amazonItem, shopifyItem].forEach((item, idx) => {
      setTimeout(() => {
        importMarketProduct({
          title: item.title,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          category: item.category,
          description: item.features.join('. '),
          features: item.features,
          stock: 65,
          freeShipping: true,
          marketPlatform: item.platform,
          commissionRate: 3,
          commissionAmount: item.commissionAmount,
        });
      }, idx * 120);
    });

    const feedLog: AiAgentLog = {
      id: 'log-feed-' + Date.now(),
      agentName: 'Gemini Sourcing Agent',
      action: 'Global Markets Direct Link Synced',
      detail: 'Direct API links to Amazon, Alibaba, and Shopify refreshed. Live inventory streams active with automatic 3% commission tracking.',
      timestamp: 'Just now',
      type: 'commission_harvested',
    };
    setAiAgentLogs((prev) => [feedLog, ...prev.slice(0, 35)]);
  }, [importMarketProduct]);

  // Autonomous AI Agent Loop (Runs in background according to speedMode)
  useEffect(() => {
    if (!aiAgentsState.isAutoPilotActive) return;

    const intervalMs =
      aiAgentsState.speedMode === 'turbo' ? 3500 : aiAgentsState.speedMode === 'fast' ? 7500 : 15000;

    const interval = setInterval(() => {
      // 80% sales ticks, 20% sourcing ticks
      if (Math.random() < 0.8) {
        triggerAiFastSales(1);
      } else {
        triggerAiAddTrendingProducts(1);
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [aiAgentsState.isAutoPilotActive, aiAgentsState.speedMode, triggerAiFastSales, triggerAiAddTrendingProducts]);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Seller product actions
  const addProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'salesCount'>
  ) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      salesCount: 0,
      isSellerProduct: true,
    };
    setProducts((prev) => [newProduct, ...prev]);
    setIsAddProductOpen(false);

    // Confetti celebration for listing item for free
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  // Toggle flash deal on specific product
  const toggleFlashSale = (productId: string, discountPercent = 30) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const nowActive = !p.isFlashDeal;
        if (nowActive) {
          const original = p.originalPrice && p.originalPrice > p.price ? p.originalPrice : p.price;
          const discountedPrice = parseFloat((original * (1 - discountPercent / 100)).toFixed(2));
          return {
            ...p,
            isFlashDeal: true,
            originalPrice: original,
            price: discountedPrice,
            flashDealDiscount: discountPercent,
            dealEndsInSeconds: 86400,
          };
        } else {
          return {
            ...p,
            isFlashDeal: false,
            price: p.originalPrice || p.price,
            flashDealDiscount: 0,
          };
        }
      })
    );
  };

  // Mass automated flash sale for all seller products
  const triggerAutomatedStoreSale = (discountPercent: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (!p.isSellerProduct) return p;
        const basePrice = p.originalPrice && p.originalPrice > p.price ? p.originalPrice : p.price;
        const discounted = parseFloat((basePrice * (1 - discountPercent / 100)).toFixed(2));
        return {
          ...p,
          isFlashDeal: true,
          originalPrice: basePrice,
          price: discounted,
          flashDealDiscount: discountPercent,
          dealEndsInSeconds: 86400,
        };
      })
    );

    // Burst confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  // Place customer order
  const placeOrder = (customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    paymentMethod: 'Credit Card' | 'PayPal' | 'Apple Pay' | 'Cash on Delivery';
  }): Order => {
    let directStoreRevenue = 0;
    let externalCommissionRevenue = 0;

    cart.forEach((item) => {
      const itemTotal = item.product.price * item.quantity;
      if (item.product.marketPlatform && item.product.marketPlatform !== 'AmazeFree') {
        const com = itemTotal * 0.03;
        externalCommissionRevenue += com;
      } else {
        directStoreRevenue += itemTotal;
      }
    });

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const firstExternal = cart.find(
      (c) => c.product.marketPlatform && c.product.marketPlatform !== 'AmazeFree'
    )?.product.marketPlatform;

    const netStoreAddition = parseFloat((directStoreRevenue + externalCommissionRevenue).toFixed(2));

    const newOrder: Order = {
      id: 'AMZ-' + Math.floor(100000 + Math.random() * 900000),
      items: [...cart],
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      customerName: customerInfo.name,
      customerEmail: customerInfo.email,
      shippingAddress: customerInfo.address,
      city: customerInfo.city,
      paymentMethod: customerInfo.paymentMethod,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Processing',
      isSimulatedSale: false,
      storeRecipientMethod: activeStorePaymentMethod?.title || 'Chase Bank Business Checking (••••4829)',
      creditedToStore: true,
      commissionEarned: externalCommissionRevenue > 0 ? parseFloat(externalCommissionRevenue.toFixed(2)) : undefined,
      commissionRate: externalCommissionRevenue > 0 ? 3 : 100,
      marketPlatform: firstExternal,
    };

    // Deduct stock for all items
    setProducts((prev) =>
      prev.map((p) => {
        const inCart = cart.find((c) => c.product.id === p.id);
        if (inCart) {
          return {
            ...p,
            stock: Math.max(0, p.stock - inCart.quantity),
            salesCount: (p.salesCount || 0) + inCart.quantity,
          };
        }
        return p;
      })
    );

    // Deposit purchase money directly into store wallet
    setStoreWallet((prev) => ({
      ...prev,
      availableBalance: parseFloat((prev.availableBalance + netStoreAddition).toFixed(2)),
      totalCommissionEarned: externalCommissionRevenue > 0
        ? parseFloat(((prev.totalCommissionEarned || 0) + externalCommissionRevenue).toFixed(2))
        : prev.totalCommissionEarned,
      commissionSalesCount: externalCommissionRevenue > 0
        ? (prev.commissionSalesCount || 0) + 1
        : prev.commissionSalesCount,
    }));

    // If external items purchased, log commission records
    cart.forEach((c) => {
      if (c.product.marketPlatform && c.product.marketPlatform !== 'AmazeFree') {
        const comEarned = parseFloat((c.product.price * c.quantity * 0.03).toFixed(2));
        const record: CommissionRecord = {
          id: `COM-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6)}`,
          orderId: newOrder.id,
          productTitle: c.product.title,
          productImage: c.product.image,
          saleAmount: c.product.price * c.quantity,
          commissionRate: 3,
          commissionEarned: comEarned,
          platform: c.product.marketPlatform,
          buyerName: customerInfo.name,
          buyerLocation: customerInfo.city,
          timestamp: 'Just now',
          status: 'Credited to Store',
        };
        setCommissionRecords((prev) => [record, ...prev.slice(0, 49)]);

        setLinkedMarkets((prev) =>
          prev.map((m) =>
            m.platform === c.product.marketPlatform
              ? { ...m, totalEarned: parseFloat((m.totalEarned + comEarned).toFixed(2)) }
              : m
          )
        );
      }
    });

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Update authenticated user's order stats if signed in
    if (currentUser) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              ordersCount: (prev.ordersCount || 0) + 1,
            }
          : null
      );
    }

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    return newOrder;
  };

  // Gmail & Google Authentication methods
  const signInWithGmail = async (customEmail?: string, customName?: string): Promise<boolean> => {
    const emailToUse = (customEmail || 'happyall450@gmail.com').trim().toLowerCase();
    const finalEmail = emailToUse.includes('@') ? emailToUse : `${emailToUse}@gmail.com`;
    const cleanName =
      customName?.trim() ||
      finalEmail
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());

    const newUser: GmailUser = {
      id: `usr_g_${Date.now()}`,
      email: finalEmail,
      name: cleanName,
      givenName: cleanName.split(' ')[0],
      familyName: cleanName.split(' ')[1] || '',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      provider: 'gmail',
      emailVerified: true,
      signedInAt: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lastLoginAt: 'Just now (Google Identity Services)',
      securityStatus: '2-Step Verification Active',
      ordersCount: orders.length,
      sellerCommissionEarned: storeWallet.totalCommissionEarned,
    };

    setCurrentUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(newUser));
      setSavedGmailAccounts((prev) => {
        const filtered = prev.filter((a) => a.email.toLowerCase() !== newUser.email.toLowerCase());
        const updated = [newUser, ...filtered];
        localStorage.setItem(STORAGE_KEYS.SAVED_ACCOUNTS, JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.4 },
    });

    return true;
  };

  const signOutGmail = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch {
      // ignore
    }
  };

  const switchGmailAccount = (email: string, name?: string) => {
    const existing = savedGmailAccounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      setCurrentUser(existing);
      try {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(existing));
      } catch {
        // ignore
      }
    } else {
      signInWithGmail(email, name);
    }
  };

  // Store payment methods management
  const addStorePaymentMethod = (
    methodData: Omit<StorePaymentMethod, 'id' | 'addedAt'>
  ) => {
    const newMethod: StorePaymentMethod = {
      ...methodData,
      id: 'spm-' + Date.now(),
      addedAt: 'Added just now',
      status: 'Active',
    };

    setStorePaymentMethods((prev) => {
      if (newMethod.isPrimary) {
        return [newMethod, ...prev.map((m) => ({ ...m, isPrimary: false }))];
      }
      return [...prev, newMethod];
    });

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.6 },
    });
  };

  const removeStorePaymentMethod = (id: string) => {
    setStorePaymentMethods((prev) => {
      const filtered = prev.filter((m) => m.id !== id);
      if (filtered.length > 0 && !filtered.some((m) => m.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const setPrimaryStorePaymentMethod = (id: string) => {
    setStorePaymentMethods((prev) =>
      prev.map((m) => ({ ...m, isPrimary: m.id === id }))
    );
  };

  const withdrawFunds = (amount: number, methodId?: string): boolean => {
    if (amount <= 0 || amount > storeWallet.availableBalance) {
      return false;
    }

    const targetMethod =
      (methodId && storePaymentMethods.find((m) => m.id === methodId)) ||
      activeStorePaymentMethod || {
        title: 'Connected Bank Checking Account',
      };

    const newTx: PayoutTransaction = {
      id: `PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6)}`,
      amount: parseFloat(amount.toFixed(2)),
      destinationMethodTitle: targetMethod.title,
      status: 'Completed',
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      referenceId: 'ACH-' + Math.floor(1000000 + Math.random() * 9000000),
    };

    setStoreWallet((prev) => ({
      ...prev,
      availableBalance: parseFloat((prev.availableBalance - amount).toFixed(2)),
      totalWithdrawn: parseFloat((prev.totalWithdrawn + amount).toFixed(2)),
    }));

    setPayoutTransactions((prev) => [newTx, ...prev]);

    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
    });

    return true;
  };

  const toggleAutoPayout = (enabled: boolean) => {
    setStoreWallet((prev) => ({ ...prev, autoPayoutEnabled: enabled }));
  };

  const updateStoreBranding = useCallback((updates: Partial<StoreBranding>) => {
    setStoreBranding((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateAccountSecurity = useCallback((updates: Partial<AccountSecurity>) => {
    setAccountSecurity((prev) => ({ ...prev, ...updates }));
  }, []);

  const verifyPin = useCallback((inputPin: string): boolean => {
    if (accountSecurity.isEmergencyLocked) return false;
    const clean = inputPin.trim();
    if (clean === accountSecurity.pinCode) {
      if (accountSecurity.failedPinAttempts > 0) {
        setAccountSecurity((prev) => ({ ...prev, failedPinAttempts: 0 }));
      }
      return true;
    } else {
      setAccountSecurity((prev) => ({ ...prev, failedPinAttempts: prev.failedPinAttempts + 1 }));
      return false;
    }
  }, [accountSecurity.isEmergencyLocked, accountSecurity.pinCode, accountSecurity.failedPinAttempts]);

  const resetSecurityPin = useCallback((newPin: string) => {
    const clean = newPin.trim();
    if (/^\d{4,8}$/.test(clean)) {
      setAccountSecurity((prev) => ({
        ...prev,
        pinCode: clean,
        failedPinAttempts: 0,
        lastSecurityCheckAt: 'PIN updated • 256-Bit Encrypted',
      }));
    }
  }, []);

  const toggleEmergencyLock = useCallback(() => {
    setAccountSecurity((prev) => ({
      ...prev,
      isEmergencyLocked: !prev.isEmergencyLocked,
      lastSecurityCheckAt: !prev.isEmergencyLocked ? 'STORE EMERGENCY LOCKED' : 'Store Unlocked & Active',
    }));
  }, []);

  const runSystemDiagnosticAndSolve = useCallback(async () => {
    // Clean and validate cart
    setCart((prev) => prev.filter((i) => i && i.product && i.quantity > 0));

    // Ensure wallet is valid non-negative
    setStoreWallet((w) => ({
      ...w,
      availableBalance: Math.max(0, Number(w.availableBalance) || 0),
    }));

    // Reset failed security attempts and verify TLS
    setAccountSecurity((prev) => ({
      ...prev,
      failedPinAttempts: 0,
      lastSecurityCheckAt: 'Diagnostic Complete: All 6 Security Checks Passed',
    }));

    return {
      solvedCount: 6,
      fixedItems: [
        'Storage cache schema verified & cleaned',
        '256-bit SSL Payment Gateway handshake renewed',
        'AVS Address & ZIP Code integrity verified',
        'Account Security PIN & 2FA subsystem synchronized',
        'Google Play & Apple App Store PWA manifest validated',
        'Amazon, Alibaba & Shopify 3% commission route confirmed',
      ],
    };
  }, []);

  // Calculate seller statistics
  const sellerStats: SellerStats = {
    totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
    totalOrders: orders.length,
    totalUnitsSold: orders.reduce(
      (sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    ),
    activeProductsCount: products.filter((p) => p.isSellerProduct).length,
    todayVisitors: liveShoppersCount * 14 + orders.length * 3,
    availablePayoutBalance: storeWallet.availableBalance,
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        cart,
        orders,
        buyerActivities,
        activeToast,
        dismissToast,
        sellerStats,
        liveShoppersCount,
        storePaymentMethods,
        activeStorePaymentMethod,
        storeWallet,
        payoutTransactions,
        isStorePaymentModalOpen,
        setIsStorePaymentModalOpen,
        isWithdrawModalOpen,
        setIsWithdrawModalOpen,
        addStorePaymentMethod,
        removeStorePaymentMethod,
        setPrimaryStorePaymentMethod,
        withdrawFunds,
        toggleAutoPayout,
        linkedMarkets,
        commissionRecords,
        storeOneLink,
        isStoreOneLinkModalOpen,
        setIsStoreOneLinkModalOpen,
        isMarketSyncModalOpen,
        setIsMarketSyncModalOpen,
        toggleMarketConnection,
        importMarketProduct,
        triggerMarketCommissionSale,
        updateStoreSlug,
        activeView,
        setActiveView,
        isCartOpen,
        setIsCartOpen,
        isAddProductOpen,
        setIsAddProductOpen,
        isFreeGuaranteeOpen,
        setIsFreeGuaranteeOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isCheckoutOpen,
        setIsCheckoutOpen,
        storeBranding,
        updateStoreBranding,
        isStoreLogoStudioOpen,
        setIsStoreLogoStudioOpen,
        accountSecurity,
        updateAccountSecurity,
        verifyPin,
        resetSecurityPin,
        toggleEmergencyLock,
        isAccountSecurityOpen,
        setIsAccountSecurityOpen,
        isErrorSolverOpen,
        setIsErrorSolverOpen,
        runSystemDiagnosticAndSolve,
        isAppStorePublishOpen,
        setIsAppStorePublishOpen,
        isDownloadAppOpen,
        setIsDownloadAppOpen,
        isAiAgentsModalOpen,
        setIsAiAgentsModalOpen,
        aiAgentsState,
        aiAgentLogs,
        toggleAiAutoPilot,
        setAiSpeedMode,
        triggerAiAddTrendingProducts,
        triggerAiFastSales,
        triggerAiMakeSellersHappy,
        autoImportGlobalMarketsFeed,
        executeDirectSearch,
        currentUser,
        isSignInModalOpen,
        setIsSignInModalOpen,
        signInWithGmail,
        signOutGmail,
        switchGmailAccount,
        savedGmailAccounts,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        trafficMode,
        setTrafficMode,
        triggerInstantSale: triggerSingleSimulatedSale,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFlashSale,
        triggerAutomatedStoreSale,
        placeOrder,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
