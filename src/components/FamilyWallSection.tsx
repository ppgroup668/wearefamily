import { useState } from 'react';
import { Heart, Search, Sparkles, User, MapPin, Target, CreditCard, ShieldCheck } from 'lucide-react';
import { MemberApplication } from '../types';

interface MemberCommunitySectionProps {
  members: MemberApplication[];
  onToggleLike: (id: string) => void;
  onScrollToForm: () => void;
}

export default function FamilyWallSection({ members, onToggleLike, onScrollToForm }: MemberCommunitySectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTier = filterTier === 'all' || member.tier === filterTier;

    return matchesSearch && matchesTier;
  });

  return (
    <section id="community-wall-section" className="py-16 sm:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-emerald-800 uppercase">
            SUNSHINE MEMBER ROLL · 新進家庭星光榜
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            歡迎每一戶攜手邁向陽光財富的新進家庭
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            線上填寫入會表格後，您家的專屬數位會員卡與入會期待將即時收錄在此。讓我們互相送上真摯的溫暖祝福！
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="搜尋家庭稱呼、城市或理財焦點..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setFilterTier('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterTier === 'all'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              全部會員 ({members.length})
            </button>
            <button
              onClick={() => setFilterTier('family')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterTier === 'family'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              幸福家庭會員
            </button>
            <button
              onClick={() => setFilterTier('free')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterTier === 'free'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              陽光之友會員
            </button>
            <button
              onClick={() => setFilterTier('legacy')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterTier === 'legacy'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              世代傳承會員
            </button>
          </div>
        </div>

        {/* Member Cards Grid */}
        {filteredMembers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-amber-300 max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-700">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="text-base font-bold text-slate-800">查無相關的會員家庭</div>
            <p className="text-xs text-slate-500">嘗試調整搜尋字詞，或立即填寫表格成為第一批新星會員！</p>
            <button
              onClick={onScrollToForm}
              className="px-5 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-colors cursor-pointer"
            >
              填寫入會表格
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((item) => {
              const isFamilyTier = item.tier === 'family';
              const isLegacyTier = item.tier === 'legacy';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-amber-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between space-y-4 relative group"
                >
                  {/* Top bar with family tag & timestamp */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-2xs ${
                        isFamilyTier ? 'bg-emerald-100 text-emerald-800' : isLegacyTier ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.familyName.slice(0, 1)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 line-clamp-1">
                          {item.familyName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{item.applicantName}</span>
                          <span aria-hidden="true">·</span>
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{item.city}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isFamilyTier
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isLegacyTier
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {item.tierName.split('·')[0].trim()}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2.5 flex-1">
                    <div className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                      <span>家庭結構：</span>
                      <span className="text-slate-800 font-semibold">{item.familyStructure}</span>
                    </div>

                    {/* Interest tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-amber-50/80 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md"
                        >
                          #{interest}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line pt-1">
                      「{item.statement}」
                    </p>
                  </div>

                  {/* Footer with Like Button & ID */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 text-[11px]">
                      {item.id}
                    </span>

                    <button
                      onClick={() => onToggleLike(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                        item.isLiked
                          ? 'bg-rose-50 text-rose-600 font-bold border border-rose-200 shadow-2xs'
                          : 'bg-slate-50 text-slate-500 hover:text-rose-500 hover:bg-rose-50/50'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${item.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="tabular-nums font-semibold">{item.likes}</span>
                      <span className="text-[11px]">{item.isLiked ? '已給予祝福' : '送上祝福'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
