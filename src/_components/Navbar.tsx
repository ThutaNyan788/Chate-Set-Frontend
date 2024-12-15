import { Button } from '@/components/ui/button'
import brandIcon from '../assets/chate-set.svg'
import "@theme-toggles/react/css/Classic.css"
import { Classic } from "@theme-toggles/react"
import { useGlobalContext } from '@/context/AppContextProvider'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { setToggleModal } = useGlobalContext();
  const navigate = useNavigate();

  const [isToggled, setToggle] = useState(false);

  const redirectHome = () => {
    navigate("/");
  }


  const darkModeHandle = ()=>{
    setToggle(!isToggled);
    document.body.classList.toggle('dark');
  }
  return (
    <div className='flex justify-between items-center px-2 lg:px-20 py-3 shadow dark:shadow border-b border-b-gray-00 dark:border-b dark:border-b-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-[2px]'>
      <button onClick={redirectHome} className='flex items-center space-x-3 text-xl font-semibold'>
        <img src={brandIcon} alt="brand icon" width={50} height={50} />
        <span className=''>Chate Set</span>
      </button>

      <div className='flex  items-center space-x-5'>

        <Classic toggled={isToggled} toggle={darkModeHandle} className='outline-none text-xl'/>
        <div className="">
          <Button onClick={() => setToggleModal("login")} className='bg-brandColor hover:bg-indigo-700 dark:text-white active:scale-95 transition-transform me-3'>Login</Button>
            <Button 
            onClick={()=>setToggleModal("register")} 
            className='bg-transparent hover:bg-transparent dark:hover:bg-transparent text-brandColor border-2 border-brandColor dark:text-white active:scale-95 transition-transform'
            > 
            Register
            </Button>

        </div>
      </div>
    </div>
  )
}

export default Navbar