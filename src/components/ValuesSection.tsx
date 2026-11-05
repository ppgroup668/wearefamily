import { ShieldCheck, PiggyBank, TrendingUp, HeartHandshake } from 'lucide-react';

export default function ValuesSection() {
  const pillars = [
    {
      num: '01',
      title: '陽光透明 · 拒絕推銷',
      desc: '我們是由認證財務規劃顧問 (CFP) 與熱心理財志工發起的公益聚落。不販售任何基金、保險或高風險金融商品，只提供中立客觀的家庭財務知識。',
      icon: ShieldCheck,
      color: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      num: '02',
      title: '親子財商 · 從小扎根',
      desc: '打破「小孩子不懂錢」的傳統迷思！用生活情境與沉浸式桌遊，帶孩子理解延遲享樂、儲蓄目標與勞動價值，讓金錢成為孩子成長的翅膀。',
      icon: PiggyBank,
      color: 'from-amber-400 to-orange-400',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    },
    {
      num: '03',
      title: '穩健增長 · 631 原則',
      desc: '不盲信明牌投機！推廣「60%生活必要、30%指數投資儲備、10%風險防護」的陽光理財法則，陪伴家庭以時間複利穩健滾出幸福資產。',
      icon: TrendingUp,
      color: 'from-sky-400 to-blue-500',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200'
    },
    {
      num: '04',
      title: '世代同心 · 守護傳承',
      desc: '從年輕小資成家、育兒教育金儲備，到壯年退休安養金流與家族財富傳承，讓每個世代的愛與辛勤付出，都有堅實溫暖的防護網。',
      icon: HeartHandshake,
      color: 'from-orange-400 to-rose-400',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <section id="values-section" className="py-16 sm:py-20 bg-[#FFFDF9] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-amber-700 uppercase">
            OUR CORE VALUES · 「理財這一家」核心堅持
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            理財的終點不是數字，而是全家人安心燦爛的笑容
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            我們相信，健康的金錢觀念如同陽光與空氣，是每個家庭最不可或缺的幸福基石。
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className={`rounded-2xl p-6 ${pillar.bgColor} border ${pillar.borderColor} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                  <span>✨ 守護全家人的陽光財富</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sunny Quote Box */}
        <div className="mt-12 bg-gradient-to-r from-amber-400/20 via-emerald-400/20 to-sky-400/20 rounded-3xl p-8 sm:p-10 border border-amber-300/60 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-2xl">🌻</span>
            <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              「聰明理財不是為了變成守財奴，而是讓每一分賺來的辛苦錢，都能為心愛的人照亮未來的路。」
            </blockquote>
            <div className="text-xs sm:text-sm text-emerald-900 font-semibold">
              — 「理財這一家」志工顧問團 與 社區家庭共筆
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
