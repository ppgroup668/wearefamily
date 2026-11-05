import { PiggyBank, ShieldCheck, Sparkles, Users, Gift, Coffee, ArrowRight } from 'lucide-react';
import { MembershipBenefit } from '../types';

interface MembershipBenefitsSectionProps {
  benefits: MembershipBenefit[];
  onScrollToForm: () => void;
}

export default function MembershipBenefitsSection({ benefits, onScrollToForm }: MembershipBenefitsSectionProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'PiggyBank': return PiggyBank;
      case 'ShieldCheck': return ShieldCheck;
      case 'Sparkles': return Sparkles;
      case 'Users': return Users;
      case 'Gift': return Gift;
      case 'Coffee': return Coffee;
      default: return Sparkles;
    }
  };

  return (
    <section id="benefits-section" className="py-16 sm:py-20 bg-white border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-amber-700 uppercase">
            EXCLUSIVE PRIVILEGES · 會員專屬入會六大權益
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            入會即享全方位家庭理財支持，讓每分愛都有回響
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            「理財這一家」堅持非營利公益初衷，每一位完成線上入會的家庭，均享有無償工具下載、專業諮詢與專屬實體禮盒。
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b) => {
            const Icon = getIcon(b.iconName);
            return (
              <div
                key={b.id}
                className="group bg-[#FFFDF9] rounded-2xl border border-amber-200/80 hover:border-amber-400 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 via-orange-400 to-emerald-400 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700">
                    ✨ {b.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA strip */}
        <div className="mt-12 text-center">
          <button
            onClick={onScrollToForm}
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-700 rounded-xl shadow-md shadow-orange-500/25 transition-all cursor-pointer"
          >
            <span>填寫下方入會表格 · 立即開通完整權益</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
