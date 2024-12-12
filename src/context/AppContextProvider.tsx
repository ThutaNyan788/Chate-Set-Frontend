// FILE: ./context/AppContextProvider.tsx
import  { createContext, useContext, ReactNode, useState } from 'react';



const AppContext = createContext<any>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toggleModal,setToggleModal] = useState(false);
  return (
    <AppContext.Provider value={{ 
      toggleModal,
      setToggleModal
     }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};