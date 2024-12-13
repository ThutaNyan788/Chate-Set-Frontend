import { Button } from '@/components/ui/button'
import brandIcon from '../assets/chate-set.svg'
import "@theme-toggles/react/css/Classic.css"
import { Classic } from "@theme-toggles/react"
import { useGlobalContext } from '@/context/AppContextProvider'
import { useState } from 'react'

const Navbar = () => {
  const {setToggleModal} = useGlobalContext();
  const [isToggled, setToggle] = useState(false);


  const darkModeHandle = ()=>{
    setToggle(!isToggled);
    document.body.classList.toggle('dark');
  }
  return (
    <div className='flex justify-between items-center lg:px-20 py-3 shadow dark:shadow border-b border-b-gray-00 dark:border-b dark:border-b-gray-700 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-[2px]'>
      <div className='flex items-center space-x-3 text-xl font-semibold'>
        <img src={brandIcon} alt="brand icon" width={50} height={50} />
        <span className=''>Chate Set</span>
      </div>

      <div className='flex  items-center space-x-5'>

        <Classic toggled={isToggled} toggle={darkModeHandle} className='outline-none text-xl'/>
        <div className="">
          <Button onClick={()=>setToggleModal(true)} className='bg-brandColor hover:bg-brandColor dark:text-white me-3'>Login</Button>
          <Button onClick={()=>setToggleModal(true)} className='bg-transparent text-brandColor border-2 hover:bg-transparent dark:hover:bg-transparent border-brandColor dark:text-white'>Register</Button>

        </div>
      </div>
    </div>
  )
}

export default Navbar