import React, { useState } from 'react';
import DesktopSidebar from './DesktopSidebar';
import TopHeader from './TopHeader';
import BottomNav from './BottomNav';
import MobileDrawer from './MobileDrawer';

/**
 * AppLayout Component
 * Responsibilities:
 * - Master layout container uniting DesktopSidebar, TopHeader, BottomNav, and MobileDrawer.
 * - Coordinates mobile drawer open/close state.
 * - Centers and constraints content width to max 1440px on large monitors (as specified in DESIGN.md).
 * - Leaves room for mobile bottom nav on viewports <1024px (`pb-24 lg:pb-8`).
 *
 * Props:
 * - activeTab (string): The currently active portal tab.
 * - onSelectTab (function): Tab change handler.
 * - children (ReactNode): The active page content to display.
 */
export default function AppLayout({ activeTab, onSelectTab, children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex">
      {/* 1. Desktop Persistent Sidebar (>=1024px) */}
      <DesktopSidebar activeTab={activeTab} onSelectTab={onSelectTab} />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Executive Header */}
        <TopHeader
          activeTab={activeTab}
          onOpenMobileDrawer={() => setIsDrawerOpen(true)}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* 3. Mobile Navigation Elements (<1024px) */}
      <BottomNav activeTab={activeTab} onSelectTab={onSelectTab} />
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={onSelectTab}
      />
    </div>
  );
}
