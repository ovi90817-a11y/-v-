import { Wallet, BarChart3, ShieldCheck, Trophy, RotateCcw, LogOut, Shield, KeyRound, Code2, Send } from 'lucide-react';
import { StoredLicenseSession } from '../utils/deviceLicense';

interface HeaderProps {
  balance: number;
  otpCount: number;
  appName?: string;
  appShortName?: string;
  licenseSession?: StoredLicenseSession | null;
  onOpenLiveChecker: () => void;
  onOpenBoard: () => void;
  onOpenWithdraw: () => void;
  onReset: () => void;
  onLogout: () => void;
  onOpenAdmin?: () => void;
  onOpenApiDocs?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  balance,
  otpCount,
  appName = 'OXYZ',
  appShortName = 'OXYZ',
  licenseSession,
  onOpenLiveChecker,
  onOpenBoard,
  onOpenWithdraw,
  onReset,
  onLogout,
  onOpenAdmin,
  onOpenApiDocs,
}) => {
  return (
    <header className="w-full pt-4 pb-3 px-3 sm:px-6 border-b border-[#1b2234] bg-[#0b0f19]/95 backdrop-blur-md sticky top-0 z-30 shadow-lg shadow-black/40">
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {/* Brand identity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo badge with gold emblem */}
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-[#1e2738] via-amber-950/40 to-[#0a0e17] border border-amber-400/50 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-black/90 flex flex-col items-center justify-center border border-amber-400/30">
                <span className="text-[12px] font-black tracking-wider text-amber-400 leading-none">
                  {appShortName}
                </span>
                <span className="text-[5.5px] uppercase font-bold tracking-tighter text-amber-300/80 leading-tight">
                  {appName}
                </span>
              </div>
              {/* Tiny glowing dot */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>{appName}</span>
                </h1>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 text-amber-300 border border-amber-400/50 font-black tracking-wider shadow-sm shadow-amber-500/20 flex items-center gap-1">
                  👑 VIP
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                Smart Earning Z · Premium Automation Gateway
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Official Telegram Link */}
            <a
              href="https://t.me/Smart_Earning_Z"
              target="_blank"
              rel="noopener noreferrer"
              title="Official Telegram Channel"
              className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 fill-sky-400/20" />
              <span className="hidden sm:inline">Telegram</span>
            </a>

            {/* Top Admin Panel Logo Button */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                title="Admin Control"
                className="w-8 h-8 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/60 transition-all flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <Shield className="w-4 h-4 text-amber-400" />
              </button>
            )}
          </div>
        </div>

        {/* Action badges and controls row */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold">
          {/* Balance badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0e2722] text-[#2dd4bf] border border-[#14532d]/40 shadow-inner">
            <Wallet className="w-3.5 h-3.5 text-[#2dd4bf]" />
            <span className="font-bold">৳{balance}</span>
          </div>

          {/* OTP count badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#272111] text-[#fbbf24] border border-[#78350f]/40 shadow-inner">
            <BarChart3 className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>OTP: {otpCount}</span>
          </div>

          {/* Active License Badge */}
          {licenseSession && (
            <div
              title={`License: ${licenseSession.keyMask} (${licenseSession.duration})`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/30 text-amber-300 border border-amber-500/40 shadow-inner text-xs font-mono font-bold"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>{licenseSession.keyMask}</span>
              <span className="text-[10px] uppercase font-sans font-extrabold text-amber-400/90 bg-amber-500/20 px-1.5 py-0.5 rounded">
                {licenseSession.duration === 'lifetime' ? 'Life' : licenseSession.duration}
              </span>
            </div>
          )}

          {/* Live Checker Button */}
          <button
            onClick={onOpenLiveChecker}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0d9488] hover:bg-[#0f766e] text-white font-medium shadow-md shadow-teal-900/30 transition-all cursor-pointer active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Live Checker</span>
          </button>

          {/* Board (Leaderboard) Button */}
          <button
            onClick={onOpenBoard}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#eab308] hover:bg-[#ca8a04] text-black font-bold shadow-md shadow-amber-900/20 transition-all cursor-pointer active:scale-95"
          >
            <Trophy className="w-3.5 h-3.5 fill-black" />
            <span>Board</span>
          </button>

          {/* Withdraw Button */}
          <button
            onClick={onOpenWithdraw}
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium shadow-md shadow-indigo-900/30 transition-all cursor-pointer active:scale-95"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>Withdraw</span>
          </button>

          {/* VIP API Docs Button */}
          {onOpenApiDocs && (
            <button
              onClick={onOpenApiDocs}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600/30 to-amber-500/20 hover:from-amber-600/40 hover:to-amber-500/30 text-amber-300 border border-amber-500/40 font-bold transition-all cursor-pointer active:scale-95 shadow-sm shadow-amber-900/20"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>VIP API</span>
            </button>
          )}

          {/* Reset Button */}
          <button
            onClick={onReset}
            type="button"
            title="Reset current session / inbox"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-slate-200 border border-[#334155] font-medium transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 border border-rose-900/50 font-medium transition-all cursor-pointer active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
