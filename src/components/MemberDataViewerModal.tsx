import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Download, 
  Printer, 
  LogOut, 
  Users, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { MemberApplication } from '../types';

interface MemberDataViewerModalProps {
  isOpen: boolean;
  members: MemberApplication[];
  onClose: () => void;
  onLogout: () => void;
  onViewMemberCard: (member: MemberApplication) => void;
}

export default function MemberDataViewerModal({
  isOpen,
  members,
  onClose,
  onLogout,
  onViewMemberCard
}: MemberDataViewerModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  if (!isOpen) return null;

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.contactPreference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTier = selectedTier === 'all' || m.tier === selectedTier;
    const matchesRegion = selectedRegion === 'all' || m.city === selectedRegion;

    return matchesSearch && matchesTier && matchesRegion;
  });

  const handleExportCSV = () => {
    const headers = [
      '會員編號',
      '申請時間',
      '會員方案',
      '申請人姓名',
      '稱謂',
      '出生日期',
      '家庭堂號',
      '香港手機電話',
      '電子信箱',
      '居住區域(香港)',
      '分區',
      '家庭結構',
      '家庭人數',
      '關注理財面向',
      '服務接收方式',
      '入會心願期待'
    ];

    const rows = filteredMembers.map(m => [
      `"${m.id}"`,
      `"${m.appliedAt}"`,
      `"${m.tierName}"`,
      `"${m.applicantName}"`,
      `"${m.gender}"`,
      `"${m.birthday}"`,
      `"${m.familyName}"`,
      `"${m.phone}"`,
      `"${m.email}"`,
      `"${m.city}"`,
      `"${m.district}"`,
      `"${m.familyStructure}"`,
      `"${m.familyCount}"`,
      `"${m.interests.join(' / ')}"`,
      `"${m.contactPreference}"`,
      `"${m.statement.replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `理財這一家_會員報名名冊_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-6xl w-full border border-amber-300 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-amber-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  理財這一家 · 會員報名資料後台清冊
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                  管理員模式 (已驗證)
                </span>
              </div>
              <p className="text-xs text-slate-500">
                可即時檢視所有已提交之香港會員申請名冊、篩選匯出與列印
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
              title="匯出為 Excel CSV 檔"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>匯出 CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors cursor-pointer"
              title="列印名冊"
            >
              <Printer className="w-4 h-4 text-amber-600" />
              <span>列印</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              title="登出管理員身分"
            >
              <LogOut className="w-4 h-4" />
              <span>登出</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs">
              <div className="text-xs text-slate-500 font-medium">總報名家庭數</div>
              <div className="text-2xl font-black text-slate-900 tabular-nums mt-1">{members.length} <span className="text-xs font-normal text-slate-500">戶</span></div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs">
              <div className="text-xs text-emerald-700 font-medium">幸福家庭會員</div>
              <div className="text-2xl font-black text-emerald-700 tabular-nums mt-1">
                {members.filter(m => m.tier === 'family').length} <span className="text-xs font-normal text-slate-500">戶</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-2xs">
              <div className="text-xs text-sky-700 font-medium">WhatsApp 優先聯繫</div>
              <div className="text-2xl font-black text-sky-700 tabular-nums mt-1">
                {members.filter(m => m.contactPreference.includes('WhatsApp')).length} <span className="text-xs font-normal text-slate-500">戶</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-200 shadow-2xs">
              <div className="text-xs text-purple-700 font-medium">香港在地會員佔比</div>
              <div className="text-2xl font-black text-purple-700 tabular-nums mt-1">100%</div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="搜尋姓名、堂號、電話、Email或關鍵字..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-300"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span>方案：</span>
              </div>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">全部方案</option>
                <option value="family">幸福家庭</option>
                <option value="free">陽光之友</option>
                <option value="legacy">世代傳承</option>
              </select>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-2">
                <span>分區：</span>
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">全香港分區</option>
                <option value="香港島">香港島</option>
                <option value="九龍">九龍</option>
                <option value="新界">新界</option>
                <option value="離島">離島</option>
              </select>

              <span className="text-xs text-slate-400 ml-2">
                顯示 {filteredMembers.length} 筆
              </span>
            </div>
          </div>

          {/* Members Table */}
          <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-amber-50/70 border-b border-amber-200 text-amber-950 font-bold">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">會員編號</th>
                    <th className="py-3 px-4 whitespace-nowrap">申請人姓名</th>
                    <th className="py-3 px-4 whitespace-nowrap">家庭理財堂號</th>
                    <th className="py-3 px-4 whitespace-nowrap">會員方案</th>
                    <th className="py-3 px-4 whitespace-nowrap">香港電話 / WhatsApp</th>
                    <th className="py-3 px-4 whitespace-nowrap">電子信箱</th>
                    <th className="py-3 px-4 whitespace-nowrap">居住分區 (香港)</th>
                    <th className="py-3 px-4 whitespace-nowrap">關注理財面向</th>
                    <th className="py-3 px-4 whitespace-nowrap">服務接收方式</th>
                    <th className="py-3 px-4 whitespace-nowrap">登記時間</th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-amber-900 whitespace-nowrap">
                        {m.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {m.applicantName} <span className="text-slate-400 font-normal">({m.gender})</span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                        {m.familyName}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                          m.tier === 'family' 
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                            : m.tier === 'legacy'
                            ? 'bg-teal-50 text-teal-800 border border-teal-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {m.tierName.split('·')[0].trim()}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          <span>{m.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {m.email}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-medium text-slate-800">{m.city}</span> {m.district}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-[180px]">
                          {m.interests.map((it, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded">
                              {it}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          {m.contactPreference}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {m.appliedAt}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => onViewMemberCard(m)}
                          className="px-2.5 py-1 text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
                        >
                          查看會員卡
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                查無符合條件的會員資料
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
