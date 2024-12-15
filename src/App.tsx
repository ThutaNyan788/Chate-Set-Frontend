import { Outlet } from "react-router-dom";
import Navbar from "./_components/Navbar";
import LoginForm from "./_components/LoginForm";
import RegisterForm from "./_components/RegisterForm";
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