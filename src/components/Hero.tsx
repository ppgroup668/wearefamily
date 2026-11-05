import { Sparkles, ArrowDown, PiggyBank, ShieldCheck, UserPlus, Gift, Users } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
  onScrollToBenefits: () => void;
}

export default function Hero({ onScrollToForm, onScrollToBenefits }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20 bg-sunny-radial">
      {/* Decorative ambient color orbs for luminous sunny warmth */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-r from-amber-300/35 via-orange-300/25 to-emerald-300/25 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-[-10%] w-[380px] h-[380px] bg-sky-300/20 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-[-5%] w-[420px] h-[420px] bg-emerald-200/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Proposition and Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Sunny Kicker */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide uppercase text-amber-700">
              <span className="flex items-center gap-1.5 text-orange-600 font-extrabold">
                <PiggyBank className="w-4 h-4 text-amber-500 fill-amber-300" />
                陽光家庭理財聚落 · 會員招募中
              </span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span className="text-amber-800">100% 公益免年費 · 終身權益開通</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] text-balance">
              理財這一家！
              <span className="block mt-2 bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent">
                填寫入會表格，為全家人開啟陽光資產成長之路
              </span>
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl">
              告別個人面對金錢的孤單與焦慮！「理財這一家」是專為台灣家庭設立的非營利理財聚落。
              只需在線上填寫入會表格，即可立即領取專屬數位會員卡，開通「631 記帳自動化試算表」、預約 1 對 1 客觀財務健檢，並免費獲得實體向日葵歡迎禮盒！
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onScrollToForm}
                className="px-6 py-3.5 text-base font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-700 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <UserPlus className="w-5 h-5" />
                <span>立即填寫線上入會表格（免費申請）</span>
              </button>

              <button
                onClick={onScrollToBenefits}
                className="px-6 py-3.5 text-base font-semibold text-slate-800 bg-white hover:bg-amber-50/80 border border-amber-200 rounded-xl shadow-xs hover:border-amber-300 transition-all duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-5 h-5 text-amber-600" />
                <span>查看六大入會專屬權益</span>
                <ArrowDown className="w-4 h-4 text-amber-500" />
              </button>
            </div>

            {/* Trust badge */}
            <div className="pt-2 flex items-center gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-amber-400 flex items-center justify-center text-xs font-bold text-amber-950">
                  理
                </span>
                <span className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-950">
                  財
                </span>
                <span className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-orange-400 flex items-center justify-center text-xs font-bold text-orange-950">
                  這
                </span>
                <span className="inline-block w-8 h-8 rounded-full ring-2 ring-white bg-sky-400 flex items-center justify-center text-xs font-bold text-sky-950">
                  家
                </span>
              </div>
              <div className="font-medium">
                本月已有 <span className="font-bold text-emerald-600">1,420+ 戶家庭</span> 完成線上入會登記 · 即填即發數位會員卡
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group">
              {/* Colorful decorative frame glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-white border border-amber-200/80 shadow-xl">
                <img
                  src="/src/assets/images/hero_family_finance_1793850891754.jpg"
                  alt="理財這一家 - 陽光家庭理財入會幸福日常"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Overlay Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-amber-200 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                        <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">入會三大承諾</div>
                        <div className="text-xs text-slate-600">永久免年費 · 絕不推銷保單商品 · 專屬秘書服務</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      終身免費
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column KPI strip below the hero split */}
        <div className="mt-14 pt-8 border-t border-amber-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-amber-100 hover:border-amber-300 transition-colors shadow-xs">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider text-slate-500">已入會家庭</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">1,420+ 戶</div>
            <div className="text-xs text-slate-600 mt-1">全台小資、育兒與跨代會員</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-emerald-100 hover:border-emerald-300 transition-colors shadow-xs">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Gift className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider text-slate-500">入會手續費</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">NT$ 0</div>
            <div className="text-xs text-slate-600 mt-1">公益推廣專案，永久免年費</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-orange-100 hover:border-orange-300 transition-colors shadow-xs">
            <div className="flex items-center gap-2 text-orange-600 mb-1">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider text-slate-500">工具包下載</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">12,800+</div>
            <div className="text-xs text-slate-600 mt-1">會員專屬 631 記帳自動化範本</div>
          </div>

          <div className="bg-white/80 backdrop-blur-xs rounded-xl p-4 border border-sky-100 hover:border-sky-300 transition-colors shadow-xs">
            <div className="flex items-center gap-2 text-sky-600 mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wider text-slate-500">認證顧問志工</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">36 位</div>
            <div className="text-xs text-slate-600 mt-1">CFP / RFC 愛心顧問專屬諮詢</div>
          </div>
        </div>
      </div>
    </section>
  );
}
