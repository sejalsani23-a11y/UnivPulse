import { riskData } from '../../data/riskData';
import React from 'react';
const highRiskCount = riskData.filter(
  student => student.risk === 'High'
).length;
/**
 * DesktopSidebar Component
 * Responsibilities:
 * - Persistent 260px navigation bar for desktop screens (>=1024px / lg breakpoint).
 * - Displays UnivPulse branding, Dean profile, and active navigation indicators.
 * - Highlights the currently active tab using the UnivPulse Sapphire Blue brand color.
 *
 * Props:
 * - activeTab (string): Identifies which tab is currently selected.
 * - onSelectTab (function): Callback function to switch the active tab.
 */
export default function DesktopSidebar({ activeTab, onSelectTab }) {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview & KPIs',
      icon: 'dashboard',
      badge: null,
    },
    {
      id: 'trends',
      label: 'CGPA & Performance',
      icon: 'trending_up',
      badge: null,
    },
    {
      id: 'subjects',
      label: 'Subject Analytics',
      icon: 'auto_stories',
      badge: null,
    },
    {
      id: 'risk',
      label: 'At-Risk Hub',
      icon: 'crisis_alert',
      badge: `${highRiskCount} Alerts`,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-primary text-on-primary min-h-screen shrink-0 border-r border-primary-container shadow-xl select-none">
      {/* Brand Header */}
      <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shadow-md">
            <span className="material-symbols-outlined text-[24px]">account_balance</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline-sm text-headline-sm font-extrabold text-white tracking-tight">
                UnivPulse
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-secondary text-white font-label-xs text-[10px] uppercase font-bold tracking-wider">
                Dean
              </span>
            </div>
            <span className="font-label-xs text-primary-fixed-dim text-[11px] truncate">
              St. Jude Inst. of Tech
            </span>
          </div>
        </div>
      </div>

      {/* Dean Profile Strip */}
      <div className="p-4 mx-3 my-4 rounded-xl bg-primary-container/80 border border-white/5 flex items-center gap-3">
        <div className="relative shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF28YorFX9QTICF0oPFTLR2tH6zdHtXY-0gH9kkmqXGEXAGGP0EjMpX_oaeaBVvj1C3Xp6Jcn3UseS-JPrIAAaxYeZ9QO_Ja0d77U_C8RuMV6O29eFziQKYYHTzmFxUmKwW_Gw3ODkakC2mGF6sGMKutCcKkv5QKDnGQFdrkfxJeqtn-wSlD_OkYjcULq6B4WluzzKUHbnOd318HprNM8ke8traZpmDhac1TPFRhY"
            alt="Dean Eleanor Vance"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-secondary-container"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim ring-2 ring-primary"></span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-white font-bold truncate">
            Eleanor Vance, Ph.D.
          </span>
          <span className="font-label-xs text-tertiary-fixed truncate">
            Dean of Academic Affairs
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="px-3 flex-1 flex flex-col gap-1.5">
        <div className="px-3 py-1 font-label-xs text-primary-fixed-dim uppercase tracking-wider font-bold text-[10px]">
          Academic Portals
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-body-sm text-sm transition-all text-left ${
                isActive
                  ? 'bg-secondary text-white font-bold shadow-md shadow-secondary/30 scale-[1.02]'
                  : 'text-primary-fixed-dim hover:bg-white/5 hover:text-white font-medium'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors ${
                    isActive ? 'text-white' : 'text-primary-fixed-dim group-hover:text-white'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full font-label-xs text-[10px] font-extrabold shrink-0 ${
                    isActive
                      ? 'bg-white text-secondary'
                      : 'bg-error-container text-on-error-container'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-4 m-3 mt-auto rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
        <div className="flex items-center justify-between text-label-xs">
          <span className="text-primary-fixed-dim font-medium">Cohort Census</span>
          <span className="text-tertiary-fixed font-bold tnum">4,280 Active</span>
        </div>
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div className="bg-tertiary-fixed-dim h-full rounded-full" style={{ width: '91.8%' }}></div>
        </div>
        <span className="text-[10px] text-primary-fixed-dim opacity-70">
          Fall Term 2024 • St. Jude SIS v2.4 • St. Jude SIS v2.4
        </span>
      </div>
    </aside>
  );
}
