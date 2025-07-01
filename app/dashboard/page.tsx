import React, { Suspense } from 'react';
import DashboardClient from './DashboardClient';
export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  );
}
