import { Button } from '@/components/ui/button'
import brandIcon from '@/assets/chate-set.svg'
import "@theme-toggles/react/css/Classic.css"
import { Classic } from "@theme-toggles/react"
import { useGlobalContext } from '@/context/AppContextProvider'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '@/hooks/useLocalStorage'
import { useEffect, useState } from 'react'


const TopNavbar = () => {
  const { setToggleModal } = useGlobalContext();
  const navigate = useNavigate();

  // darkMode 
  const [isDarkMode, setIsDarkMode] = useLocalStorage('darkMode', false);

  const redirectHome = () => {
    navigate("/");
  }

  const darkModeHandle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  }

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  //for current use only 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  return (
    <div className={`${isLoggedIn ? 'px-8' : 'lg:px-20'} flex justify-between items-center px-2 py-3 shadow dark:shadow border-b border-b-gray-00 dark:border-b dark:border-b-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-[2px]`}>
      {!isLoggedIn &&
        <button onClick={redirectHome} className='flex items-center space-x-3 text-xl font-semibold'>
          <img src={brandIcon} alt="brand icon" width={50} height={50} />
          <span className=''>Chate Set</span>
        </button>
      }
      <div className='flex  items-center space-x-5'>

        <Classic toggled={isDarkMode} toggle={darkModeHandle} className='outline-none text-xl' placeholder={undefined} />
        {!isLoggedIn &&
          <div>
            <Button onClick={() => setToggleModal("login")} className='bg-brandColor hover:bg-indigo-700 dark:text-white active:scale-95 transition-transform me-3'>
              Login
            </Button>
            <Button
              onClick={() => setToggleModal("register")}
              className='bg-transparent hover:bg-transparent dark:hover:bg-transparent text-brandColor border-2 border-brandColor dark:text-white active:scale-95 transition-transform'
            >
              Register
            </Button>

          </div>
        }
      </div>
    </div>
  )
}

export default TopNavbar