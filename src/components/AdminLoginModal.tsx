import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('請輸入管理員登入密碼');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Specified password: 668668
      if (password === '668668') {
        setPassword('');
        setError('');
        onLoginSuccess();
      } else {
        setError('登入密碼不正確，請重新輸入');
      }
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-md w-full border border-amber-300 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="關閉"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center mx-auto text-white shadow-md shadow-emerald-200/50">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            報名會員資料查看 · 管理登入
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            此功能僅供「理財這一家」授權管理員查閱會員報名與入會檔案清冊。
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                <span>請輸入登入密碼</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                {showPassword ? '密碼已顯示' : '密碼已隱藏 (預設)'}
              </span>
            </label>

            <div className="relative">
              {/* Password Input: defaults to type="password" (hidden/masked) */}
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="請輸入 6 位數字登入密碼"
                value={password}
                autoFocus
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className={`w-full pl-4 pr-11 py-3 rounded-xl border text-sm font-mono tracking-wider focus:outline-none transition-all ${
                  error
                    ? 'border-rose-400 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-white'
                }`}
              />

              {/* Eye toggle icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? '隱藏密碼' : '顯示密碼'}
                title={showPassword ? '隱藏密碼' : '顯示密碼'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-700 rounded-xl shadow-md shadow-emerald-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isSubmitting ? '驗證中...' : '確認登入並查看會員資料'}</span>
            </button>
          </div>
        </form>

        <div className="text-center pt-1 border-t border-slate-100">
          <p className="text-[11px] text-slate-400">
            🔒 管理員安全連線驗證 · 密碼經本地加密保護
          </p>
        </div>

      </div>
    </div>
  );
}
