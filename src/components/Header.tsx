import { useState } from 'react';
import { Coins, Menu, X, Sparkles, UserPlus, Lock } from 'lucide-react';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenAdminLogin: () => void;
}

export default function Header({ onScrollToForm, onOpenAdminLogin }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Top Left - Admin Data Viewer Button & Brand Wordmark */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Top Left Admin Login Button requested by user */}
          <button
            onClick={onOpenAdminLogin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all cursor-pointer shadow-2xs hover:scale-102 shrink-0"
            title="管理員登入查看報名會員資料（密碼驗證）"
          >
            <Lock className="w-3.5 h-3.5 text-amber-700" />
            <span className="whitespace-nowrap">報名會員資料查看</span>
          </button>

          <a 
            href="#" 
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-amber-900 whitespace-nowrap shrink-0 group hover:opacity-95 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-emerald-400 flex items-center justify-center text-white shadow-sm shadow-amber-300/50 group-hover:scale-105 transition-transform">
              <Coins className="w-5 h-5 text-amber-950" />
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-amber-700 via-orange-600 to-emerald-700 bg-clip-text text-transparent">
              理財這一家
            </span>
          </a>
        </div>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <button 
            onClick={() => handleNavClick('benefits-section')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            入會專屬權益
          </button>
          <button 
            onClick={() => handleNavClick('values-section')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            陽光理念堅持
          </button>
          <button 
            onClick={() => handleNavClick('membership-form-section')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            會員入會申請表
          </button>
          <button 
            onClick={() => handleNavClick('community-wall-section')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            新進家庭星光榜
          </button>
          <button 
            onClick={() => handleNavClick('faq-section')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            入會問答
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onScrollToForm()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-700 rounded-xl shadow-md shadow-orange-500/25 transition-all duration-200 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>線上填表入會</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            aria-label="開啟選單"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white/98 px-5 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('benefits-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-800 hover:text-amber-600"
          >
            入會專屬權益
          </button>
          <button
            onClick={() => handleNavClick('values-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-800 hover:text-amber-600"
          >
            陽光理念堅持
          </button>
          <button
            onClick={() => handleNavClick('membership-form-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-800 hover:text-amber-600"
          >
            會員入會申請表
          </button>
          <button
            onClick={() => handleNavClick('community-wall-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-800 hover:text-amber-600"
          >
            新進家庭星光榜
          </button>
          <button
            onClick={() => handleNavClick('faq-section')}
            className="block w-full text-left py-2 text-base font-medium text-slate-800 hover:text-amber-600"
          >
            入會問答
          </button>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>報名會員資料查看（管理登入）</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToForm();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 rounded-xl shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>線上填表入會</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
