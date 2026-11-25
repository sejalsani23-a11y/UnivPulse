import React from 'react';

/**
 * TopHeader Component
 * Responsibilities:
 * - Persistent executive header bar across all viewports.
 * - On Mobile (<1024px): Provides hamburger trigger for MobileDrawer, compact logo, and Dean avatar.
 * - On Desktop (>=1024px): Provides institutional breadcrumbs, department scope, and academic session status.
 *
 * Props:
 * - activeTab (string): Currently selected portal tab.
 * - onOpenMobileDrawer (function): Handler to open the mobile drawer.
 */
export default function TopHeader({ activeTab, onOpenMobileDrawer }) {
  // Map tab IDs to human-readable titles and icons
  const tabTitles = {
    overview: { title: 'Overview & KPIs', icon: 'dashboard', subtitle: 'Executive Performance Matrix' },
    trends: { title: 'CGPA & Performance Trends', icon: 'trending_up', subtitle: 'Longitudinal Cohort Trajectory' },
    subjects: { title: 'Subject & Attendance Analytics', icon: 'auto_stories', subtitle: 'Curriculum & Correlation Matrix' },
    risk: { title: 'At-Risk Intervention Hub', icon: 'crisis_alert', subtitle: 'Early Warning & Retention Dossiers' },
  };

  const current = tabTitles[activeTab] || tabTitles.overview;

  return (
    <header className="sticky top-0 z-30 w-full bg-primary/95 text-on-primary backdrop-blur-xl border-b border-primary-container shadow-md">
      <div className="h-20 px-4 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left Section: Mobile Menu Button + Title / Scope */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Drawer Trigger (Hidden on Desktop) */}
          <button
            onClick={onOpenMobileDrawer}
            aria-label="Open Academic Navigation"
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          {/* Mobile Brand Logo (Hidden on Desktop because Sidebar has it) */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
          </div>

          {/* Current Page Context */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed hidden sm:inline-block">
                {current.icon}
              </span>
              <h1 className="font-headline-sm text-base sm:text-lg font-bold text-white truncate">
                {current.title}
              </h1>
            </div>
            <span className="font-label-xs text-primary-fixed-dim text-[11px] truncate">
              {current.subtitle}
            </span>
          </div>
        </div>

        {/* Center / Right Section: Institutional Status & Dean Profile */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Academic Term Badge (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-container text-tertiary-fixed font-label-xs text-[11px] font-semibold border border-white/5">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-pulse"></span>
            <span>AY 2024-25 • Fall Term</span>
          </div>

          {/* Department Scope Selector (Desktop Only) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-primary-fixed-dim font-label-xs text-[11px]">
            <span className="text-secondary font-bold uppercase tracking-wider">Scope:</span>
            <span className="text-white font-medium">Computer Science &amp; Eng.</span>
          </div>

          {/* Dean Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="hidden xl:flex flex-col items-end">
              <span className="font-label-xs text-white font-bold leading-none">
                Dr. Eleanor Vance
              </span>
              <span className="font-label-xs text-tertiary-fixed text-[10px] mt-0.5">
                Dean of Engineering
              </span>
            </div>
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF28YorFX9QTICF0oPFTLR2tH6zdHtXY-0gH9kkmqXGEXAGGP0EjMpX_oaeaBVvj1C3Xp6Jcn3UseS-JPrIAAaxYeZ9QO_Ja0d77U_C8RuMV6O29eFziQKYYHTzmFxUmKwW_Gw3ODkakC2mGF6sGMKutCcKkv5QKDnGQFdrkfxJeqtn-wSlD_OkYjcULq6B4WluzzKUHbnOd318HprNM8ke8traZpmDhac1TPFRhY"
                alt="Dean Eleanor Vance"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-secondary-container"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim ring-2 ring-primary"></span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
