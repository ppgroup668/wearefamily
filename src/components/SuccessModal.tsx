import { CheckCircle2, Download, Heart, X, Sparkles, QrCode, CreditCard, Award, ShieldCheck, Gift } from 'lucide-react';
import { MemberApplication } from '../types';

interface SuccessModalProps {
  member: MemberApplication | null;
  onClose: () => void;
  onGoToWall: () => void;
}

export default function SuccessModal({ member, onClose, onGoToWall }: SuccessModalProps) {
  if (!member) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-xl w-full border border-amber-300 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="關閉視窗"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-emerald-500 flex items-center justify-center mx-auto text-white shadow-lg shadow-orange-300/60">
            <Award className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            🎉 恭喜入會成功！歡迎加入「理財這一家」！
          </h3>
          <p className="text-sm text-slate-600">
            您已正式開通陽光家庭理財會員權益，專屬數位會員卡與識別碼已產製完成！
          </p>
        </div>

        {/* Realistic Metallic Member Card for Printing & Viewing */}
        <div id="printable-ticket" className="relative rounded-2xl p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950 text-white shadow-2xl border border-amber-400/50 space-y-6 overflow-hidden">
          {/* Holographic light reflection */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-amber-300/30 via-emerald-300/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Card Top */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-sm font-black text-sm">
                ☀️
              </div>
              <div>
                <div className="text-[11px] font-black tracking-widest text-amber-300 uppercase">
                  SUNSHINE WEALTH FAMILY
                </div>
                <div className="text-lg font-black tracking-tight text-white">
                  理財這一家 · 會員證
                </div>
              </div>
            </div>

            <span className="text-[11px] font-bold px-3 py-1 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300">
              {member.tierName}
            </span>
          </div>

          {/* Member Details */}
          <div className="relative z-10 space-y-1 pt-2">
            <div className="text-xs text-slate-400 font-medium">家庭理財戶名</div>
            <div className="text-2xl font-black text-amber-100 tracking-tight">
              {member.familyName}
            </div>
            <div className="text-xs text-slate-300">
              主要持卡人：<span className="font-bold text-white">{member.applicantName}</span> ({member.gender})
            </div>
            <div className="text-xs text-slate-400">
              通訊城市：{member.city} {member.district} · 家庭成員 {member.familyCount} 人
            </div>
          </div>

          {/* Card Footer */}
          <div className="relative z-10 pt-4 border-t border-slate-800 flex items-end justify-between">
            <div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider">MEMBER NUMBER</div>
              <div className="font-mono font-bold text-base text-amber-300 tracking-widest">
                {member.id}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                入會日期：{member.appliedAt.slice(0, 10)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shadow-xs">
                <QrCode className="w-10 h-10 text-slate-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Member Benefits Unlocked Notice */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-950 space-y-2">
          <div className="font-bold flex items-center gap-2 text-emerald-900 text-sm">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>您已解鎖的入會專屬禮遇：</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-700">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>家庭 631 記帳自動化試算表已寄達信箱</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>實體向日葵歡迎禮盒準備免運寄送</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>年度 1 對 1 CFP 財務健檢諮詢資格</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>專屬會員官方交流社群與問答信箱</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={handlePrint}
            className="py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>列印 / 存為會員卡 PDF 檔</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onGoToWall();
            }}
            className="py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-700 shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            <span>前往「新進家庭星光榜」查看</span>
          </button>
        </div>

      </div>
    </div>
  );
}
