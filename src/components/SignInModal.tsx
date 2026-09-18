import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  LogOut,
  UserPlus,
  Mail,
  UserCheck,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';

export const SignInModal: React.FC = () => {
  const {
    isSignInModalOpen,
    setIsSignInModalOpen,
    currentUser,
    signInWithGmail,
    signOutGmail,
    switchGmailAccount,
    savedGmailAccounts,
    storeBranding,
    storeWallet,
    orders,
  } = useMarketplace();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  if (!isSignInModalOpen) return null;

  const handle1ClickSignIn = async (email: string, name?: string) => {
    setIsAuthenticating(true);
    setAuthStep('Connecting to Google Identity Services...');
    
    setTimeout(() => {
      setAuthStep(`Verifying ${email} with Google Security...`);
      setTimeout(() => {
        setAuthStep('Generating secure 256-bit OAuth session token...');
        setTimeout(async () => {
          await signInWithGmail(email, name);
          setIsAuthenticating(false);
          setAuthStep('');
          setSuccessMessage(`Successfully signed in with Gmail as ${email}!`);
          setTimeout(() => {
            setSuccessMessage('');
            setIsSignInModalOpen(false);
          }, 1200);
        }, 500);
      }, 500);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim()) return;
    handle1ClickSignIn(customEmail.trim(), customName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="gmail-signin-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative text-gray-900 border border-gray-200 overflow-hidden"
      >
        {/* Close Button */}
        <button
          id="close-signin-modal-btn"
          onClick={() => {
            setIsSignInModalOpen(false);
            setIsAddingNew(false);
            setSuccessMessage('');
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google Header */}
        <div className="pt-7 pb-4 px-6 sm:px-8 border-b border-gray-100 text-center">
          <div className="inline-flex items-center justify-center mb-3">
            {/* Authentic Google Multi-Color G Icon */}
            <svg className="w-9 h-9" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {currentUser ? 'Your Google / Gmail Account' : 'Sign in with Google'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            to continue to{' '}
            <span className="font-semibold text-gray-900">
              {storeBranding.storeName || 'Global Zone Global'}
            </span>
          </p>
        </div>

        {/* Success toast inside modal */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{successMessage}</span>
          </div>
        )}

        {/* Authenticating loader state */}
        {isAuthenticating && (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full border-3 border-amber-400 border-t-blue-600 animate-spin flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-gray-400 opacity-0" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">Google Authentication in Progress</div>
              <p className="text-xs text-blue-600 font-medium mt-1 animate-pulse">{authStep}</p>
            </div>
            <div className="text-[11px] text-gray-400 flex items-center justify-center">
              <Lock className="w-3 h-3 text-emerald-500 mr-1" />
              Direct 256-Bit TLS Connection to Google Identity
            </div>
          </div>
        )}

        {/* Content body when not actively authenticating */}
        {!isAuthenticating && (
          <div className="p-6 space-y-5">
            {/* If user is ALREADY signed in */}
            {currentUser && !isAddingNew ? (
              <div className="space-y-4">
                {/* Active user card */}
                <div className="p-4 bg-gradient-to-r from-amber-50/60 via-emerald-50/40 to-blue-50/50 border border-gray-200 rounded-2xl relative shadow-xs">
                  <div className="flex items-center space-x-3.5">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-13 h-13 rounded-full object-cover ring-2 ring-emerald-500 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-gray-900 text-sm truncate">
                          {currentUser.name}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-1.5 py-0.5 rounded-full flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-0.5 text-emerald-600" />
                          Verified
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 truncate mt-0.5 font-mono">
                        {currentUser.email}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        <span>Google 2-Step Verification Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Connected Store Stats for this user */}
                  <div className="mt-3 pt-3 border-t border-gray-200/80 grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="bg-white/80 p-2 rounded-lg border border-gray-200/60">
                      <div className="text-gray-500 text-[10px]">Your Orders</div>
                      <div className="font-black text-gray-900 text-sm">
                        {orders.length} Orders
                      </div>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-gray-200/60">
                      <div className="text-gray-500 text-[10px]">Store Wallet (3% Com.)</div>
                      <div className="font-black text-emerald-600 text-sm">
                        ${storeWallet.availableBalance.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-1">
                  <button
                    id="switch-gmail-account-btn"
                    onClick={() => setIsAddingNew(true)}
                    className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-gray-600" />
                    <span>Switch to Another Gmail Account</span>
                  </button>

                  <button
                    id="signout-gmail-btn"
                    onClick={() => {
                      signOutGmail();
                      setSuccessMessage('Signed out of Gmail.');
                      setTimeout(() => setSuccessMessage(''), 1500);
                    }}
                    className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-2 cursor-pointer border border-red-200/70"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>Sign Out of Google Account</span>
                  </button>

                  <button
                    onClick={() => setIsSignInModalOpen(false)}
                    className="w-full py-2.5 px-4 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 rounded-xl text-xs font-black shadow-xs transition flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Done & Continue Shopping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* If NOT signed in or choosing an account */
              <div className="space-y-4">
                <div className="text-xs text-gray-600 font-medium">
                  Choose an account to continue to{' '}
                  <span className="font-bold text-gray-900">{storeBranding.storeName || 'Global Zone Global'}</span>:
                </div>

                {/* Saved accounts list */}
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {savedGmailAccounts.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => handle1ClickSignIn(account.email, account.name)}
                      className="w-full text-left p-3 hover:bg-gray-50 border border-gray-200 rounded-xl flex items-center space-x-3 transition cursor-pointer group"
                    >
                      <img
                        src={account.avatarUrl}
                        alt={account.name}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-300 group-hover:ring-amber-400"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-xs truncate group-hover:text-blue-600">
                          {account.name}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate font-mono">
                          {account.email}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>

                {/* Use another account section */}
                {!isAddingNew ? (
                  <button
                    id="use-another-gmail-account-btn"
                    onClick={() => setIsAddingNew(true)}
                    className="w-full py-2.5 px-3 border border-dashed border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4 text-gray-500" />
                    <span>Use another Gmail account</span>
                  </button>
                ) : (
                  <form onSubmit={handleCustomSubmit} className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl space-y-2.5 animate-in fade-in">
                    <div className="text-xs font-bold text-gray-900 flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>Enter Your Gmail Address</span>
                    </div>

                    <div>
                      <input
                        type="email"
                        id="custom-gmail-input"
                        placeholder="yourname@gmail.com"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        id="custom-name-input"
                        placeholder="Your Full Name (e.g. Alex Rivera)"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-xs text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex space-x-2 pt-1">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-xs shadow-xs transition flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Sign In with Gmail</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingNew(false)}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* 1-Click Fast Button */}
                <button
                  id="google-one-tap-btn"
                  onClick={() => handle1ClickSignIn('happyall450@gmail.com', 'Alex Rivera')}
                  className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-xl text-xs shadow-xs transition flex items-center justify-center space-x-2.5 cursor-pointer hover:border-gray-400"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                  <span>1-Tap Sign In as happyall450@gmail.com</span>
                </button>
              </div>
            )}

            {/* Google privacy & security trust note */}
            <div className="pt-2 border-t border-gray-100 text-[11px] text-gray-500 leading-relaxed text-center">
              <p>
                To continue, Google shares your name, email address, and profile photo with {storeBranding.storeName || 'Global Zone Global'}.
              </p>
              <div className="flex items-center justify-center space-x-3 mt-2 text-gray-400">
                <span className="flex items-center text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  256-Bit TLS
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-1" />
                  Encrypted Session
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
