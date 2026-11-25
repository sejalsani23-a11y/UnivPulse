import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import Trends from './pages/Trends';
import SubjectAnalytics from './pages/SubjectAnalytics';
import AtRiskHub from './pages/AtRiskHub';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'trends':
        return <Trends />;
      case 'subjects':
        return <SubjectAnalytics />;
      case 'risk':
        return <AtRiskHub />;
      default:
        return <Overview />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {renderActivePage()}
    </AppLayout>
  );
}
