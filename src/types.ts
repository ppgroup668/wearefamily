export type MembershipTier = 'free' | 'family' | 'legacy';

export interface MembershipBenefit {
  id: string;
  iconName: string;
  title: string;
  description: string;
  highlight: string;
  badge: string;
  themeColor: string;
}

export interface MemberApplication {
  id: string;
  appliedAt: string;
  tier: MembershipTier;
  tierName: string;
  applicantName: string;
  familyName: string;
  gender: string;
  birthday: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  familyStructure: string; // 單身小資 / 新婚兩人 / 育兒小家庭 / 三代同堂
  familyCount: number;
  interests: string[]; // 親子財商、家庭記帳、首購買房、指數投資、保單健檢、退休傳承
  contactPreference: string; // LINE 社群 / 電子郵件 / 實體沙龍 / 線上專刊
  referralSource: string;
  statement: string;
  status: 'active';
  likes: number;
  isLiked?: boolean;
}
