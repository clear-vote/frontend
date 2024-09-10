"use client";

import MasterPage from './MasterPage';
import { DecisionFlowProvider } from '@/context/DecisionFlowContext';

export default function Entry() {
  return (
    <div>
      <DecisionFlowProvider>
        <MasterPage />
      </DecisionFlowProvider>
    </div>
  );
}