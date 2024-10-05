/* (pages)/decisionFlow/page.tsx */

"use client";

import { CandidateProvider } from '@/context/CandidateContext';
import { ElectionProvider } from '@/context/ElectionContext';
import { LocationProvider } from '@/context/LocationContext';
import { UIProvider } from '@/context/UIContext';
import MasterPage from './MasterPage';

export default function Entry() {
  return (
    <div>
      <CandidateProvider>
        <ElectionProvider>
          <LocationProvider>
            <UIProvider>
              <MasterPage />
            </UIProvider>
          </LocationProvider>
        </ElectionProvider>
      </CandidateProvider>
    </div>
  );
}