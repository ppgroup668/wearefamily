import { Heart, Phone, Coins, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollToForm: () => void;
}

export default function Footer({ onScrollToForm }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (anchorId: string) => {
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-amber-950 text-amber-100/90 pt-16 pb-12 border-t border-amber-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-amber-900/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-emerald-400 flex items-center justify-center text-amber-950 shadow-md">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                理財這一家
              </span>
            </div>

            <p className="text-sm text-amber-200/80 leading-relaxed max-w-sm">
              用陽光透明的專業知識，陪伴每個家庭走出金錢焦慮。提供 100% 免費會員入會、家庭記帳工具包與客觀 1 對 1 財務健檢諮詢。
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>非營利公益組織 · 永久免年費 · 絕不推銷保險金融商品</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-sm font-bold tracking-wider text-amber-400 uppercase">
              會員專屬導覽
            </div>
            <ul className="space-y-2 text-sm text-amber-200/80">
              <li>
                <button
                  onClick={() => handleNavClick('benefits-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  入會專屬六大權益
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('values-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  陽光理念與初衷
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('membership-form-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  會員入會申請表格
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('community-wall-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  新進家庭星光榜
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('faq-section')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  入會常見問題
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm text-amber-200/80">
            <div className="text-sm font-bold tracking-wider text-amber-400 uppercase">
              會員諮詢服務
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-sm font-semibold text-white">會員諮詢專線：(852) 7059-2253</span>
            </div>
            <p className="text-xs text-amber-300/70 pt-1">
              專人接聽解答入會申請與家庭理財權益相關疑問。
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-300/60">
          <div>
            © {currentYear} 理財這一家 (Family Wealth & Financial Literacy). All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-amber-200">
            <span>陽光理財，幸福相隨</span>
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
}
