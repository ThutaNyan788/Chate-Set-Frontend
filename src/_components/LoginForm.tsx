import { Button } from "@/components/ui/button"
import { GithubIcon } from "./icons/github-icon"
import { GoogleIcon } from "./icons/google-icon"
import { CloseIcon } from "./icons/close-icon"
import facebookIcon from "@/assets/facebook-svgrepo-com.svg"
import { useGlobalContext } from "@/context/AppContextProvider"
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { UserIcon } from "./icons/user-icon"
import { PasswordIcon } from "./icons/password-icon"
import { EyeOpenIcon } from "./icons/eye-open-icon"
import { EyeCloseIcon } from "./icons/eye-close-icon"

const LoginForm = () => {
    const { setToggleModal } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }
    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleSocialAuth = (provider: string) => {
        try {
            // TODO:: to add href link to redirect callback
            window.location.href = `http://127.0.0.1:8000/auth/${provider}/redirect`;
            
        } catch (error) {
            console.log(error);

        }
    }


    // const createUser =  (data:any)=>{
    // TODO:: to add api endpoint
    //    return  axios.post("https://api.chateset.com/v1/auth/register",data);
    // }


    const onSubmit = (userData: any) => {
        // TODO:: after added api endpoint pls uncomment this code
        // setLoading(true);
        // const {data,isLoading} = useQuery({queryKey:["create-user"],queryFn:()=>createUser(userData)});
        // setLoading(isLoading);
        //console.log(data);
    }

    return (
        // Overlay
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-gray-50 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-70'>
            {/* Container */}
            <div className="relative w-full h-full flex justify-center items-center ">
                <div>
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="relative min-w-96 bg-white dark:bg-gray-800 border dark:border-gray-600 border-gray-100 shadow-lg py-5 px-7 rounded-lg ">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className=" justify-self-end">
                                    <Button onClick={() => setToggleModal(false)} size={"sm"} className="bg-transparent shadow-none hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <CloseIcon className="text-gray-500 dark:text-white " />
                                    </Button>
                                </div>
                                <h1 className="text-2xl font-semibold mb-5 text-center dark:text-white">Welcome Back!</h1>

                                <div className="mt-10 space-y-8">
                                    <div className="mb-5">
                                        <div className="px-1 mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                                            <div className="px-3 py-2 bg-gray-100 text-gray-500 rounded">
                                                <UserIcon />
                                            </div>
                                            <input
                                                autoFocus
                                                {...register("email", { required: true })}
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="caret-black text-black flex-1 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
                                                placeholder="Username or Email"
                                            />
                                        </div>
                                        {errors.email && <span className="text-red-500 text-xs">Email field is required</span>}
                                    </div>

                                    <div className="mb-5">

                                        <div className="px-1 mt-1 flex items-center border border-gray-300 rounded-md shadow-sm">
                                            {/* Lock Icon */}
                                            <div className="px-3 py-2 bg-gray-100 text-gray-500 rounded">
                                                <PasswordIcon />
                                            </div>
                                            {/* Input Field */}
                                            <input
                                                {...register("password", { required: true })}
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className="caret-black text-black flex-1 px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md sm:text-sm"
                                                placeholder="Password"
                                            />
                                            {/* Eye Icon for Toggle */}
                                            <div
                                                className="px-3 py-2 bg-gray-100 text-gray-500 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? (
                                                    <EyeOpenIcon />
                                                ) : (
                                                    <EyeCloseIcon />
                                                )}
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <span className="text-red-500 text-xs">Password field is required</span>
                                        )}
                                    </div>
                                </div>


                                <div className="my-8">
                                    <Button type="submit" className="dark:text-white w-full flex justify-center items-center bg-brandColor hover:bg-brandColor py-5">Sign In
                                        {loading && (
                                            <div className="w-3 h-3 border-2 border-gray-500 border-solid rounded-full border-t-transparent animate-spin"></div>
                                        )}
                                    </Button>
                                </div>


                                <div className="mb-5 flex items-center justify-center space-x-4">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="text-gray-500 font-medium">Or Login With</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                            </form>
                            <div className="flex justify-center items-center space-x-5 mt-8">
                                <div className="mb-5">
                                    <Button onClick={() => handleSocialAuth("github")} className="w-full bg-gray-900 shadow-md text-white" variant={"outline"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="30px" height="30px"><path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path></svg>
                                    </Button>
                                </div>
                                <div className="mb-5">
                                    <Button onClick={() => handleSocialAuth("google")} className="w-full shadow-md dark:bg-white" variant={"outline"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                                    </Button>
                                </div>
                                <div className="mb-5">
                                    <Button onClick={() => handleSocialAuth("facebook")} className="w-full hover:bg-white bg-white shadow-md text-white" variant={"outline"}>
                                        <img src={facebookIcon} alt="facebook icon" width={15} height={15} />
                                    </Button>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm