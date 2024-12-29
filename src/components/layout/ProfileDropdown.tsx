
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import axios from '@/utils/axios'
import { useNavigate } from 'react-router-dom'

const ProfileDropdown = () => {

    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => setIsOpen(!isOpen);
    const navigate = useNavigate();

    const Logout = async () => {
        let response = await axios.post("/logout", null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate("/");
        }
    }

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -20,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        }
    }

    const staggerMenuItems = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const menuItemVariants = {
        hidden: { opacity: 0, x: -20 },
        show: { opacity: 1, x: 0 }
    }

    return (
        <div>
            <div >
                <div onClick={toggleDropdown} className="flex items-center gap-2">
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}

                    >

                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <ChevronDown className="h-5 w-5 cursor-pointer" />
                        </motion.div>

                    </motion.div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg px-1 py-1 bg-background ring-1 ring-black ring-opacity-5"
                    >
                        <motion.ul
                            variants={staggerMenuItems}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.li variants={menuItemVariants}>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Profile clicked')}>
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Button>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <Button variant="ghost" className="w-full justify-start" onClick={() => console.log('Settings clicked')}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Settings
                                </Button>
                            </motion.li>
                            <motion.li variants={menuItemVariants}>
                                <Button onClick={Logout} variant="ghost" className="w-full justify-start hover:text-red-600 dark:hover:text-red-600">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence></div>
    )
}

export default ProfileDropdown