"use client";

import MasterPage from './MasterPage';
import { DecisionFlowProvider } from '@/context/DecisionFlowContext';

export default function Entry() {
  return (
    <>
      <DecisionFlowProvider>
        <MasterPage />
      </DecisionFlowProvider>
    </>
  );
}