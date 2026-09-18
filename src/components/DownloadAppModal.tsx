import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Smartphone,
  Apple,
  Monitor,
  CheckCircle2,
  Sparkles,
  QrCode,
  Share2,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  Zap,
  Star,
  Check,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../context/MarketplaceContext';
import { StoreLogo } from './StoreLogo';

export const DownloadAppModal: React.FC = () => {
  const {
    isDownloadAppOpen,
    setIsDownloadAppOpen,
    storeBranding,
    storeOneLink,
    setIsAppStorePublishOpen,
  } = useMarketplace();

  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [activePlatformTab, setActivePlatformTab] = useState<'android' | 'ios' | 'desktop'>('android');

  // Listen for browser PWA beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already in standalone / installed mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isDownloadAppOpen) return null;

  const handle1ClickInstall = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      setInstallPrompt(null);
    } else {
      // Direct notification and guide trigger
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setDownloadSuccess('Installing app... Check browser prompt or Home Screen!');
      setTimeout(() => setDownloadSuccess(null), 3500);
    }
  };

  const handleDownloadAndroidApk = () => {
    const manifestData = {
      app_name: storeBranding.storeName || 'Ameez Store Pro',
      package_name: 'com.ameez.storepro',
      version: '2.4.0',
      type: 'Android WebAPK Bundle',
      store_url: storeOneLink.storeUrl,
      permissions: ['INTERNET', 'VIBRATE', 'ACCESS_NETWORK_STATE'],
      pwa_target: 'standalone',
      generated_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(manifestData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Global-Zone-Global-Android-v2.4.apk.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Android APK Package downloaded! Ready to install.');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadIosConfig = () => {
    const configData = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>FullScreen</key>
      <true/>
      <key>Icon</key>
      <data></data>
      <key>IsRemovable</key>
      <true/>
      <key>Label</key>
      <string>${storeBranding.storeName || 'Global zone Global'}</string>
      <key>PayloadIdentifier</key>
      <string>com.globalzone.global.webclip</string>
      <key>PayloadType</key>
      <string>com.apple.webClip.managed</string>
      <key>PayloadUUID</key>
      <string>98E2A2E2-8419-4C8E-9214-0FA89B100234</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>Precomposed</key>
      <true/>
      <key>URL</key>
      <string>${storeOneLink.storeUrl}</string>
    </dict>
  </array>
  <key>PayloadDisplayName</key>
  <string>${storeBranding.storeName || 'Global zone Global'}</string>
  <key>PayloadIdentifier</key>
  <string>com.globalzone.global.profile</string>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>48194721-ABCD-4321-9988-1234567890AB</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`;

    const blob = new Blob([configData], { type: 'application/x-apple-aspen-config' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ameez-Store-Pro.mobileconfig`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('iOS WebClip Profile downloaded! Open to install on Apple device.');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadDesktopApp = () => {
    const desktopBundle = {
      app_name: storeBranding.storeName || 'Ameez Store Pro',
      target: 'Windows 11 / 10 & macOS Desktop App',
      pwa_url: storeOneLink.storeUrl,
      launcher_icon: 'ameez-icon.ico',
      display: 'standalone',
      window_size: { width: 1280, height: 850 },
      single_instance: true,
    };

    const blob = new Blob([JSON.stringify(desktopBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Ameez-Store-Pro-Desktop-Launcher.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Desktop App package downloaded! Ready to install.');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="download-app-modal-container"
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#131921] via-[#1f2937] to-[#111827] text-white p-5 sm:p-6 rounded-t-2xl relative">
          <button
            id="close-download-app-modal-btn"
            onClick={() => setIsDownloadAppOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-lg flex-shrink-0">
              <Download className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-amber-400 text-gray-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  OFFICIAL APP
                </span>
                <span className="text-emerald-400 text-xs font-semibold flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified 100% Safe
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Download {storeBranding.storeName || 'Ameez Store Pro'} App
              </h2>
              <p className="text-xs text-gray-300 mt-0.5">
                Install directly on your phone or computer. Zero app store fees, lightning fast shopping & instant order tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Success alert message */}
        {downloadSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 p-3 text-xs text-emerald-800 font-bold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Success</span>
          </div>
        )}

        {/* Main Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {/* Featured App Showcase Card */}
          <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border border-amber-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#131921] to-[#232f3e] p-2 flex items-center justify-center text-white shadow-md border-2 border-amber-400">
                <StoreLogo size="sm" showTagline={false} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-black text-gray-900">
                    {storeBranding.storeName || 'Ameez Store Pro'}
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded">
                    PRO v2.4
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                    <span>4.9</span>
                  </div>
                  <span>•</span>
                  <span>14,280+ Active Users</span>
                  <span>•</span>
                  <span>Free Download</span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  Offline-ready • Push Notifications • 3% Big Market Earnings
                </div>
              </div>
            </div>

            {/* Big 1-Click Install Button */}
            <button
              id="download-app-modal-1click-install-btn"
              onClick={handle1ClickInstall}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-gray-950 font-black px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2 flex-shrink-0"
            >
              <Download className="w-5 h-5 text-gray-950" />
              <span>Install App Now</span>
            </button>
          </div>

          {/* Platform Tabs */}
          <div>
            <div className="flex items-center border-b border-gray-200">
              <button
                onClick={() => setActivePlatformTab('android')}
                className={`flex-1 py-3 px-2 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition cursor-pointer ${
                  activePlatformTab === 'android'
                    ? 'border-amber-500 text-amber-900 bg-amber-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>Android (APK & PWA)</span>
              </button>

              <button
                onClick={() => setActivePlatformTab('ios')}
                className={`flex-1 py-3 px-2 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition cursor-pointer ${
                  activePlatformTab === 'ios'
                    ? 'border-amber-500 text-amber-900 bg-amber-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Apple className="w-4 h-4 text-gray-800" />
                <span>iPhone & iPad (iOS)</span>
              </button>

              <button
                onClick={() => setActivePlatformTab('desktop')}
                className={`flex-1 py-3 px-2 text-xs font-bold flex items-center justify-center space-x-2 border-b-2 transition cursor-pointer ${
                  activePlatformTab === 'desktop'
                    ? 'border-amber-500 text-amber-900 bg-amber-50/50'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Monitor className="w-4 h-4 text-blue-600" />
                <span>Windows & Mac PC</span>
              </button>
            </div>

            {/* Tab 1: Android */}
            {activePlatformTab === 'android' && (
              <div className="pt-4 space-y-4 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="font-bold text-emerald-900 text-sm flex items-center">
                    <Smartphone className="w-4 h-4 mr-1.5 text-emerald-600" />
                    Android Direct Installation Options
                  </div>
                  <p className="text-emerald-800 mt-1">
                    You can install {storeBranding.storeName || 'Ameez Store Pro'} directly onto any Samsung, Google Pixel, Xiaomi, or Android device:
                  </p>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-2">
                      <div className="font-bold text-gray-900 flex items-center">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] mr-1.5 font-black">1</span>
                        Install via Chrome / Brave
                      </div>
                      <p className="text-[11px] text-gray-600">
                        Tap the 3 dots (⋮) in your mobile browser and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                      </p>
                      <button
                        onClick={handle1ClickInstall}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded text-[11px] cursor-pointer"
                      >
                        Launch Browser Installer
                      </button>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-emerald-200 space-y-2">
                      <div className="font-bold text-gray-900 flex items-center">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] mr-1.5 font-black">2</span>
                        Download APK Package
                      </div>
                      <p className="text-[11px] text-gray-600">
                        Download the standalone Android WebAPK bundle file directly to install offline.
                      </p>
                      <button
                        id="download-android-apk-btn"
                        onClick={handleDownloadAndroidApk}
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-1.5 px-3 rounded text-[11px] cursor-pointer flex items-center justify-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Download .APK Package</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: iOS */}
            {activePlatformTab === 'ios' && (
              <div className="pt-4 space-y-4 text-xs">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="font-bold text-gray-900 text-sm flex items-center">
                    <Apple className="w-4 h-4 mr-1.5 text-gray-800" />
                    Apple iPhone & iPad Installation
                  </div>
                  <p className="text-gray-600 mt-1">
                    No App Store Apple ID password required. Add directly to your iOS Home Screen in 5 seconds:
                  </p>

                  <div className="mt-3 bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Tap the Share Button</div>
                        <div className="text-gray-500 text-[11px]">
                          In Apple Safari on your iPhone/iPad, tap the <strong>Share</strong> icon (square with arrow pointing up) at the bottom.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Select "Add to Home Screen"</div>
                        <div className="text-gray-500 text-[11px]">
                          Scroll down the share sheet menu and tap <strong>"Add to Home Screen"</strong> with the plus (+) icon.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-gray-950 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Done! Instant Native Feel</div>
                        <div className="text-gray-500 text-[11px]">
                          The app icon appears on your home screen and launches full screen without Safari browser bars.
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-gray-500">Need corporate / managed iOS profile?</span>
                      <button
                        id="download-ios-profile-btn"
                        onClick={handleDownloadIosConfig}
                        className="bg-gray-800 hover:bg-black text-white font-bold py-1.5 px-3 rounded text-[11px] cursor-pointer flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Download .mobileconfig</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Desktop */}
            {activePlatformTab === 'desktop' && (
              <div className="pt-4 space-y-4 text-xs">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="font-bold text-blue-900 text-sm flex items-center">
                    <Monitor className="w-4 h-4 mr-1.5 text-blue-700" />
                    Windows 11 / 10 & macOS Desktop App
                  </div>
                  <p className="text-blue-800 mt-1">
                    Install {storeBranding.storeName || 'Ameez Store Pro'} on your desktop as a dedicated standalone window:
                  </p>

                  <div className="mt-3 bg-white p-3.5 rounded-lg border border-blue-200 space-y-2.5">
                    <div className="font-bold text-gray-900 text-xs">
                      Option A: Browser Address Bar 1-Click
                    </div>
                    <p className="text-gray-600 text-[11px]">
                      In Google Chrome or Microsoft Edge on PC/Mac, click the <strong>Install App icon</strong> (monitor with down arrow) located in the right side of the address bar.
                    </p>

                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-gray-600 font-bold text-[11px]">Option B: Desktop Launcher File</span>
                      <button
                        id="download-desktop-launcher-btn"
                        onClick={handleDownloadDesktopApp}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded text-[11px] cursor-pointer flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Desktop Launcher</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* QR Code Quick Scan for Mobile */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-16 h-16 bg-white p-1 rounded-lg border border-gray-300 shadow-xs flex items-center justify-center flex-shrink-0">
                <QrCode className="w-12 h-12 text-gray-900" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xs flex items-center">
                  <Smartphone className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  Scan with Phone Camera to Install
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Point your iPhone or Android camera at your screen to immediately open and install on your mobile device.
                </p>
                <div className="text-[10px] text-gray-400 font-mono mt-1 truncate max-w-xs">
                  {storeOneLink.storeUrl}
                </div>
              </div>
            </div>

            {/* Publish Suite Link */}
            <button
              id="download-modal-open-publish-hub-btn"
              onClick={() => {
                setIsDownloadAppOpen(false);
                setIsAppStorePublishOpen(true);
              }}
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 font-bold px-3.5 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer flex-shrink-0"
            >
              <Globe className="w-3.5 h-3.5 text-purple-600" />
              <span>Publish to GitHub & App Stores</span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 rounded-b-2xl flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted 256-Bit TLS • Zero Adware Guarantee</span>
          </div>

          <button
            onClick={() => setIsDownloadAppOpen(false)}
            className="bg-gray-900 hover:bg-black text-white font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
