// FILE: ./context/AppContextProvider.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import axios from "@/utils/axios"


const AppContext = createContext<any>(undefined);

const getCurrentUser = async () => {
  try {
    const user = await axios.post(`/auth/me`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    return user;

  } catch (error:any) {
    throw new Error(error);
  }
}



export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toggleModal, setToggleModal] = useState("");
  const token = localStorage.getItem('token');
  let [user,setUser] = useState<any>({});

  useEffect(() => {
    getCurrentUser()
    .then((res:any)=>{
      setUser(res.data.user);
      
    })
    .catch((err:any)=>{
      setUser({});      
    });
  }, [token]);

  return (
    <AppContext.Provider value={{
      toggleModal,
      setToggleModal,
      user
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
