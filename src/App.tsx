import React from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/Navbar';
import { SubNavbar } from './components/SubNavbar';
import { LiveTrafficControlBar } from './components/LiveTrafficControlBar';
import { MarketplaceCatalog } from './components/MarketplaceCatalog';
import { SellerHubModal } from './components/SellerHubModal';
import { OrdersView } from './components/OrdersView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AddProductModal } from './components/AddProductModal';
import { FreeGuaranteeModal } from './components/FreeGuaranteeModal';
import { StorePaymentModal } from './components/StorePaymentModal';
import { WithdrawModal } from './components/WithdrawModal';
import { StoreOneLinkModal } from './components/StoreOneLinkModal';
import { BigMarketCommissionModal } from './components/BigMarketCommissionModal';
import { LiveSalesToast } from './components/LiveSalesToast';
import { StoreLogoStudioModal } from './components/StoreLogoStudioModal';
import { AccountSecurityModal } from './components/AccountSecurityModal';
import { ErrorSolverModal } from './components/ErrorSolverModal';
import { AppStorePublishModal } from './components/AppStorePublishModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { SignInModal } from './components/SignInModal';
import { AiAgentsModal } from './components/AiAgentsModal';
import { Footer } from './components/Footer';

const MarketplaceContent: React.FC = () => {
  const { activeView } = useMarketplace();

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] text-gray-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bars */}
      <Navbar />
      <SubNavbar />
      <LiveTrafficControlBar />

      {/* Main App Content View */}
      <main className="flex-1">
        {activeView === 'marketplace' && <MarketplaceCatalog />}
        {activeView === 'seller-hub' && <SellerHubModal />}
        {activeView === 'orders' && <OrdersView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-overs & Modals */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AddProductModal />
      <FreeGuaranteeModal />
      <StorePaymentModal />
      <WithdrawModal />
      <StoreOneLinkModal />
      <BigMarketCommissionModal />
      <LiveSalesToast />
      <StoreLogoStudioModal />
      <AccountSecurityModal />
      <ErrorSolverModal />
      <AppStorePublishModal />
      <DownloadAppModal />
      <SignInModal />
      <AiAgentsModal />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}
