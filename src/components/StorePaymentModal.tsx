import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  CreditCard,
  CheckCircle2,
  Plus,
  Trash2,
  Check,
  DollarSign,
  Lock,
  ArrowRight,
  Info,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { StorePaymentMethod, StorePaymentType } from '../types';

export const StorePaymentModal: React.FC = () => {
  const {
    isStorePaymentModalOpen,
    setIsStorePaymentModalOpen,
    storePaymentMethods,
    activeStorePaymentMethod,
    addStorePaymentMethod,
    removeStorePaymentMethod,
    setPrimaryStorePaymentMethod,
    storeWallet,
    toggleAutoPayout,
    setIsWithdrawModalOpen,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'methods' | 'add'>('methods');
  const [selectedType, setSelectedType] = useState<StorePaymentType>('bank');

  // Form states for adding payment method
  const [bankName, setBankName] = useState('JPMorgan Chase Bank');
  const [accountHolder, setAccountHolder] = useState('My Workshop Store LLC');
  const [routingNumber, setRoutingNumber] = useState('021000021');
  const [accountNumber, setAccountNumber] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [debitCardNumber, setDebitCardNumber] = useState('');
  const [debitCardExpiry, setDebitCardExpiry] = useState('12/28');
  const [cashtag, setCashtag] = useState('');
  const [isMakePrimary, setIsMakePrimary] = useState(true);

  if (!isStorePaymentModalOpen) return null;

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();

    let title = '';
    let details = '';

    if (selectedType === 'bank') {
      const last4 = accountNumber ? accountNumber.slice(-4) : '9102';
      title = `${bankName || 'Bank'} Checking (••••${last4})`;
      details = `Routing: ${routingNumber || '021000021'} • Acct: ••••${last4} (Direct Deposit)`;
    } else if (selectedType === 'paypal') {
      title = `PayPal Account (${paypalEmail || 'payments@mystore.com'})`;
      details = `${paypalEmail || 'payments@mystore.com'} • Direct Buyer Sales Deposit`;
    } else if (selectedType === 'debit_card') {
      const last4 = debitCardNumber ? debitCardNumber.slice(-4) : '8831';
      title = `Visa Business Debit (••••${last4})`;
      details = `Card: ••••${last4} • Exp: ${debitCardExpiry} (Instant Card Payout)`;
    } else if (selectedType === 'cashapp') {
      title = `Cash App Handle (${cashtag || '$MyStoreCash'})`;
      details = `${cashtag || '$MyStoreCash'} • Instant Mobile Deposit`;
    }

    addStorePaymentMethod({
      type: selectedType,
      title,
      accountHolder: accountHolder || 'Store Owner',
      accountDetails: details,
      isPrimary: isMakePrimary || storePaymentMethods.length === 0,
      status: 'Active',
    });

    // Reset form
    setAccountNumber('');
    setPaypalEmail('');
    setDebitCardNumber('');
    setCashtag('');
    setActiveTab('methods');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="store-payment-modal"
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-[#131921] text-white p-4 sm:p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  Store Payment & Receiving Methods
                </h2>
                <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  0% Fee Payouts
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Configure where buying customer money is deposited when products are purchased.
              </p>
            </div>
          </div>
          <button
            id="close-store-payment-btn"
            onClick={() => setIsStorePaymentModalOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance & Status Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/60 p-4 border-b border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-gray-500 font-medium">Ready-to-Withdraw Store Balance:</span>
            <div className="text-2xl font-black text-emerald-800 flex items-center mt-0.5">
              ${storeWallet.availableBalance.toFixed(2)}
              <span className="text-[11px] font-semibold text-emerald-700 ml-2 bg-emerald-200/60 px-2 py-0.5 rounded">
                100% Sales Revenue Kept
              </span>
            </div>
            <p className="text-[11px] text-gray-600 mt-0.5">
              Deposited instantly from shopper checkouts and simulated buyer traffic.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsStorePaymentModalOpen(false);
                setIsWithdrawModalOpen(true);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-md text-xs shadow-xs cursor-pointer flex items-center space-x-1"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Withdraw Funds</span>
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-4 pt-2">
          <button
            onClick={() => setActiveTab('methods')}
            className={`py-2 px-4 text-xs font-bold border-b-2 cursor-pointer transition ${
              activeTab === 'methods'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Connected Payout Accounts ({storePaymentMethods.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`py-2 px-4 text-xs font-bold border-b-2 cursor-pointer transition flex items-center space-x-1 ${
              activeTab === 'add'
                ? 'border-emerald-600 text-emerald-800 bg-white rounded-t'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Payment Method</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
          {activeTab === 'methods' ? (
            <div className="space-y-4">
              {/* Explanation Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start space-x-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Automated Sales Deposit Destination:</span>
                  <p className="mt-0.5 text-amber-800">
                    Whenever any customer buys an item in the marketplace, money is automatically
                    credited to your store wallet and routed to your designated primary payout account.
                  </p>
                </div>
              </div>

              {/* List of Accounts */}
              <div className="space-y-3">
                {storePaymentMethods.map((method) => {
                  const isPrimary = method.isPrimary;
                  return (
                    <div
                      key={method.id}
                      className={`p-4 rounded-lg border transition ${
                        isPrimary
                          ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500/50 shadow-xs'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              isPrimary
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {method.type === 'bank' ? (
                              <Building2 className="w-4 h-4" />
                            ) : method.type === 'paypal' ? (
                              <DollarSign className="w-4 h-4" />
                            ) : method.type === 'cashapp' ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <CreditCard className="w-4 h-4" />
                            )}
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                                {method.title}
                              </h4>
                              {isPrimary && (
                                <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center">
                                  <Check className="w-3 h-3 mr-0.5 stroke-[3]" />
                                  Active Receiving Method
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">{method.accountDetails}</p>
                            <div className="flex items-center space-x-3 text-[11px] text-gray-500 mt-1">
                              <span>Holder: <strong className="text-gray-700">{method.accountHolder}</strong></span>
                              <span>•</span>
                              <span className="text-emerald-700 font-semibold flex items-center">
                                <ShieldCheck className="w-3 h-3 mr-1" />
                                {method.status || 'Verified'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 self-end sm:self-center">
                          {!isPrimary && (
                            <button
                              onClick={() => setPrimaryStorePaymentMethod(method.id)}
                              className="text-xs font-bold text-gray-700 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-100/70 border border-gray-300 px-2.5 py-1.5 rounded cursor-pointer transition"
                            >
                              Set as Default
                            </button>
                          )}

                          {storePaymentMethods.length > 1 && (
                            <button
                              onClick={() => removeStorePaymentMethod(method.id)}
                              className="text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 cursor-pointer"
                              title="Delete method"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Auto Payout Setting */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-gray-900">Automatic Payout Forwarding</div>
                  <p className="text-gray-500 text-[11px] mt-0.5">
                    Automatically wire product sales directly to your account immediately upon customer purchase.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={storeWallet.autoPayoutEnabled}
                    onChange={(e) => toggleAutoPayout(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Add More Button */}
              <button
                onClick={() => setActiveTab('add')}
                className="w-full py-2.5 border-2 border-dashed border-gray-300 hover:border-emerald-600 text-gray-700 hover:text-emerald-700 font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 cursor-pointer transition"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Receiving Account (Bank / PayPal / Card)</span>
              </button>
            </div>
          ) : (
            /* Add Payment Method Form */
            <form onSubmit={handleAddMethod} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1.5">
                  Select Payout Receiving Method Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedType('bank')}
                    className={`p-2.5 rounded-md border text-center font-bold flex flex-col items-center justify-center space-y-1 cursor-pointer transition ${
                      selectedType === 'bank'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-emerald-700" />
                    <span>Bank (ACH)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('paypal')}
                    className={`p-2.5 rounded-md border text-center font-bold flex flex-col items-center justify-center space-y-1 cursor-pointer transition ${
                      selectedType === 'paypal'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('debit_card')}
                    className={`p-2.5 rounded-md border text-center font-bold flex flex-col items-center justify-center space-y-1 cursor-pointer transition ${
                      selectedType === 'debit_card'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <span>Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedType('cashapp')}
                    className={`p-2.5 rounded-md border text-center font-bold flex flex-col items-center justify-center space-y-1 cursor-pointer transition ${
                      selectedType === 'cashapp'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-emerald-600" />
                    <span>Cash App</span>
                  </button>
                </div>
              </div>

              {/* Method-specific inputs */}
              {selectedType === 'bank' && (
                <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                  <div className="font-bold text-gray-900 text-xs">Bank Direct Deposit (ACH / Wire)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Bank Name</label>
                      <input
                        type="text"
                        required
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="e.g. Chase, Wells Fargo, Bank of America"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Account Holder Full Name</label>
                      <input
                        type="text"
                        required
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        placeholder="e.g. My Workshop Store LLC"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Routing Number (9 Digits)</label>
                      <input
                        type="text"
                        required
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        placeholder="021000021"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Account Number</label>
                      <input
                        type="password"
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        placeholder="••••••••••4829"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'paypal' && (
                <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                  <div className="font-bold text-gray-900 text-xs">PayPal Merchant Email</div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">PayPal Email Address</label>
                    <input
                      type="email"
                      required
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="e.g. happyall450@gmail.com"
                      className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Account Holder Name</label>
                    <input
                      type="text"
                      required
                      value={accountHolder}
                      onChange={(e) => setAccountHolder(e.target.value)}
                      placeholder="Store Owner / Business Name"
                      className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white text-xs"
                    />
                  </div>
                </div>
              )}

              {selectedType === 'debit_card' && (
                <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                  <div className="font-bold text-gray-900 text-xs">Debit Card for Instant Payouts</div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Debit Card Number (16 Digits)</label>
                    <input
                      type="text"
                      required
                      value={debitCardNumber}
                      onChange={(e) => setDebitCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white font-mono text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={debitCardExpiry}
                        onChange={(e) => setDebitCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1 font-medium">Cardholder Name</label>
                      <input
                        type="text"
                        value={accountHolder}
                        onChange={(e) => setAccountHolder(e.target.value)}
                        placeholder="Name on card"
                        className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedType === 'cashapp' && (
                <div className="space-y-3 bg-gray-50 border border-gray-200 rounded-lg p-3.5">
                  <div className="font-bold text-gray-900 text-xs">Cash App Mobile Payout</div>
                  <div>
                    <label className="block text-gray-600 mb-1 font-medium">Cash App $Cashtag</label>
                    <input
                      type="text"
                      required
                      value={cashtag}
                      onChange={(e) => setCashtag(e.target.value)}
                      placeholder="$MyStoreHandle"
                      className="w-full border border-gray-300 rounded px-3 py-1.5 bg-white font-mono text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="make-primary-chk"
                  checked={isMakePrimary}
                  onChange={(e) => setIsMakePrimary(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <label htmlFor="make-primary-chk" className="text-gray-700 font-medium">
                  Set this as my primary method to receive all product sales money
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('methods')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-2 rounded-md shadow-xs cursor-pointer flex items-center space-x-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save & Activate Payment Method</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4 text-[11px] text-gray-500 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-emerald-800 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit Encrypted Direct Deposit Channel</span>
          </div>
          <span>AmazeFree 0% Fee Guarantee</span>
        </div>
      </div>
    </div>
  );
};
