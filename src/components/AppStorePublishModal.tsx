import React, { useState } from 'react';
import {
  X,
  Smartphone,
  Apple,
  Download,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  Share2,
  Sparkles,
  QrCode,
  ShieldCheck,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  ArrowRight,
  Monitor,
  FolderGit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketplace } from '../context/MarketplaceContext';

export const AppStorePublishModal: React.FC = () => {
  const {
    isAppStorePublishOpen,
    setIsAppStorePublishOpen,
    storeOneLink,
    storeBranding,
    setIsDownloadAppOpen,
  } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'github' | 'playstore' | 'appstore' | 'allwebsites'>('github');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isAppStorePublishOpen) return null;

  const handleCopyStoreLink = () => {
    navigator.clipboard?.writeText(storeOneLink.storeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const gitCommands = `# 1. Initialize and link to your GitHub repository
git init
git add .
git commit -m "feat: initial Global zone Global production launch"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/global-zone-global.git
git push -u origin main

# 2. Deploy to GitHub Pages (Live Website)
npm run build
npx gh-pages -d dist`;

  const githubWorkflowYml = `name: Deploy Global zone Global to All Websites & GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Compile Production Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages`;

  const handleCopyGitCommands = () => {
    navigator.clipboard?.writeText(gitCommands);
    setCopiedGitCmd(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopiedGitCmd(false), 2000);
  };

  const handleCopyWorkflow = () => {
    navigator.clipboard?.writeText(githubWorkflowYml);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  const handleDownloadGitHubBundle = () => {
    const bundleData = {
      project_name: storeBranding.storeName || 'Global zone Global',
      repository_name: 'global-zone-global',
      description: 'Official Global zone Global multi-market e-commerce platform & 3% commission hub',
      git_commands: gitCommands,
      github_workflow_yml: githubWorkflowYml,
      target_hosts: ['GitHub Pages', 'Vercel', 'Netlify', 'Cloud Run', 'Cloudflare Pages'],
      universal_url: storeOneLink.storeUrl,
      generated_at: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(bundleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `github-publish-config-ameez-store-pro.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('GitHub Publishing Bundle & CI/CD workflow downloaded!');
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handleDownloadAndroidBundle = () => {
    const config = {
      name: storeBranding.storeName || 'Ameez Store Pro',
      short_name: 'AmeezPro',
      package_name: 'com.ameez.storepro',
      version_code: 240,
      version_name: '2.4.0',
      start_url: storeOneLink.storeUrl,
      theme_color: storeBranding.brandColor || '#131921',
      background_color: '#131921',
      display: 'standalone',
      orientation: 'portrait',
      pwa_twa_manifest: {
        package_id: 'com.ameez.storepro',
        host: 'ameez.store',
        asset_statements: [{ relation: ['delegate_permission/common.handle_all_urls'], target: { namespace: 'android_app' } }],
      },
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GooglePlay-TWA-Config-AmeezStorePro.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Google Play Android Package Config Downloaded!');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadAppleConfig = () => {
    const iosConfig = {
      bundle_identifier: 'com.ameez.storepro.ios',
      app_name: storeBranding.storeName || 'Ameez Store Pro',
      start_url: storeOneLink.storeUrl,
      apple_touch_icon: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=512',
      status_bar_style: 'black-translucent',
      fullscreen: true,
      export_platform: 'iOS Capacitor / WebClip',
    };

    const blob = new Blob([JSON.stringify(iosConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AppleAppStore-iOS-Config-AmeezStorePro.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess('Apple App Store iOS Configuration Downloaded!');
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        id="app-store-publish-modal"
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative text-gray-900 border border-gray-200"
      >
        {/* Header */}
        <div className="bg-[#131921] text-white p-5 sm:p-6 flex items-center justify-between border-b border-gray-800 rounded-t-2xl">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-extrabold text-base sm:text-lg text-white">
                  Publish All Websites & All Apps
                </h2>
                <span className="bg-emerald-500/30 text-emerald-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  GITHUB • PLAY STORE • APP STORE
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Publish {storeBranding.storeName || 'Global zone Global'} on GitHub, custom websites, Google Play Store & Apple App Store.
              </p>
            </div>
          </div>
          <button
            id="close-publish-modal-btn"
            onClick={() => setIsAppStorePublishOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 flex items-center space-x-2 sm:space-x-4 text-xs font-bold overflow-x-auto scrollbar-none">
          <button
            id="tab-publish-github"
            onClick={() => setActiveTab('github')}
            className={`py-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'github'
                ? 'border-amber-500 text-gray-950 font-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-gray-900" />
            <span>GitHub Repository & Website</span>
            <span className="bg-amber-400 text-gray-950 text-[9px] font-black px-1.5 py-0.2 rounded">
              TOP
            </span>
          </button>

          <button
            id="tab-publish-playstore"
            onClick={() => setActiveTab('playstore')}
            className={`py-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'playstore'
                ? 'border-amber-500 text-gray-950 font-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-600" />
            <span>Google Play Store (Android)</span>
          </button>

          <button
            id="tab-publish-appstore"
            onClick={() => setActiveTab('appstore')}
            className={`py-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'appstore'
                ? 'border-amber-500 text-gray-950 font-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Apple className="w-4 h-4 text-gray-900" />
            <span>Apple App Store (iOS)</span>
          </button>

          <button
            id="tab-publish-allwebsites"
            onClick={() => setActiveTab('allwebsites')}
            className={`py-3 border-b-2 cursor-pointer transition flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'allwebsites'
                ? 'border-amber-500 text-gray-950 font-black'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>All Websites & Embeds</span>
          </button>
        </div>

        {/* Success toast if downloaded */}
        {downloadSuccess && (
          <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 border-b border-emerald-200 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{downloadSuccess}</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Ready</span>
          </div>
        )}

        {/* Tab Content */}
        <div className="p-5 sm:p-6 space-y-5 text-xs">
          {/* TAB 1: GITHUB REPOSITORY & WEBSITE */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="bg-gray-900 text-white rounded-xl p-4 flex items-start space-x-3.5 border border-gray-700 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black text-base flex-shrink-0">
                  <FolderGit2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center space-x-2">
                    <span>GitHub Repository & Multi-Website Publishing</span>
                    <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                      CI/CD READY
                    </span>
                  </h3>
                  <p className="text-gray-300 text-xs mt-0.5">
                    Push your entire store codebase to GitHub to host freely on GitHub Pages, Vercel, Netlify, or your own domain with 1 click.
                  </p>
                </div>
              </div>

              {/* Terminal Git Commands Box */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800 flex items-center">
                    <Terminal className="w-3.5 h-3.5 text-gray-600 mr-1" />
                    Git Push Commands (Run in Terminal):
                  </label>
                  <button
                    id="copy-git-commands-btn"
                    onClick={handleCopyGitCommands}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedGitCmd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedGitCmd ? 'Copied to Clipboard!' : 'Copy Commands'}</span>
                  </button>
                </div>

                <div className="bg-gray-950 rounded-xl p-3 text-gray-200 font-mono text-[11px] leading-relaxed overflow-x-auto border border-gray-800">
                  <pre>{gitCommands}</pre>
                </div>
              </div>

              {/* GitHub Actions CI/CD Workflow */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-800 flex items-center">
                    <Code2 className="w-3.5 h-3.5 text-purple-600 mr-1" />
                    GitHub Actions Auto-Deploy Workflow (<span className="font-mono text-[10px]">.github/workflows/deploy.yml</span>):
                  </label>
                  <button
                    onClick={handleCopyWorkflow}
                    className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center space-x-1 cursor-pointer"
                  >
                    {copiedWorkflow ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWorkflow ? 'Copied!' : 'Copy YAML'}</span>
                  </button>
                </div>

                <div className="bg-gray-900 rounded-xl p-3 text-emerald-400 font-mono text-[10px] leading-relaxed max-h-36 overflow-y-auto border border-gray-800">
                  <pre>{githubWorkflowYml}</pre>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="download-github-bundle-btn"
                  onClick={handleDownloadGitHubBundle}
                  className="flex-1 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-gray-700"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download GitHub Publishing Bundle (.json)</span>
                </button>

                <button
                  onClick={handleCopyGitCommands}
                  className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-black py-3 px-5 rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Copy Git Commands</span>
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-[11px] text-amber-900 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Where You Can Publish With GitHub:</strong>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-semibold">
                    <span className="bg-white px-2 py-1 rounded border border-amber-200 text-center">GitHub Pages</span>
                    <span className="bg-white px-2 py-1 rounded border border-amber-200 text-center">Vercel Web</span>
                    <span className="bg-white px-2 py-1 rounded border border-amber-200 text-center">Netlify Cloud</span>
                    <span className="bg-white px-2 py-1 rounded border border-amber-200 text-center">Cloudflare Pages</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE PLAY STORE */}
          {activeTab === 'playstore' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  ▶
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Google Play Store (Android TWA / APK Ready)
                  </h3>
                  <p className="text-gray-600 text-xs mt-0.5">
                    Your store is pre-configured with Google Trusted Web Activity (TWA) protocols. You can publish directly onto the Google Play Store Console.
                  </p>
                </div>
              </div>

              {/* Technical specs card */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">Package Identifier:</span>
                  <span className="font-mono font-bold text-gray-900">com.ameez.storepro</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">App Name in Play Store:</span>
                  <span className="font-bold text-gray-900">{storeBranding.storeName || 'Ameez Store Pro'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">Target SDK:</span>
                  <span className="font-bold text-emerald-700">Android 14 (API 34) Latest</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Publishing Protocol:</span>
                  <span className="font-bold text-gray-900">Google Bubblewrap TWA / APK Bundle</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  id="download-android-publish-config-btn"
                  onClick={handleDownloadAndroidBundle}
                  className="flex-1 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer border border-[#fcd200]"
                >
                  <Download className="w-4 h-4 text-gray-900" />
                  <span>Download Google Play Android Config Package</span>
                </button>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 text-[11px] text-gray-600">
                <strong>Next Step:</strong> Upload this configuration to Google Play Console under your Developer Account. All catalog changes on your store update live on shoppers' phones automatically!
              </div>
            </div>
          )}

          {/* TAB 3: APPLE APP STORE */}
          {activeTab === 'appstore' && (
            <div className="space-y-4">
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0">
                  <Apple className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    Apple App Store (iOS WebKit & Native Wrapper Ready)
                  </h3>
                  <p className="text-gray-600 text-xs mt-0.5">
                    Configured with Apple mobile web-app-capable status, high-resolution touch icon assets, and fullscreen standalone view.
                  </p>
                </div>
              </div>

              {/* Specs */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">iOS Bundle ID:</span>
                  <span className="font-mono font-bold text-gray-900">com.ameez.storepro.ios</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">App Name in iOS:</span>
                  <span className="font-bold text-gray-900">{storeBranding.storeName || 'Ameez Store Pro'}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1.5">
                  <span className="text-gray-500 font-medium">Apple Touch Icon:</span>
                  <span className="text-emerald-700 font-bold">Configured (512x512 PNG)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Status Bar Mode:</span>
                  <span className="font-bold text-gray-900">Black Translucent (Native feel)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  id="download-apple-publish-config-btn"
                  onClick={handleDownloadAppleConfig}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span>Download Apple App Store iOS Package Config</span>
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-[11px] text-blue-900 space-y-1">
                <strong>Instant iPhone Install for Customers:</strong>
                <p>
                  Any customer visiting on iPhone / iPad Safari can tap <strong>Share [↑]</strong> and select <strong>"Add to Home Screen"</strong> to install your store icon immediately with 0 app store delay!
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: ALL WEBSITES & EMBEDS */}
          {activeTab === 'allwebsites' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Universal Public Store URL (All Websites)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={storeOneLink.storeUrl}
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-gray-900 select-all"
                  />
                  <button
                    onClick={handleCopyStoreLink}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-4 py-2 rounded-lg cursor-pointer flex items-center space-x-1"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Embed on Any Website */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800">
                  Embed Store on Any WordPress, Shopify, Webflow or Custom Website:
                </label>
                <div className="bg-gray-900 rounded-lg p-2.5 text-amber-300 font-mono text-[11px] select-all overflow-x-auto">
                  <code>{storeOneLink.embedCode}</code>
                </div>
              </div>

              {/* Social Publishing Grid */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 text-xs mb-2">Publish Across Social Media & Shoppers:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent('Shop directly at my official store: ' + storeOneLink.storeUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold block"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my verified store: ' + storeOneLink.storeUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold block"
                  >
                    X / Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(storeOneLink.storeUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold block"
                  >
                    Facebook
                  </a>
                  <button
                    onClick={handleCopyStoreLink}
                    className="p-2.5 bg-amber-500 hover:bg-amber-600 text-gray-950 rounded-lg font-bold"
                  >
                    Instagram Bio Link
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 rounded-b-2xl flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>GitHub CI/CD • Google Play TWA • Apple iOS Verified</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setIsAppStorePublishOpen(false);
                setIsDownloadAppOpen(true);
              }}
              className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-bold px-3.5 py-1.5 rounded-lg text-xs cursor-pointer flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Store App</span>
            </button>
            <button
              onClick={() => setIsAppStorePublishOpen(false)}
              className="bg-gray-900 hover:bg-black text-white font-bold px-4 py-1.5 rounded-lg text-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
