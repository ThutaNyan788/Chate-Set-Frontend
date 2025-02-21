import { Outlet } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import { useGlobalContext } from "./context/AppContextProvider";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const { toggleModal,setToggleModal } = useGlobalContext();

  return (
    <>
      <Outlet />
      <AnimatePresence>
        {toggleModal === "login" && <LoginForm toggleModal={toggleModal} setToggleModal={setToggleModal} />}
        {toggleModal === "register" && <RegisterForm toggleModal={toggleModal} setToggleModal={setToggleModal} />}
      </AnimatePresence>

    </>
  )
}