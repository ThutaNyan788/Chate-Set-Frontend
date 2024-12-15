import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import { useGlobalContext } from "./context/AppContextProvider";
import { AnimatePresence } from "framer-motion";


export default function App() {
  const { toggleModal,setToggleModal } = useGlobalContext();

  return (
    <>
      <Navbar />
      <Outlet />
      <AnimatePresence>
        {toggleModal === "login" && <LoginForm toggleModal={toggleModal} setToggleModal={setToggleModal} />}
        {toggleModal === "register" && <RegisterForm toggleModal={toggleModal} setToggleModal={setToggleModal} />}
      </AnimatePresence>

    </>
  )
}