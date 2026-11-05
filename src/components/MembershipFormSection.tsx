import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  User, 
  Heart, 
  Phone, 
  Mail, 
  Users, 
  CheckCircle2, 
  HelpCircle, 
  MapPin, 
  Calendar, 
  CreditCard,
  ShieldCheck,
  PiggyBank,
  Check,
  Award,
  Crown,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MemberApplication, MembershipTier } from '../types';

interface MembershipFormSectionProps {
  onApplicationSubmitted: (application: MemberApplication) => void;
}

export default function MembershipFormSection({ onApplicationSubmitted }: MembershipFormSectionProps) {
  // Form Tier
  const [selectedTier, setSelectedTier] = useState<MembershipTier>('family');

  // Form Fields
  const [applicantName, setApplicantName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [gender, setGender] = useState('先生');
  const [birthday, setBirthday] = useState('1990-01-01');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('台北市');
  const [district, setDistrict] = useState('大安區');
  const [familyStructure, setFamilyStructure] = useState('育兒小家庭 (2大1小)');
  const [familyCount, setFamilyCount] = useState(3);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    '親子財商',
    '家庭記帳',
    '指數投資'
  ]);
  const [contactPreference, setContactPreference] = useState('LINE 官方社群與電子專刊');
  const [referralSource, setReferralSource] = useState('親友口碑推薦');
  const [statement, setStatement] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    '親子財商',
    '家庭記帳',
    '首購買房',
    '指數投資',
    '保單健檢',
    '退休傳承',
    '緊急預備金',
    '家庭信託'
  ];

  const cities = [
    '台北市', '新北市', '桃園市', '台中市', '台南市', '高雄市', 
    '基隆市', '新竹市', '新竹縣', '苗栗縣', '彰化縣', '南投縣', 
    '雲林縣', '嘉義市', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const getTierInfo = (tier: MembershipTier) => {
    switch (tier) {
      case 'free':
        return {
          name: '陽光之友 · 普惠會員',
          price: 'NT$ 0 / 永久免費',
          color: 'from-amber-400 to-orange-400',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          desc: '適合想要初步建立家庭記帳與財商觀念的小資與單身夥伴',
          perks: ['全套 631 記帳自動化試算表', '家庭理財電子月刊', '會員專屬社群交流']
        };
      case 'family':
        return {
          name: '幸福家庭 · 認證會員',
          price: 'NT$ 0 / 公益推廣專案',
          color: 'from-amber-500 via-orange-500 to-emerald-500',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          desc: '熱門首選！適合正在買房、養育子女的核心家庭，享有全面輔導',
          perks: ['年度 1 對 1 財務健檢諮詢', '親子財商共學學習單與題庫', '郵寄實體向日葵歡迎禮盒', '官方會員數位身分憑證']
        };
      case 'legacy':
        return {
          name: '世代傳承 · 守護會員',
          price: 'NT$ 0 / 敬老與傳承專案',
          color: 'from-emerald-500 to-teal-600',
          badgeBg: 'bg-teal-100 text-teal-900 border-teal-300',
          desc: '適合 45 歲以上中壯年、退休長輩及三代同堂家族資產守護',
          perks: ['家族信託與法規諮詢指導', '安養退休被動金流盤點', '長輩專屬服務電話與實體沙龍', '全家族三代專屬權益分享']
        };
    }
  };

  const currentTierInfo = getTierInfo(selectedTier);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!applicantName.trim()) {
      newErrors.applicantName = '請輸入主要申請人姓名';
    } else if (applicantName.trim().length < 2) {
      newErrors.applicantName = '姓名至少需要 2 個字元';
    }

    if (!familyName.trim()) {
      newErrors.familyName = '請填寫家庭理財暱稱（例如：向日葵存錢家）';
    }

    const phoneRegex = /^09\d{2}-?\d{3}-?\d{3}$/;
    if (!phone.trim()) {
      newErrors.phone = '請輸入聯絡手機號碼';
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      newErrors.phone = '請輸入正確的台灣手機格式 (例如: 0912-345-678)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = '請輸入電子信箱';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = '請輸入有效的電子信箱格式';
    }

    if (selectedInterests.length === 0) {
      newErrors.interests = '請至少勾選一項家庭關注的理財重點';
    }

    if (!agreeTerms) {
      newErrors.terms = '請確認同意理財這一家陽光會員章程';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      const firstError = Object.keys(errors)[0];
      const errorEl = document.getElementById(`field-${firstError}`);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#38BDF8', '#F97316', '#EC4899']
      });
    } catch {
      // safe fallback
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newMember: MemberApplication = {
      id: `MEMBER-2026-${randomSuffix}`,
      appliedAt: new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      tier: selectedTier,
      tierName: currentTierInfo.name,
      applicantName: applicantName.trim(),
      familyName: familyName.trim(),
      gender,
      birthday,
      phone: phone.trim(),
      email: email.trim(),
      city,
      district: district.trim() || '市區',
      familyStructure,
      familyCount,
      interests: selectedInterests,
      contactPreference,
      referralSource,
      statement: statement.trim() || '期望在理財這一家與全家人共同成長，打造陽光溫暖的財務未來！',
      status: 'active',
      likes: 1,
      isLiked: false
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onApplicationSubmitted(newMember);
      setStatement('');
    }, 400);
  };

  return (
    <section id="membership-form-section" className="py-16 sm:py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs sm:text-sm font-bold tracking-wider text-amber-700 uppercase">
            MEMBERSHIP APPLICATION FORM · 會員入會申請表格
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            正式加入「理財這一家」· 領取專屬陽光家庭會員卡
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            填寫下方完整入會表格，立即開通終身免費家庭理財權益、下載自動化記帳工具包，並獲發專屬數位家庭會員卡！
          </p>
        </div>

        {/* Tier Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {(['free', 'family', 'legacy'] as MembershipTier[]).map((tierKey) => {
            const info = getTierInfo(tierKey);
            const isSelected = selectedTier === tierKey;

            return (
              <div
                key={tierKey}
                onClick={() => setSelectedTier(tierKey)}
                className={`relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-amber-500 ring-2 ring-amber-400 shadow-lg scale-102'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                {tierKey === 'family' && (
                  <span className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-xs">
                    多數家庭推薦
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${info.badgeBg}`}>
                      {info.name.split('·')[0].trim()}
                    </span>
                    <span className="text-sm font-black text-emerald-600">
                      {info.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {info.name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    {info.desc}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {info.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {isSelected ? '✓ 目前選擇此方案' : '點擊選擇此方案'}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Form Container Grid (Split: Form Controls + Live Interactive Membership Card Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Membership Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-200/90 shadow-lg p-6 sm:p-10 space-y-8">
            
            {/* Sunny Family Photo Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-200/80 shadow-xs h-48 sm:h-56 group">
              <img
                src="/assets/aistudio/image_dc125b3b.png"
                alt="理財這一家 - 全家一同儲蓄與規劃目標"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-5 sm:p-6">
                <div className="text-white space-y-1">
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    ✨ SUNSHINE WEALTH FAMILY
                  </span>
                  <div className="text-base sm:text-lg font-extrabold tracking-tight">
                    陪伴孩子從小學會儲蓄與夢想 · 理財這一家正式入會
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Part 1: Applicant Profile */}
              <div className="space-y-4">
                <div className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-amber-100">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>一、主要申請人基本資料</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="field-applicantName" className="block text-xs font-bold text-slate-700 mb-1">
                      申請人全名 <span className="text-orange-500">*</span>
                    </label>
                    <input
                      id="field-applicantName"
                      type="text"
                      placeholder="例如：陳冠宇"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        errors.applicantName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 focus:border-amber-500'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all`}
                    />
                    {errors.applicantName && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.applicantName}</p>
                    )}
                  </div>

                  {/* Family Nickname */}
                  <div>
                    <label htmlFor="field-familyName" className="block text-xs font-bold text-slate-700 mb-1">
                      家庭理財暱稱 / 堂號 <span className="text-orange-500">*</span>
                    </label>
                    <input
                      id="field-familyName"
                      type="text"
                      placeholder="例如：向日葵存錢家、浩浩一家"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border ${
                        errors.familyName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 focus:border-amber-500'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all`}
                    />
                    {errors.familyName && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.familyName}</p>
                    )}
                  </div>

                  {/* Salutation / Gender */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      稱謂
                    </label>
                    <div className="flex gap-2">
                      {['先生', '女士', '免填'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`flex-1 py-2 px-3 text-xs rounded-xl border font-medium transition-all cursor-pointer ${
                            gender === g
                              ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Birthday */}
                  <div>
                    <label htmlFor="field-birthday" className="block text-xs font-bold text-slate-700 mb-1">
                      出生年月日 (生日享專屬家庭禮遇)
                    </label>
                    <input
                      id="field-birthday"
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                    />
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label htmlFor="field-phone" className="block text-xs font-bold text-slate-700 mb-1">
                      聯絡手機 (會員身分驗證號) <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="field-phone"
                        type="tel"
                        placeholder="0912-345-678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${
                          errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 focus:border-amber-500'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="field-email" className="block text-xs font-bold text-slate-700 mb-1">
                      電子信箱 (寄送專屬會員工具包) <span className="text-orange-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="field-email"
                        type="email"
                        placeholder="yourname@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border ${
                          errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-300 focus:border-amber-500'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* City & District */}
                  <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        居住縣市 (實體沙龍在地服務)
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                      >
                        {cities.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        鄉鎮市區
                      </label>
                      <input
                        type="text"
                        placeholder="例如：大安區、板橋區"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Family Structure & Wealth Preferences */}
              <div className="space-y-4 pt-4 border-t border-amber-100">
                <div className="text-base font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-amber-100">
                  <PiggyBank className="w-4 h-4 text-emerald-600" />
                  <span>二、家庭結構與財商需求調查</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      家庭成員結構
                    </label>
                    <select
                      value={familyStructure}
                      onChange={(e) => setFamilyStructure(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                    >
                      <option value="單身小資準備成家">單身小資準備成家</option>
                      <option value="新婚兩人家庭">新婚兩人家庭</option>
                      <option value="育兒小家庭 (幼兒/學齡前)">育兒小家庭 (幼兒/學齡前)</option>
                      <option value="學齡子女家庭 (國小/國中)">學齡子女家庭 (國小/國中)</option>
                      <option value="三代同堂樂齡家庭">三代同堂樂齡家庭</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      家庭總人數 (人)
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setFamilyCount(Math.max(1, familyCount - 1))}
                        className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 font-bold hover:bg-amber-100 flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-base font-bold text-slate-900 tabular-nums w-8 text-center">
                        {familyCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFamilyCount(Math.min(10, familyCount + 1))}
                        className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 font-bold hover:bg-amber-100 flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Multiple Choice Interests */}
                <div id="field-interests" className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    最希望「理財這一家」協助的理財面向 (可複選) <span className="text-orange-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {interestOptions.map((interest) => {
                      const isChecked = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isChecked
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-400'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span>{interest}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.interests && (
                    <p className="text-xs text-rose-500 mt-1.5 font-medium">{errors.interests}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      偏好會員服務接收方式
                    </label>
                    <select
                      value={contactPreference}
                      onChange={(e) => setContactPreference(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                    >
                      <option value="LINE 官方社群與電子專刊">📱 LINE 官方社群與電子專刊</option>
                      <option value="電子信箱 Email 深度研報">📧 電子信箱 Email 深度研報</option>
                      <option value="實體沙龍與紙本教材掛號">📮 實體沙龍與紙本教材掛號</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      如何得知「理財這一家」？
                    </label>
                    <select
                      value={referralSource}
                      onChange={(e) => setReferralSource(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 bg-white"
                    >
                      <option value="親友口碑推薦">親友口碑推薦</option>
                      <option value="網路搜尋或社群媒體">網路搜尋或社群媒體</option>
                      <option value="學校與幼兒園推廣">學校與幼兒園推廣</option>
                      <option value="社區志工中心宣導">社區志工中心宣導</option>
                    </select>
                  </div>
                </div>

                {/* Statement / Personal message */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="field-statement" className="block text-xs font-bold text-slate-700">
                    想對「理財這一家」說的話 / 入會期待
                  </label>
                  <textarea
                    id="field-statement"
                    rows={3}
                    placeholder="例如：希望能在顧問指導下，幫全家人理清保單與買房自備款，給孩子健康的金錢觀念！"
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all"
                  />
                </div>
              </div>

              {/* Part 3: Sunshine Charter Agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    我已詳閱並同意「理財這一家」陽光會員公約：嚴格恪守個人隱私保密原則；認同客觀理性理財理念；會員間彼此友愛互助，絕不在社群內從事未經授權之金融商品推銷與商業借貸行為。
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.terms}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 text-base font-extrabold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 hover:from-amber-600 hover:via-orange-600 hover:to-emerald-700 rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>正在為您產製專屬會員卡...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>確認送出入會申請表（立即領取數位會員卡）</span>
                    </>
                  )}
                </button>
                <div className="mt-2 text-center text-xs text-slate-500">
                  ✨ 100% 免費公益入會 · 資料加密保護 · 無任何後續推銷
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Live Interactive Membership Card Preview */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            <div className="bg-gradient-to-br from-amber-50 via-emerald-50 to-orange-50 rounded-3xl p-6 sm:p-7 border border-amber-300/80 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-amber-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-900 uppercase">DIGITAL MEMBER CARD</div>
                    <div className="text-sm font-extrabold text-slate-900">即時連動數位會員卡預覽</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-1 rounded-md">
                  即填即顯
                </span>
              </div>

              {/* The Realistic Metallic Shiny Member Card */}
              <div className="mt-6 relative rounded-2xl p-6 bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-950 text-white shadow-xl overflow-hidden border border-amber-400/40">
                {/* Holographic light effect */}
                <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-amber-300/30 via-emerald-300/20 to-transparent rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-emerald-400 flex items-center justify-center text-slate-950 shadow-sm font-black text-xs">
                        ☀️
                      </div>
                      <div>
                        <div className="text-xs font-black tracking-wider text-amber-300 uppercase">
                          WEALTH FAMILY CARD
                        </div>
                        <div className="text-base font-extrabold tracking-tight text-white">
                          理財這一家
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-amber-400/20 border border-amber-400/50 text-amber-300">
                      {currentTierInfo.name.split('·')[0].trim()}
                    </span>
                  </div>

                  {/* Member Name & Family Title */}
                  <div className="pt-2">
                    <div className="text-xs text-slate-400 font-medium">家庭理財戶名</div>
                    <div className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
                      {familyName || '向日葵存錢家'}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      主要持卡人：<span className="font-bold text-white">{applicantName || '陳冠宇'}</span> ({gender})
                    </div>
                  </div>

                  {/* Card Bottom: ID, Expiry, Chip */}
                  <div className="pt-4 border-t border-slate-700/80 flex items-end justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">MEMBER ID</div>
                      <div className="font-mono font-bold tracking-widest text-amber-200">
                        MEMBER-2026-LIVE
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 font-mono">所在地區</div>
                      <div className="font-bold text-slate-200">
                        {city} {district || '市區'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Privileges */}
              <div className="mt-6 space-y-2.5 text-xs text-amber-950">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>送出後立即可下載全套「家庭 631 記帳自動化試算表」</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>免費預約年度 1 對 1 CFP 認證理財顧問客觀財務健檢</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>實體入會歡迎禮包免費掛號寄送至府上</span>
                </div>
              </div>
            </div>

            {/* Quick Contact & Assistance Card */}
            <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-slate-900 text-sm">入會有任何疑問？</div>
                <div className="text-slate-600">會員諮詢專線：(852) 7059-2253</div>
                <div className="text-amber-800 font-medium">歡迎直接送出表格，專屬會員秘書將於 24 小時內發送憑證！</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
