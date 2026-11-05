import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: '申請加入「理財這一家」需要繳交入會費或年費嗎？',
      a: '完全不需要！「理財這一家」為非營利社區財務素養推廣倡議，所有會員方案（包含陽光之友、幸福家庭、世代傳承會員）皆為 0 元免費入會，且終身不收年費。所有經費由愛心教育基金與熱心財務顧問志工團隊支持運作。'
    },
    {
      q: '會員資格有期限嗎？未來會不會自動續約扣款或推銷？',
      a: '會員資格永久有效，絕無自動扣款或隱藏收費機制！我們在章程中明確規範「100% 拒絕推銷金融商品承諾」，任何志工或顧問均不得向會員推銷保單、基金、虛擬貨幣或貸款商品，請您安心加入。'
    },
    {
      q: '線上送出入會表格後，如何領取「家庭 631 記帳工具包」與實體歡迎禮包？',
      a: '表單送出後，系統將於 3 分鐘內將數位工具包下載連結（含 Excel / Google Sheets 自動化試算模組與使用影音教學）寄至您填寫的電子信箱。若您選擇幸福家庭或世代傳承會員，實體向日葵存錢筒歡迎禮盒將於 3-5 個工作天內免費郵寄至您的地址。'
    },
    {
      q: '我填寫的手機號碼與家庭資料，會被如何保存？個人隱私如何保障？',
      a: '我們嚴格遵守個人資料保護法規，所有申請資料皆經由 SSL 加密儲存，僅供「理財這一家」發送會員通知、數位工具包與實體禮包寄送使用，絕不提供給任何第三方金融機構或廣告商業用途。'
    },
    {
      q: '成為會員後，如何預約專屬的「年度 1 對 1 CFP 財務健檢」？',
      a: '入會成功後，您的會員專屬信箱將收到一封預約指南，內含專屬線上顧問行事曆連結。您可以依據方便的時間選擇平日晚間或週末時段，進行 40 分鐘的日光線上視訊或專線語音面談。'
    }
  ];

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-white border-t border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-amber-700 uppercase">
            MEMBERSHIP FAQ · 會員入會常見問答
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            入會須知與貼心解答
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            為您解答有關免費入會、權益領取、隱私保護與非營利承諾的常見疑問。
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-amber-200/80 bg-[#FFFDF9] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-amber-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-base font-bold text-slate-900">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-amber-100/60">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
