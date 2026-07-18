'use client';

import { useState } from 'react';
import { TabNav } from '@/components/AppShell';
import { ViewPanel } from '@/components/ViewPanel';
import { BuilderPanel } from '@/components/BuilderPanel';
import { AdminPanel } from '@/components/AdminPanel';

type Tab = 'view' | 'build' | 'admin';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('view');

  return (
    <>
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'view' && <ViewPanel />}
      {activeTab === 'build' && <BuilderPanel onTabChange={setActiveTab} />}
      {activeTab === 'admin' && <AdminPanel onTabChange={setActiveTab} />}
    </>
  );
}
