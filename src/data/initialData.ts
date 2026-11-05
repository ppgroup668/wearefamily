import { MemberApplication, MembershipBenefit } from '../types';

export const MEMBERSHIP_BENEFITS: MembershipBenefit[] = [
  {
    id: 'benefit-toolkit',
    iconName: 'PiggyBank',
    title: '全套家庭陽光理財工具包',
    description: '免費下載官方「631 記帳自動化試算表」、家庭收支漏水檢測表與子女零用錢合約範本。',
    highlight: '即時入會即可永久下載更新',
    badge: '數位贈禮',
    themeColor: 'amber'
  },
  {
    id: 'benefit-consult',
    iconName: 'ShieldCheck',
    title: '年度 1 對 1 客觀財務健檢',
    description: '由非營利 CFP / RFC 認證理財顧問親自一對一諮詢，全面盤點保單重複與現金流盲點。',
    highlight: '零推銷承諾，純知識梳理',
    badge: '專屬權益',
    themeColor: 'emerald'
  },
  {
    id: 'benefit-kids',
    iconName: 'Sparkles',
    title: '親子財商共學教材與題庫',
    description: '每季寄送適合學齡兒童的財商教育漫畫月刊、三罐子存錢學習單與日常金錢對話指南。',
    highlight: '培養孩子負責任金錢觀',
    badge: '親子最愛',
    themeColor: 'orange'
  },
  {
    id: 'benefit-community',
    iconName: 'Users',
    title: '會員專屬交流社群與問答信箱',
    description: '加入「理財這一家」專屬會員交流圈，隨時在私密社群提問，由理財志工群暖心解答。',
    highlight: '互助共好、經驗傳承',
    badge: '會員圈子',
    themeColor: 'sky'
  },
  {
    id: 'benefit-vip',
    iconName: 'Gift',
    title: '會員家庭實體入會歡迎禮包',
    description: '郵寄實體「向日葵家庭存錢筒組」、手繪家庭記帳小黑板及理財金句手札至府上。',
    highlight: '入會審核通過即免運寄送',
    badge: '實體禮品',
    themeColor: 'rose'
  },
  {
    id: 'benefit-lecture',
    iconName: 'Coffee',
    title: '每月陽光線上財經沙龍回放',
    description: '不受地域限制！隨時線上回顧最新通膨因應、指數化 ETF 配置及長照信託專題演講。',
    highlight: '無限次高清回放與講義',
    badge: '終身學習',
    themeColor: 'indigo'
  }
];

export const INITIAL_MEMBERS: MemberApplication[] = [
  {
    id: 'MEMBER-2026-8801',
    appliedAt: '2026-11-03 15:30',
    tier: 'family',
    tierName: '幸福家庭 · 認證會員',
    applicantName: '陳冠宇',
    familyName: '向日葵存錢家',
    gender: '男',
    birthday: '1988-06-15',
    phone: '0912-345-678',
    email: 'guanyu.chen@example.com',
    city: '台北市',
    district: '大安區',
    familyStructure: '育兒小家庭 (2大2小)',
    familyCount: 4,
    interests: ['親子財商', '家庭記帳', '指數投資'],
    contactPreference: 'LINE 社群與專刊',
    referralSource: '親友口碑推薦',
    statement: '希望跟孩子一起養成存錢好習慣，打造一個沒有金錢壓力的溫暖家庭！',
    status: 'active',
    likes: 54,
    isLiked: true
  },
  {
    id: 'MEMBER-2026-8842',
    appliedAt: '2026-11-02 10:15',
    tier: 'free',
    tierName: '陽光之友 · 普惠會員',
    applicantName: '林雅婷',
    familyName: '小資成家樂悠悠',
    gender: '女',
    birthday: '1995-11-20',
    phone: '0922-888-999',
    email: 'yating.lin@example.com',
    city: '新北市',
    district: '板橋區',
    familyStructure: '新婚兩人家庭',
    familyCount: 2,
    interests: ['首購買房', '指數投資', '家庭記帳'],
    contactPreference: '電子郵件月刊',
    referralSource: '網路搜尋',
    statement: '剛結婚準備買房，入會後工具包的房貸試算表真的太實用了！',
    status: 'active',
    likes: 38,
    isLiked: false
  },
  {
    id: 'MEMBER-2026-8915',
    appliedAt: '2026-11-01 18:40',
    tier: 'legacy',
    tierName: '世代傳承 · 守護會員',
    applicantName: '張榮貴',
    familyName: '三代同堂長春閣',
    gender: '男',
    birthday: '1962-03-08',
    phone: '0933-456-789',
    email: 'ronggui.zhang@example.com',
    city: '台中市',
    district: '西區',
    familyStructure: '三代同堂家庭',
    familyCount: 6,
    interests: ['退休傳承', '保單健檢', '親子財商'],
    contactPreference: '實體沙龍與電話',
    referralSource: '社區服務中心宣導',
    statement: '到了準備退休的年紀，希望讓孫子有健康的金錢觀，也讓家裡的資產安安穩穩傳承。',
    status: 'active',
    likes: 67,
    isLiked: false
  }
];
