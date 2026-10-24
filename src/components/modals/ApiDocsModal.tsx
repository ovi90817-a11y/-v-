import React, { useState } from 'react';
import {
  X,
  Code2,
  Copy,
  Check,
  Send,
  Terminal,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Zap,
  Globe,
  Radio,
  KeyRound,
  Play,
  RotateCcw,
  RefreshCw,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({
  isOpen,
  onClose,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'tester'
    | 'termux'
    | 'system1'
    | 'system2'
    | 'system3'
    | 'system4'
    | 'system5'
    | 'system6'
    | 'system7'
    | 'python'
  >('tester');

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Interactive Tester state
  const [testAction, setTestAction] = useState<string>('acquire_number');
  const [testMethod, setTestMethod] = useState<'GET' | 'POST'>('GET');
  const [testRange, setTestRange] = useState<string>('88018XXXXXXXX');
  const [testCustomNumber, setTestCustomNumber] = useState<string>('');
  const [testPassword, setTestPassword] = useState<string>('Pass@123456');
  const [testVersion, setTestVersion] = useState<string>('v1');
  const [testUid, setTestUid] = useState<string>('61580000000000');
  const [testProxy, setTestProxy] = useState<string>('');
  const [testPhoneIp, setTestPhoneIp] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResponse, setTestResponse] = useState<any>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://smart-earning-z.ai.studio';
  const telegramUrl = 'https://t.me/Smart_Earning_Z';

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      onToast('Copied to clipboard!');
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      onToast('Copy failed.');
    }
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResponse(null);

    try {
      const url = new URL('/api', window.location.origin);
      url.searchParams.set('action', testAction);

      if (testAction === 'acquire_number') {
        if (testCustomNumber.trim()) {
          url.searchParams.set('number', testCustomNumber.trim());
        } else {
          url.searchParams.set('range', testRange.trim() || '88018XXXXXXXX');
        }
        if (testPhoneIp.trim()) url.searchParams.set('phone_ip', testPhoneIp.trim());
        if (testVersion) url.searchParams.set('version', testVersion);
      } else if (testAction === 'termux_save') {
        url.searchParams.set('number', testCustomNumber.trim() || '8801812345678');
        url.searchParams.set('password', testPassword.trim());
        url.searchParams.set('version', testVersion);
        url.searchParams.set('status', 'created');
        url.searchParams.set('uid', testUid.trim() || '61580000000000');
        if (testPhoneIp.trim()) url.searchParams.set('phone_ip', testPhoneIp.trim());
      } else if (testAction === 'create') {
        url.searchParams.set('version', testVersion);
        if (testCustomNumber.trim()) {
          url.searchParams.set('number', testCustomNumber.trim());
        } else {
          url.searchParams.set('range', testRange.trim() || '88018XXXXXXXX');
        }
        url.searchParams.set('password', testPassword.trim());
        if (testProxy.trim()) url.searchParams.set('proxy', testProxy.trim());
      } else if (testAction === 'otp') {
        url.searchParams.set('number', testCustomNumber.trim() || '8801812345678');
      } else if (testAction === 'check_live') {
        url.searchParams.set('uid', testUid.trim() || '61580000000000');
      } else if (testAction === 'login') {
        url.searchParams.set('email', testCustomNumber.trim() || '8801812345678');
        url.searchParams.set('password', testPassword.trim());
        if (testProxy.trim()) url.searchParams.set('proxy', testProxy.trim());
      } else if (testAction === 'test_proxy') {
        url.searchParams.set('proxy', testProxy.trim() || '127.0.0.1:8080');
      }

      const res = await fetch(url.toString(), {
        method: testMethod,
        headers: { Accept: 'application/json' },
      });

      const data = await res.json();
      setTestResponse({
        http_status: res.status,
        request_url: url.toString(),
        data,
      });
      onToast(`API executed: HTTP ${res.status}`);
    } catch (err: any) {
      setTestResponse({
        error: true,
        message: err.message || 'Network request failed',
      });
      onToast('Test failed: ' + err.message);
    } finally {
      setIsTesting(false);
    }
  };

  const pythonScript = `import requests, time

# SMART EARNING Z VIP API GATEWAY
BASE_URL = "${currentOrigin}"

# ১. আপনার মেইন ফোনের বর্তমান IP চেক করুন (Termux লোকাল নেটওয়ার্ক)
try:
    my_phone_ip = requests.get("https://api.ipify.org?format=json", timeout=10).json().get("ip", "")
    print("My Main Phone IP:", my_phone_ip)
except:
    my_phone_ip = "127.0.0.1"

# ২. প্যানেল রেঞ্জ থেকে ফ্রি নাম্বার ও প্রোফাইল ডাটা নিন
acq = requests.get(f"{BASE_URL}/api", params={
    "action": "acquire_number",
    "range": "88018XXXXXXXX",
    "phone_ip": my_phone_ip
}).json()

phone = acq["number"]
profile = acq["profile"]
ua = acq["user_agent"]
print(f"Acquired Number: {phone} | OTP Fetch Enabled: {acq['otp_fetch_enabled']}")

# ৩. Termux থেকে মেইন ফোনের IP ও User-Agent দিয়ে একাউন্ট ক্রিয়েট করে সার্ভারে সেভ করুন
save_res = requests.post(f"{BASE_URL}/api?action=termux_save", json={
    "number": phone,
    "password": "Pass@123456",
    "version": "v1",
    "firstname": profile["firstname"],
    "lastname": profile["lastname"],
    "dob": profile["dob"],
    "phone_ip": my_phone_ip,
    "custom_number": acq["custom_number"]
}).json()
print("Saved on Server:", save_res)

# ৪. যদি প্যানেল রেঞ্জের নাম্বার হয় (custom_number == False), তাহলে ২০ মিনিট পর্যন্ত OTP চেক করুন
if acq["otp_fetch_enabled"]:
    print("Waiting for incoming OTP code from provider...")
    for i in range(24):
        otp_res = requests.get(f"{BASE_URL}/api", params={"action": "otp", "number": phone}).json()
        if otp_res.get("otp_received"):
            print("🎉 OTP CODE RECEIVED:", otp_res["otp"])
            print("Full SMS Message:", otp_res.get("sms"))
            break
        time.sleep(5)
`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#050812]/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090e1a] border border-[#1a2942] rounded-3xl shadow-2xl shadow-black/80 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#19263d] bg-gradient-to-r from-[#0c1424] via-[#091120] to-[#0c1424] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-950/40">
              <Code2 className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  👑 VIP FULL API
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Online 2.5.0
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                SMART EARNING Z — Developer API Documentation
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] border border-[#0088cc]/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Official Telegram</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#141e30] hover:bg-[#1f2d47] border border-[#233352] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Base URL info bar */}
        <div className="px-4 py-2.5 bg-[#060a14] border-b border-[#142033] flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-slate-400 shrink-0">BASE URL:</span>
            <code className="text-emerald-300 font-bold truncate select-all">{currentOrigin}</code>
          </div>
          <button
            type="button"
            onClick={() => copyText(currentOrigin, 'base-url')}
            className="px-2.5 py-1 rounded-md bg-[#0f1b2e] hover:bg-[#172844] text-sky-400 text-[11px] font-mono border border-[#1a2f4d] flex items-center gap-1 cursor-pointer shrink-0"
          >
            {copiedKey === 'base-url' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>Copy Base</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 pt-3 border-b border-[#162338] bg-[#080d1a] overflow-x-auto custom-scrollbar text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('tester')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'tester'
                ? 'bg-[#101b2f] text-amber-400 border-t-2 border-amber-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Tester</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('termux')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'termux'
                ? 'bg-[#101b2f] text-emerald-400 border-t-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Termux Phone IP</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system1')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'system1'
                ? 'bg-[#101b2f] text-sky-400 border-t-2 border-sky-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <span>System 1: Create V1–V4</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system2')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'system2'
                ? 'bg-[#101b2f] text-purple-400 border-t-2 border-purple-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <span>System 2: Custom Number</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system3')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'system3'
                ? 'bg-[#101b2f] text-indigo-400 border-t-2 border-indigo-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <span>System 3: OTP Check</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system4')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'system4'
                ? 'bg-[#101b2f] text-teal-400 border-t-2 border-teal-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <span>System 4: Ranges</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system5')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'system5'
                ? 'bg-[#101b2f] text-rose-400 border-t-2 border-rose-400 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <span>System 5: Live Checker</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('system6')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'system6'
                ? 'bg-[#101b2f] text-amber-300 border-t-2 border-amber-300 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <span>System 6: FB Login</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('python')}
            className={`px-3 py-2 rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
              activeTab === 'python'
                ? 'bg-[#101b2f] text-emerald-300 border-t-2 border-emerald-300 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-[#0c1424]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Python Script</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[65vh] flex flex-col gap-4 text-xs sm:text-sm text-slate-300 custom-scrollbar">
          {/* 1. INTERACTIVE TESTER TAB */}
          {activeTab === 'tester' && (
            <div className="flex flex-col gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Live Interactive API Tester:</strong> এখান থেকে সরাসরি যেকোনো Action ও Parameters সিলেক্ট করে টেস্ট করুন এবং রিয়েল-টাইমে সার্ভারের JSON রেসপন্স দেখুন।
                </div>
              </div>

              {/* Tester Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#060a14] p-4 rounded-2xl border border-[#162339]">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Select Action</label>
                  <select
                    value={testAction}
                    onChange={(e) => setTestAction(e.target.value)}
                    className="w-full bg-[#0a101f] border border-[#21324d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="acquire_number">acquire_number (Step 1)</option>
                    <option value="termux_save">termux_save (Step 2)</option>
                    <option value="create">create (V1-V4)</option>
                    <option value="otp">otp (Check SMS)</option>
                    <option value="ranges">ranges (Active Ranges)</option>
                    <option value="check_live">check_live (UID Live Check)</option>
                    <option value="login">login (FB Session & Cookies)</option>
                    <option value="test_proxy">test_proxy (Proxy Test)</option>
                    <option value="stop_monitors">stop_monitors (Stop Monitors)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">HTTP Method</label>
                  <select
                    value={testMethod}
                    onChange={(e) => setTestMethod(e.target.value as 'GET' | 'POST')}
                    className="w-full bg-[#0a101f] border border-[#21324d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Version (V1/V2/V3/V4)</label>
                  <select
                    value={testVersion}
                    onChange={(e) => setTestVersion(e.target.value)}
                    className="w-full bg-[#0a101f] border border-[#21324d] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="v1">v1 (Android Standard)</option>
                    <option value="v2">v2 (Lite Flow)</option>
                    <option value="v3">v3 (Graph Direct)</option>
                    <option value="v4">v4 (iOS W-Bloks)</option>
                  </select>
                </div>

                {/* Range input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Range Prefix</label>
                  <input
                    type="text"
                    value={testRange}
                    onChange={(e) => setTestRange(e.target.value)}
                    placeholder="88018XXXXXXXX or 23762XXX"
                    className="w-full bg-[#0a101f] border border-[#21324d] rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Custom Number Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Number (Custom)</label>
                  <input
                    type="text"
                    value={testCustomNumber}
                    onChange={(e) => setTestCustomNumber(e.target.value)}
                    placeholder="8801712345678 (optional)"
                    className="w-full bg-[#0a101f] border border-[#21324d] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Password / UID */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                  <input
                    type="text"
                    value={testPassword}
                    onChange={(e) => setTestPassword(e.target.value)}
                    className="w-full bg-[#0a101f] border border-[#21324d] rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleRunTest}
                disabled={isTesting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-950/50 disabled:opacity-50"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Executing Request...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Run API Request ({testMethod} /api?action={testAction})</span>
                  </>
                )}
              </button>

              {/* JSON Response Viewer */}
              {testResponse && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">Server Response</span>
                    <button
                      type="button"
                      onClick={() => copyText(JSON.stringify(testResponse, null, 2), 'test-json')}
                      className="text-amber-400 hover:text-amber-300 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'test-json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy JSON</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-[#040711] border border-[#17253a] text-emerald-300 font-mono text-xs overflow-x-auto max-h-72">
                    {JSON.stringify(testResponse, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* 2. TERMUX MAIN PHONE IP SYSTEM */}
          {activeTab === 'termux' && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-2xl bg-[#0d1d33] border border-[#1b3b68] text-sky-200">
                <h4 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>TERMUX MAIN PHONE IP SYSTEM (নিজের ফোনের সিম/ওয়াইফাই IP দিয়ে ক্রিয়েট)</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  ওয়েবসাইটে একাউন্ট ক্রিয়েট করলে সার্ভারের IP দিয়ে হয়। কিন্তু Termux টুল ব্যবহারের সময় নিচের ২-স্টেপ API (acquire_number + termux_save) ব্যবহার করলে Termux সরাসরি আপনার মেইন ফোনের IP Address ব্যবহার করে একাউন্ট ক্রিয়েট করবে এবং সার্ভার থেকে ফ্রি নাম্বার ও ২০ মিনিট OTP মনিটর পাবে!
                </p>
              </div>

              {/* Step 1 */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#060a14] border border-[#142338]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">Step 1: প্যানেল থেকে ফ্রি নাম্বার + নাম/জন্মতারিখ নেওয়া (OTP Fetch চালু থাকবে)</span>
                  <button
                    type="button"
                    onClick={() => copyText(`${currentOrigin}/api?action=acquire_number&range=88018XXXXXXXX`, 's1-range')}
                    className="text-xs text-sky-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>
                </div>
                <code className="p-2.5 rounded-xl bg-[#0a1120] text-amber-300 font-mono text-xs select-all">
                  GET {currentOrigin}/api?action=acquire_number&range=88018XXXXXXXX
                </code>
              </div>

              {/* Step 1 Custom */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#060a14] border border-[#142338]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-400">Step 1 (Alternative): ইচ্ছেমতো কাস্টম নাম্বার রেজিস্টার করা (কোনো OTP Fetch হবে না)</span>
                  <button
                    type="button"
                    onClick={() => copyText(`${currentOrigin}/api?action=acquire_number&number=8801712345678`, 's1-custom')}
                    className="text-xs text-sky-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>
                </div>
                <code className="p-2.5 rounded-xl bg-[#0a1120] text-purple-300 font-mono text-xs select-all">
                  GET {currentOrigin}/api?action=acquire_number&number=8801712345678
                </code>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#060a14] border border-[#142338]">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">Step 2: Termux-এ ফোনের IP দিয়ে ক্রিয়েটের পর রেজাল্ট সেভ ও ২০ মিনিট OTP মনিটর চালু</span>
                  <button
                    type="button"
                    onClick={() => copyText(`${currentOrigin}/api?action=termux_save&number=8801812345678&password=Pass@123456&version=v1&status=created&uid=61580000000000&cookie=datr=...`, 's2-save')}
                    className="text-xs text-sky-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </button>
                </div>
                <code className="p-2.5 rounded-xl bg-[#0a1120] text-amber-300 font-mono text-xs select-all">
                  POST / GET {currentOrigin}/api?action=termux_save&number=8801812345678&password=Pass@123456&version=v1&status=created&uid=61580000000000&cookie=datr=...
                </code>
              </div>
            </div>
          )}

          {/* 3. SYSTEM 1 */}
          {activeTab === 'system1' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white text-base">
                📌 সিস্টেম ১: প্যানেল রেঞ্জ দিয়ে সরাসরি ব্যাকগ্রাউন্ড API একাউন্ট ক্রিয়েট (V1 / V2 / V3 / V4)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                প্যানেল থেকে অটোমেটিক ফ্রি নাম্বার চেক করে একাউন্ট ক্রিয়েট করবে এবং ২০ মিনিট ব্যাকগ্রাউন্ডে ওই নাম্বারের OTP কোড মনিটর করবে।
              </p>

              <div className="flex flex-col gap-2 mt-2">
                {[
                  { v: 'v1', desc: 'V1 API URL (Android Standard)' },
                  { v: 'v2', desc: 'V2 API URL (Lite Flow)' },
                  { v: 'v3', desc: 'V3 API URL (Graph Direct)' },
                  { v: 'v4', desc: 'V4 API URL (iOS W-Bloks)' },
                ].map((item) => (
                  <div key={item.v} className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>• {item.desc}:</span>
                      <button
                        type="button"
                        onClick={() => copyText(`${currentOrigin}/api?action=create&version=${item.v}&range=88018XXXXXXXX&password=Pass@123456`, `c-${item.v}`)}
                        className="text-sky-400 text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <code className="text-emerald-300 text-xs font-mono select-all">
                      {currentOrigin}/api?action=create&version={item.v}&range=88018XXXXXXXX&password=Pass@123456
                    </code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SYSTEM 2 */}
          {activeTab === 'system2' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white text-base">
                📌 সিস্টেম ২: ইচ্ছেমতো কাস্টম নাম্বার দিয়ে একাউন্ট ক্রিয়েট (NO OTP FETCH)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                আপনি নিজের ইচ্ছেমতো যেকোনো নাম্বার (number=...) দিয়ে V1–V4 একাউন্ট ক্রিয়েট করতে পারবেন।
              </p>
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs">
                ⚠️ <strong>বিশেষ নিয়ম:</strong> কাস্টম নাম্বার দিয়ে ক্রিয়েট করলে প্যানেল বা এপিআই থেকে কোনো OTP ফেচ/মনিটর হবে না (otp_fetch_enabled: false)।
              </div>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Custom Number Create URL (GET / POST):</span>
                <code className="text-purple-300 text-xs font-mono select-all">
                  {currentOrigin}/api?action=create&version=v1&number=8801712345678&password=Pass@123456
                </code>
              </div>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Direct Custom Endpoint:</span>
                <code className="text-purple-300 text-xs font-mono select-all">
                  {currentOrigin}/api/custom?version=v1&number=8801712345678&password=Pass@123456
                </code>
              </div>
            </div>
          )}

          {/* 5. SYSTEM 3 */}
          {activeTab === 'system3' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white text-base">
                📌 সিস্টেম ৩: নাম্বার দিয়ে OTP কোড চেক / ফেচ API
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                শুধুমাত্র প্যানেল রেঞ্জ দিয়ে ক্রিয়েট করা নাম্বারের OTP কোড এসেছে কিনা তা চেক করবে। (কাস্টম নাম্বার দিয়ে ক্রিয়েট করা হলে এই এপিআইতে OTP ফেচ হবে না)।
              </p>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• OTP Check URL:</span>
                <code className="text-sky-300 text-xs font-mono select-all">
                  {currentOrigin}/api?action=otp&number=8801812345678
                </code>
              </div>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Alternative Endpoint:</span>
                <code className="text-sky-300 text-xs font-mono select-all">
                  {currentOrigin}/api/otp?number=8801812345678
                </code>
              </div>
            </div>
          )}

          {/* 6. SYSTEM 4 */}
          {activeTab === 'system4' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white text-base">
                📌 সিস্টেম ৪: লাইভ নাম্বার রেঞ্জ লিস্ট API (Ranges List)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                প্যানেলে বর্তমানে কোন কোন ফেসবুক ও অন্যান্য সার্ভিসের নাম্বার রেঞ্জ এভেইলেবল আছে তা JSON আকারে দেখাবে।
              </p>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Ranges List URL:</span>
                <code className="text-teal-300 text-xs font-mono select-all">
                  {currentOrigin}/api?action=ranges
                </code>
              </div>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Alternative Endpoint:</span>
                <code className="text-teal-300 text-xs font-mono select-all">
                  {currentOrigin}/api/ranges
                </code>
              </div>
            </div>
          )}

          {/* 7. SYSTEM 5 */}
          {activeTab === 'system5' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white text-base">
                📌 সিস্টেম ৫: ফেসবুক UID Live / Blocked চেকার API
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                যেকোনো সিঙ্গেল বা একসাথে একাধিক Facebook UID বর্তমানে LIVE নাকি BLOCKED তা চেক করবে।
              </p>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Single UID Check URL:</span>
                <code className="text-rose-300 text-xs font-mono select-all">
                  {currentOrigin}/api?action=check_live&uid=61580000000000
                </code>
              </div>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Multiple UIDs Check URL:</span>
                <code className="text-rose-300 text-xs font-mono select-all">
                  {currentOrigin}/api?action=check_live&uids=61580000000000,61580000000001
                </code>
              </div>
            </div>
          )}

          {/* 8. SYSTEM 6 */}
          {activeTab === 'system6' && (
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-white text-base">
                📌 সিস্টেম ৬: Email / Number + Password দিয়ে FB Login & Cookie API (ck.py)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                যেকোনো ফেসবুক একাউন্টের নাম্বার/ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করে UID ও ফুল কুকি (c_user, xs, fr, datr) বের করবে।
              </p>

              <div className="p-3 rounded-xl bg-[#060a14] border border-[#162339]">
                <span className="text-xs font-semibold text-slate-300 block mb-1">• Password Login URL:</span>
                <code className="text-amber-300 text-xs font-mono select-all">
                  {currentOrigin}/api?action=login&email=8801812345678&password=Pass@123456
                </code>
              </div>
            </div>
          )}

          {/* 9. PYTHON SCRIPT TAB */}
          {activeTab === 'python' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-base">
                    🐍 সিস্টেম ৮: TERMUX PYTHON EXAMPLE (মেইন ফোনের IP ব্যবহার করে API কল)
                  </h4>
                  <p className="text-xs text-slate-400">
                    নিচের পাইথন কোডটি হুবহু কপি করে Termux-এ চালালে সরাসরি আপনার মেইন ফোনের IP দিয়ে একাউন্ট তৈরি হবে।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(pythonScript, 'python-script')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {copiedKey === 'python-script' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>Copy Python Script</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-[#040711] border border-[#17253a] text-emerald-300 font-mono text-xs overflow-x-auto max-h-96 custom-scrollbar">
                {pythonScript}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-[#19263d] bg-[#070b16] flex items-center justify-between text-xs text-slate-500">
          <span>Official API Gateway: SMART EARNING Z / OXYZ</span>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
          >
            <span>t.me/Smart_Earning_Z</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
