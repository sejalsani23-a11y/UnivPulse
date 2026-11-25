import React from 'react';

/**
 * BottomNav Component
 * Responsibilities:
 * - Mobile bottom tab bar for viewports <1024px (hidden on desktop via `lg:hidden`).
 * - Glassmorphic surface with blurred backdrop.
 * - Allows quick thumb-driven switching between the 4 core analytical dashboards.
 *
 * Props:
 * - activeTab (string): Currently selected tab ID.
 * - onSelectTab (function): Tab change callback handler.
 */
export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
    { id: 'trends', label: 'Trends', icon: 'insights' },
    { id: 'subjects', label: 'Subjects', icon: 'menu_book' },
    { id: 'risk', label: 'Risk Alerts', icon: 'crisis_alert', hasWarningDot: true },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_16px_rgba(6,16,43,0.08)]">
      <div className="h-16 px-4 flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 rounded-xl transition-all relative ${
                isActive
                  ? 'text-secondary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-on-surface font-medium'
              }`}
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[22px]">
                  {tab.icon}
                </span>
                {tab.hasWarningDot && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-error ring-2 ring-surface"></span>
                )}
              </div>
              <span className="font-label-xs text-[11px] tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
