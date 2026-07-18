'use client';

import { useState } from 'react';
import { TabNav } from '@/components/AppShell';
import { ViewPanel } from '@/components/ViewPanel';
import { MyTaskPanel } from '@/components/MyTaskPanel';
import { BuilderPanel } from '@/components/BuilderPanel';
import { AdminPanel } from '@/components/AdminPanel';

type Tab = 'view' | 'mytask' | 'build' | 'admin';

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>('view');

  return (
    <>
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'view' && <ViewPanel />}
      {activeTab === 'mytask' && <MyTaskPanel />}
      {activeTab === 'build' && <BuilderPanel onTabChange={setActiveTab} />}
      {activeTab === 'admin' && <AdminPanel onTabChange={setActiveTab} />}
    </>
  );
}
