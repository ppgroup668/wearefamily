/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MembershipBenefitsSection from './components/MembershipBenefitsSection';
import ValuesSection from './components/ValuesSection';
import MembershipFormSection from './components/MembershipFormSection';
import FamilyWallSection from './components/FamilyWallSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import SuccessModal from './components/SuccessModal';
import AdminLoginModal from './components/AdminLoginModal';
import MemberDataViewerModal from './components/MemberDataViewerModal';
import { MEMBERSHIP_BENEFITS, INITIAL_MEMBERS } from './data/initialData';
import { MemberApplication } from './types';

const STORAGE_KEY_MEMBERS = 'wealth_family_members_v3';

export default function App() {
  const [members, setMembers] = useState<MemberApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEMBERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_MEMBERS;
  });

  const [latestMember, setLatestMember] = useState<MemberApplication | null>(null);

  // Admin authentication and data viewer state
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDataViewerOpen, setIsAdminDataViewerOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem('admin_wealth_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
    } catch {
      // storage unavailable
    }
  }, [members]);

  const handleOpenAdminLogin = () => {
    if (isAdminAuthenticated) {
      setIsAdminDataViewerOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('admin_wealth_auth', 'true');
    } catch {
      // ignore
    }
    setIsAdminLoginOpen(false);
    setIsAdminDataViewerOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('admin_wealth_auth');
    } catch {
      // ignore
    }
    setIsAdminDataViewerOpen(false);
  };

  const handleScrollToForm = () => {
    const formElement = document.getElementById('membership-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToBenefits = () => {
    const benefitsElement = document.getElementById('benefits-section');
    if (benefitsElement) {
      benefitsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplicationSubmitted = (newMember: MemberApplication) => {
    setMembers((prev) => [newMember, ...prev]);
    setLatestMember(newMember);
  };

  const handleToggleLike = (id: string) => {
    setMembers((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentlyLiked = item.isLiked ?? false;
          return {
            ...item,
            isLiked: !currentlyLiked,
            likes: currentlyLiked ? item.likes - 1 : item.likes + 1
          };
        }
        return item;
      })
    );
  };

  const handleUpdateMember = (updatedMember: MemberApplication) => {
    setMembers((prev) => prev.map((m) => (m.id === updatedMember.id ? updatedMember : m)));
    if (latestMember && latestMember.id === updatedMember.id) {
      setLatestMember(updatedMember);
    }
  };

  const handleDeleteMember = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    if (latestMember && latestMember.id === memberId) {
      setLatestMember(null);
    }
  };

  const handleGoToWallFromModal = () => {
    const wallEl = document.getElementById('community-wall-section');
    if (wallEl) {
      wallEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-slate-900 flex flex-col selection:bg-amber-300 selection:text-amber-950">
      {/* Top Header with top-left Admin Data button */}
      <Header 
        onScrollToForm={handleScrollToForm} 
        onOpenAdminLogin={handleOpenAdminLogin}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onScrollToForm={handleScrollToForm}
          onScrollToBenefits={handleScrollToBenefits}
        />

        {/* Exclusive Membership Benefits */}
        <MembershipBenefitsSection
          benefits={MEMBERSHIP_BENEFITS}
          onScrollToForm={handleScrollToForm}
        />

        {/* Core Values Section */}
        <ValuesSection />

        {/* Central Feature: The Dedicated Membership Application Form */}
        <MembershipFormSection
          onApplicationSubmitted={handleApplicationSubmitted}
        />

        {/* Member Roll / Star Wall Section */}
        <FamilyWallSection
          members={members}
          onToggleLike={handleToggleLike}
          onScrollToForm={handleScrollToForm}
        />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onScrollToForm={handleScrollToForm} />

      {/* Official Digital Membership Card Modal */}
      {latestMember && (
        <SuccessModal
          member={latestMember}
          onClose={() => setLatestMember(null)}
          onGoToWall={handleGoToWallFromModal}
        />
      )}

      {/* Admin Login Modal with Password Verification 668668 */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Member Data Management Viewer Dashboard with Edit & Delete */}
      <MemberDataViewerModal
        isOpen={isAdminDataViewerOpen}
        members={members}
        onClose={() => setIsAdminDataViewerOpen(false)}
        onLogout={handleAdminLogout}
        onViewMemberCard={(m) => {
          setIsAdminDataViewerOpen(false);
          setLatestMember(m);
        }}
        onUpdateMember={handleUpdateMember}
        onDeleteMember={handleDeleteMember}
      />
    </div>
  );
}
