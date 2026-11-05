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
  Filter,
  Pencil,
  Trash2,
  Save,
  AlertTriangle,
  Eye
} from 'lucide-react';
import { MemberApplication, MembershipTier } from '../types';

interface MemberDataViewerModalProps {
  isOpen: boolean;
  members: MemberApplication[];
  onClose: () => void;
  onLogout: () => void;
  onViewMemberCard: (member: MemberApplication) => void;
  onUpdateMember: (updatedMember: MemberApplication) => void;
  onDeleteMember: (memberId: string) => void;
}

const hkRegions: Record<string, string[]> = {
  '香港島': ['中西區', '灣仔區', '東區', '南區'],
  '九龍': ['油尖旺區', '深水埗區', '九龍城區', '黃大仙區', '觀塘區'],
  '新界': ['沙田區', '大埔區', '北區', '元朗區', '屯門區', '荃灣區', '葵青區', '西貢區'],
  '離島': ['離島區 (東涌/大嶼山/長洲/南丫島等)']
};

export default function MemberDataViewerModal({
  isOpen,
  members,
  onClose,
  onLogout,
  onViewMemberCard,
  onUpdateMember,
  onDeleteMember
}: MemberDataViewerModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Edit State
  const [editingMember, setEditingMember] = useState<MemberApplication | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<MemberApplication>>({});
  const [editError, setEditError] = useState('');

  // Delete State
  const [deletingMember, setDeletingMember] = useState<MemberApplication | null>(null);

  // Success toast message
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

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

  const handleStartEdit = (member: MemberApplication) => {
    setEditingMember(member);
    setEditFormData({
      ...member,
      interests: [...member.interests]
    });
    setEditError('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    if (!editFormData.applicantName?.trim()) {
      setEditError('請輸入申請人姓名');
      return;
    }
    if (!editFormData.familyName?.trim()) {
      setEditError('請輸入家庭堂號/暱稱');
      return;
    }
    if (!editFormData.phone?.trim()) {
      setEditError('請輸入香港聯絡電話');
      return;
    }

    const updated: MemberApplication = {
      ...editingMember,
      applicantName: editFormData.applicantName.trim(),
      familyName: editFormData.familyName.trim(),
      gender: editFormData.gender || editingMember.gender,
      birthday: editFormData.birthday || editingMember.birthday,
      phone: editFormData.phone.trim(),
      email: editFormData.email?.trim() || editingMember.email,
      city: editFormData.city || editingMember.city,
      district: editFormData.district || editingMember.district,
      familyStructure: editFormData.familyStructure || editingMember.familyStructure,
      familyCount: Number(editFormData.familyCount) || editingMember.familyCount,
      tier: (editFormData.tier as MembershipTier) || editingMember.tier,
      tierName:
        editFormData.tier === 'free'
          ? '陽光之友 · 普惠會員'
          : editFormData.tier === 'legacy'
          ? '世代傳承 · 守護會員'
          : '幸福家庭 · 認證會員',
      contactPreference: editFormData.contactPreference || editingMember.contactPreference,
      statement: editFormData.statement?.trim() || editingMember.statement
    };

    onUpdateMember(updated);
    setEditingMember(null);
    showToast(`已成功儲存會員 ${updated.applicantName} (${updated.id}) 的變更！`);
  };

  const handleConfirmDelete = () => {
    if (!deletingMember) return;
    const id = deletingMember.id;
    const name = deletingMember.applicantName;
    onDeleteMember(id);
    setDeletingMember(null);
    showToast(`已刪除會員 ${name} (${id}) 的報名資料！`);
  };

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
    link.setAttribute('download', `理財這一家_香港會員名冊_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-[#FFFDF9] rounded-3xl max-w-7xl w-full border border-amber-300 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
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
                可即時檢視所有已提交之香港會員申請名冊、執行編輯、刪除、篩選匯出與列印
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
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="bg-emerald-500 text-white text-xs font-bold py-2.5 px-6 text-center animate-in slide-in-from-top flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

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
              <div className="text-xs text-purple-700 font-medium">入會手續費</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight mt-1">費用全免 (HK$ 0)</div>
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
                    <th className="py-3 px-4 text-center whitespace-nowrap">操作管理</th>
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
                      <td className="py-3 px-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* View card */}
                          <button
                            onClick={() => onViewMemberCard(m)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
                            title="查看數位會員卡"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Edit button */}
                          <button
                            onClick={() => handleStartEdit(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer"
                            title="編輯此會員報名資料"
                          >
                            <Pencil className="w-3 h-3" />
                            <span>編輯</span>
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => setDeletingMember(m)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                            title="刪除此筆資料"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>刪除</span>
                          </button>
                        </div>
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

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-sky-300 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    編輯會員報名資料
                  </h4>
                  <div className="text-xs text-slate-500 font-mono">
                    會員編號：{editingMember.id} · 登記時間：{editingMember.appliedAt}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setEditingMember(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    申請人姓名 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.applicantName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, applicantName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    稱謂
                  </label>
                  <select
                    value={editFormData.gender || '先生'}
                    onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="先生">先生</option>
                    <option value="女士">女士</option>
                    <option value="免填">免填</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    家庭理財暱稱 / 堂號 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.familyName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, familyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    出生日期
                  </label>
                  <input
                    type="date"
                    value={editFormData.birthday || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, birthday: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    香港聯絡電話 (WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={editFormData.phone || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    電子信箱
                  </label>
                  <input
                    type="email"
                    value={editFormData.email || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    居住地區（香港）
                  </label>
                  <select
                    value={editFormData.city || '香港島'}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      const newDistricts = hkRegions[newCity] || [];
                      setEditFormData({
                        ...editFormData,
                        city: newCity,
                        district: newDistricts[0] || ''
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 bg-white"
                  >
                    {Object.keys(hkRegions).map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    行政分區
                  </label>
                  <select
                    value={editFormData.district || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, district: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 bg-white"
                  >
                    {(hkRegions[editFormData.city || '香港島'] || []).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    會員方案
                  </label>
                  <select
                    value={editFormData.tier || 'family'}
                    onChange={(e) => setEditFormData({ ...editFormData, tier: e.target.value as MembershipTier })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="family">幸福家庭 · 認證會員</option>
                    <option value="free">陽光之友 · 普惠會員</option>
                    <option value="legacy">世代傳承 · 守護會員</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    服務接收方式
                  </label>
                  <select
                    value={editFormData.contactPreference || 'WhatsApp 專屬社群與訊息通知'}
                    onChange={(e) => setEditFormData({ ...editFormData, contactPreference: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500 bg-white"
                  >
                    <option value="WhatsApp 專屬社群與訊息通知">WhatsApp 專屬社群與訊息通知</option>
                    <option value="電子信箱 Email 深度研報">電子信箱 Email 深度研報</option>
                    <option value="電話或短信 SMS 專人聯繫">電話或短信 SMS 專人聯繫</option>
                    <option value="紙本教材與歡迎禮盒郵寄">紙本教材與歡迎禮盒郵寄</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  入會期待與留言
                </label>
                <textarea
                  rows={3}
                  value={editFormData.statement || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, statement: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>

              {editError && (
                <p className="text-xs text-rose-500 font-semibold">{editError}</p>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>儲存更新</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingMember && (
        <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-rose-300 shadow-2xl p-6 sm:p-7 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h4 className="text-lg font-bold text-slate-900">
                確定要刪除這筆會員報名資料嗎？
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                即將從後台與星光榜中刪除 <span className="font-bold text-slate-800">{deletingMember.applicantName}</span> 的「<span className="font-bold text-amber-800">{deletingMember.familyName}</span>」（編號：{deletingMember.id}）。此操作無法復原。
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingMember(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
