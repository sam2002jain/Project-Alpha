import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Case {
  id: string;
  name: string;
  date: string;
}

interface CaseContextType {
  selectedCase: Case | null;
  setSelectedCase: (caseData: Case) => void;
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export const useCase = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCase must be used within a CaseProvider');
  }
  return context;
};

export const CaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  return (
    <CaseContext.Provider value={{ selectedCase, setSelectedCase }}>
      {children}
    </CaseContext.Provider>
  );
};