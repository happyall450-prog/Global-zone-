import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  KeyRound,
  Fingerprint,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Check,
  ShieldAlert,
  Server,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../context/MarketplaceContext';

export const AccountSecurityModal: React.FC = () => {
  const {
    isAccountSecurityOpen,
    setIsAccountSecurityOpen,
    accountSecurity,
    updateAccountSecurity,
    resetSecurityPin,
    toggleEmergencyLock,
  } = useMarketplace();

  const [showPin, setShowPin] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [isEditingPin, setIsEditingPin] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  if (!isAccountSecurityOpen) return null;

  const handleCopyPin = () => {
    navigator.clipboard?.writeText(accountSecurity.pinCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newPinInput.trim();
    if (!/^\d{4,8}$/.test(clean)) {
      setSaveAlert('PIN must be 4 to 8 digits long (numbers only).');
      return;
    }

    resetSecurityPin(clean);
    setIsEditingPin(false);
    setNewPinInput('');
    setSaveAlert('Account Security Code successfully updated!');
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTimeout(() => setSaveAlert(null), 3000);
  };

  const handleGenerateRandomPin = () => {
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    setNewPinInput(randomPin);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="account-security-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-[#131921] text-white p-4 sm:p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  Account Security & PIN Code Protection
                </h2>
                <span className="bg-emerald-500/30 text-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40">
                  256-BIT SSL
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Protect your store balance, payouts, and card transactions with 2FA passcode.
              </p>
            </div>
          </div>
          <button
            id="close-account-security-btn"
            onClick={() => setIsAccountSecurityOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emergency Lock Alert Banner if active */}
        {accountSecurity.isEmergencyLocked && (
          <div className="bg-red-500 text-white px-5 py-2.5 flex items-center justify-between text-xs font-bold animate-pulse">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>STORE EMERGENCY FREEZE ACTIVE • All Withdrawals & Payments Paused</span>
            </div>
            <button
              onClick={toggleEmergencyLock}
              className="bg-white text-red-600 hover:bg-red-50 px-2.5 py-1 rounded text-[11px] font-black cursor-pointer shadow-sm"
            >
              Unlock Now
            </button>
          </div>
        )}

        <div className="p-5 sm:p-6 space-y-6 text-xs">
          {/* Main Account Security PIN Showcase Card */}
          <div className="bg-gradient-to-br from-gray-900 via-[#182334] to-gray-900 text-white rounded-xl p-5 border border-gray-800 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                  Your Account Security Code (2FA PIN)
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Active & Verified
              </span>
            </div>

            {/* PIN Display */}
            <div className="bg-[#11161f] border border-gray-700/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="font-mono text-3xl font-black tracking-widest text-amber-400 selection:bg-amber-500">
                  {showPin ? accountSecurity.pinCode : '••••••'}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 cursor-pointer"
                  title={showPin ? 'Hide PIN' : 'Reveal PIN'}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopyPin}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg font-bold flex items-center space-x-1.5 cursor-pointer border border-gray-700 transition"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-300" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPin(!isEditingPin);
                    setNewPinInput('');
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-gray-950 px-3 py-1.5 rounded-lg font-black cursor-pointer shadow transition"
                >
                  {isEditingPin ? 'Cancel' : 'Change PIN'}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 mt-2.5">
              Enter this 6-digit code whenever initiating store withdrawals or modifying linked payout bank methods.
            </p>
          </div>

          {/* Edit PIN Form */}
          {isEditingPin && (
            <form
              onSubmit={handleSaveNewPin}
              className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-3 animate-in fade-in duration-150"
            >
              <div className="font-bold text-gray-900 text-xs flex items-center justify-between">
                <span>Set New Account Security Code</span>
                <button
                  type="button"
                  onClick={handleGenerateRandomPin}
                  className="text-amber-700 hover:text-amber-800 text-[11px] font-bold flex items-center cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Generate Safe 6-Digit PIN
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  maxLength={8}
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 4-8 digit numbers"
                  className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm font-bold tracking-widest text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={newPinInput.length < 4}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg cursor-pointer disabled:opacity-50 transition"
                >
                  Save Code
                </button>
              </div>
            </form>
          )}

          {saveAlert && (
            <div className="bg-emerald-50 text-emerald-800 border border-emerald-300 p-2.5 rounded-lg font-semibold text-center">
              {saveAlert}
            </div>
          )}

          {/* Security Safeguard Toggles */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
              Active Security Guardrails
            </h3>

            <div className="space-y-2">
              {/* Toggle 1: Payout protection */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-900">Require PIN for Bank Payouts & Transfers</div>
                  <div className="text-[11px] text-gray-500">
                    Prompt for Account Security Code before wire transfers or withdrawals are released.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={accountSecurity.requirePinForPayouts}
                  onChange={(e) => updateAccountSecurity({ requirePinForPayouts: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Toggle 2: Order & Card Changes */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-900">Credit Card & AVS 3D Secure Protection</div>
                  <div className="text-[11px] text-gray-500">
                    Run Address Verification (AVS ZIP Check) and simulated 3D Secure on card checkouts.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={accountSecurity.is2FAEnabled}
                  onChange={(e) => updateAccountSecurity({ is2FAEnabled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Anti-phishing Passphrase */}
              <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-bold text-gray-900">Anti-Phishing Secret Phrase</div>
                  <div className="text-[11px] text-gray-500">
                    Displayed on valid store receipts and checkout emails.
                  </div>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                  {accountSecurity.antiPhishingPhrase}
                </span>
              </div>
            </div>
          </div>

          {/* Emergency Lock Section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <div className="font-bold text-red-900 flex items-center">
                  <ShieldAlert className="w-4 h-4 mr-1 text-red-600" />
                  Emergency Account Freeze
                </div>
                <div className="text-[11px] text-red-700 mt-0.5">
                  Immediately halt all outgoing store withdrawals and sensitive modifications if suspicious activity occurs.
                </div>
              </div>
              <button
                type="button"
                onClick={toggleEmergencyLock}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer shadow-sm transition ${
                  accountSecurity.isEmergencyLocked
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {accountSecurity.isEmergencyLocked ? 'Unlock Store' : 'Freeze Store'}
              </button>
            </div>
          </div>

          {/* Status footer info */}
          <div className="text-[11px] text-gray-500 flex items-center justify-between border-t border-gray-200 pt-3">
            <span>Last Security Audit: <strong>{accountSecurity.lastSecurityCheckAt}</strong></span>
            <span className="text-emerald-600 font-semibold flex items-center">
              <Server className="w-3 h-3 mr-1" />
              AES-256 Cloud Vault
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
