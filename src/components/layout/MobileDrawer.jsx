import React from 'react';
import { riskData } from '../../data/riskData';
const highRiskCount = riskData.filter(
  student => student.risk === 'High'
).length;
/**
 * MobileDrawer Component
 * Responsibilities:
 * - Slide-out navigation drawer for mobile/tablet viewports (<1024px).
 * - Animated sliding overlay with a blurred backdrop.
 * - Closes when clicking outside (on the backdrop), the close button, or after selecting a tab.
 *
 * Props:
 * - isOpen (boolean): Whether drawer is currently open.
 * - onClose (function): Handler to close drawer.
 * - activeTab (string): Currently selected tab ID.
 * - onSelectTab (function): Handler to change active tab.
 */
export default function MobileDrawer({ isOpen, onClose, activeTab, onSelectTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview & KPIs', icon: 'dashboard' },
    { id: 'trends', label: 'CGPA & Performance', icon: 'trending_up' },
    { id: 'subjects', label: 'Subject Analytics', icon: 'auto_stories' },
    { id: 'risk', label: 'At-Risk Intervention Hub', icon: 'crisis_alert', badge: `${highRiskCount} Alerts` },
  ];

  const handleSelect = (id) => {
    onSelectTab(id);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-primary text-on-primary shadow-2xl transform transition-transform duration-300 ease-out flex flex-col justify-between lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          {/* Header & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <span className="font-headline-sm text-lg font-extrabold text-white">UnivPulse</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close Navigation"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-primary-fixed-dim hover:bg-white/10"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
          </div>

          {/* Dean Profile */}
          <div className="py-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-container">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF28YorFX9QTICF0oPFTLR2tH6zdHtXY-0gH9kkmqXGEXAGGP0EjMpX_oaeaBVvj1C3Xp6Jcn3UseS-JPrIAAaxYeZ9QO_Ja0d77U_C8RuMV6O29eFziQKYYHTzmFxUmKwW_Gw3ODkakC2mGF6sGMKutCcKkv5QKDnGQFdrkfxJeqtn-wSlD_OkYjcULq6B4WluzzKUHbnOd318HprNM8ke8traZpmDhac1TPFRhY"
                alt="Dean Eleanor Vance"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-white font-bold truncate">
                  Dr. Eleanor Vance
                </span>
                <span className="font-label-xs text-tertiary-fixed text-[11px]">
                  Dean of Academic Affairs
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5 mt-2">
            <span className="font-label-xs text-primary-fixed-dim uppercase tracking-wider font-bold text-[10px] px-2 py-1">
              Portals
            </span>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm transition-all ${
                    isActive
                      ? 'bg-secondary text-white font-bold'
                      : 'text-primary-fixed-dim hover:bg-white/5 hover:text-white font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px]">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-xs text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer Info */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between text-label-xs">
              <span className="text-primary-fixed-dim">Cohort Census</span>
              <span className="text-tertiary-fixed font-bold tnum">4,820 Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
