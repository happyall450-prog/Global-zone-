import React, { useState } from 'react';
import {
  X,
  DollarSign,
  Building2,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  Clock,
  Download,
  CreditCard,
  Sparkles
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const WithdrawModal: React.FC = () => {
  const {
    isWithdrawModalOpen,
    setIsWithdrawModalOpen,
    storeWallet,
    storePaymentMethods,
    activeStorePaymentMethod,
    withdrawFunds,
    payoutTransactions,
    setIsStorePaymentModalOpen,
  } = useMarketplace();

  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [selectedMethodId, setSelectedMethodId] = useState<string>(
    activeStorePaymentMethod?.id || (storePaymentMethods[0]?.id || '')
  );
  const [payoutSpeed, setPayoutSpeed] = useState<'instant' | 'standard'>('instant');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isWithdrawModalOpen) return null;

  const handleQuickAmount = (amount: number) => {
    const capped = Math.min(amount, storeWallet.availableBalance);
    setWithdrawAmount(capped.toFixed(2));
    setErrorMessage(null);
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);

    if (isNaN(amountNum) || amountNum <= 0) {
      setErrorMessage('Please enter a valid withdrawal amount.');
      return;
    }

    if (amountNum > storeWallet.availableBalance) {
      setErrorMessage(
        `Amount exceeds your available balance of $${storeWallet.availableBalance.toFixed(2)}.`
      );
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    setTimeout(() => {
      const success = withdrawFunds(amountNum, selectedMethodId);
      setIsProcessing(false);
      if (success) {
        const dest =
          storePaymentMethods.find((m) => m.id === selectedMethodId)?.title ||
          'Connected Bank Account';
        setSuccessMessage(
          `$${amountNum.toFixed(2)} successfully sent to ${dest}!`
        );
        setWithdrawAmount('');
      } else {
        setErrorMessage('Withdrawal failed. Please check your balance.');
      }
    }, 800);
  };

  const handleClose = () => {
    setIsWithdrawModalOpen(false);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="withdraw-funds-modal"
        className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-[#131921] text-white p-4 sm:p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-white">
                Withdraw Store Sales Earnings
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Transfer money earned from buying customers directly into your account.
              </p>
            </div>
          </div>
          <button
            id="close-withdraw-modal-btn"
            onClick={handleClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-gray-900 text-white p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">
              Available Store Balance
            </span>
            <span className="bg-emerald-500/30 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1" />
              0% Fee Instant Payout
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white mt-1">
            ${storeWallet.availableBalance.toFixed(2)}
          </div>
          <div className="flex items-center justify-between text-xs text-emerald-100/80 mt-2 pt-2 border-t border-emerald-700/50">
            <span>Total Lifetime Payouts: <strong>${storeWallet.totalWithdrawn.toFixed(2)}</strong></span>
            <span>Platform Cut: <strong className="text-emerald-300">$0.00 (Free)</strong></span>
          </div>
        </div>

        {/* Body Form */}
        <div className="p-5 sm:p-6 space-y-5 text-xs">
          {successMessage ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Transfer Initiated!</h3>
              <p className="text-gray-700 text-xs">{successMessage}</p>
              <div className="flex justify-center gap-2 pt-2">
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded text-xs cursor-pointer"
                >
                  Make Another Withdrawal
                </button>
                <button
                  onClick={handleClose}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded text-xs cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleWithdraw} className="space-y-4">
              {/* Amount input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-800">Withdrawal Amount ($ USD)</label>
                  <span className="text-[11px] text-gray-500">
                    Max: ${storeWallet.availableBalance.toFixed(2)}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 font-bold">
                    $
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max={storeWallet.availableBalance}
                    required
                    value={withdrawAmount}
                    onChange={(e) => {
                      setWithdrawAmount(e.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="0.00"
                    className="w-full pl-8 pr-3 py-2.5 text-base font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                {/* Quick amount buttons */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(25)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded font-semibold text-center cursor-pointer"
                  >
                    $25
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(50)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded font-semibold text-center cursor-pointer"
                  >
                    $50
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(100)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded font-semibold text-center cursor-pointer"
                  >
                    $100
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickAmount(storeWallet.availableBalance)}
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 py-1 px-2 rounded font-bold text-center cursor-pointer"
                  >
                    All (${storeWallet.availableBalance.toFixed(2)})
                  </button>
                </div>
              </div>

              {/* Destination method */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-gray-800">Deposit Destination Account</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsWithdrawModalOpen(false);
                      setIsStorePaymentModalOpen(true);
                    }}
                    className="text-emerald-700 hover:underline font-semibold"
                  >
                    + Manage Accounts
                  </button>
                </div>
                <select
                  value={selectedMethodId}
                  onChange={(e) => setSelectedMethodId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-xs font-semibold text-gray-900 cursor-pointer focus:outline-none"
                >
                  {storePaymentMethods.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title} {m.isPrimary ? '(Primary Default)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transfer Speed Option */}
              <div>
                <label className="block font-bold text-gray-800 mb-1.5">Payout Speed</label>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setPayoutSpeed('instant')}
                    className={`p-3 rounded-lg border cursor-pointer transition flex items-start space-x-2.5 ${
                      payoutSpeed === 'instant'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900">Instant Transfer</div>
                      <div className="text-[11px] text-gray-500">Arrives in ~1 minute • $0 Fee</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPayoutSpeed('standard')}
                    className={`p-3 rounded-lg border cursor-pointer transition flex items-start space-x-2.5 ${
                      payoutSpeed === 'standard'
                        ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-500'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-gray-900">Standard ACH</div>
                      <div className="text-[11px] text-gray-500">Next business morning • $0 Fee</div>
                    </div>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-700 bg-red-50 border border-red-200 rounded p-2.5 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing || storeWallet.availableBalance <= 0}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-extrabold py-3 px-4 rounded-full text-xs shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer border border-[#fcd200] disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Transmitting Wire Transfer...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gray-800" />
                    <span>Confirm & Withdraw Funds to Account</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Recent Payout History */}
          <div className="border-t border-gray-200 pt-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-xs">Recent Payout Transactions</span>
              <span className="text-[11px] text-gray-500">All transfers verified</span>
            </div>

            <div className="space-y-2">
              {payoutTransactions.slice(0, 3).map((tx, idx) => (
                <div
                  key={`${tx.id || 'tx'}-${idx}`}
                  className="bg-gray-50 border border-gray-200 rounded-md p-2.5 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">${tx.amount.toFixed(2)}</div>
                      <div className="text-[11px] text-gray-500 truncate max-w-[200px]">
                        {tx.destinationMethodTitle}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">
                      {tx.status}
                    </span>
                    <div className="text-[10px] text-gray-400 mt-0.5">{tx.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
