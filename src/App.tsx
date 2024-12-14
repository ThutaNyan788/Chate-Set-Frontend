import { Outlet } from "react-router-dom";
import Navbar from "./_components/Navbar";
import LoginForm from "./_components/LoginForm";
import { useGlobalContext } from "./context/AppContextProvider";
import RegisterForm from "./_components/RegisterForm";


export default function App() {
  const {toggleModal} = useGlobalContext();
  return (
    <>
      <Navbar />
      <Outlet />
      {toggleModal === "login" && <LoginForm/>}
      {toggleModal === "register" && <RegisterForm/>}

    </>
  )
}