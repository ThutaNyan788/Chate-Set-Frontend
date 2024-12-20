import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/ui/icons"
import { motion } from "framer-motion";
import axios from "@/utils/axios";
import { useNavigate } from "react-router-dom"
import useLocalStorage from '@/hooks/useLocalStorage';
import { useGlobalContext } from "@/context/AppContextProvider"


interface LoginFormProps {
    toggleModal: string | null;
    setToggleModal: React.Dispatch<React.SetStateAction<string | null>>;
}

type formValues = {
    user: string,
    password: string,
}

const LoginForm: React.FC<LoginFormProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [value,setValue] = useLocalStorage<string>('token', "");
    const {toggleModal,setToggleModal} = useGlobalContext();
    const navigate = useNavigate();

    const { register, setFocus, handleSubmit, formState: { errors } } = useForm<formValues>({
        mode: "onBlur"
    });

    // Focus the input when the modal is shown
    useEffect(() => {
        if (toggleModal === "login") {
            setFocus("user");
        }
    }, [toggleModal, setFocus]); // The effect will run when toggleModal changes


    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    }


    const handleSocialAuth = (provider: string) => {
        try {
            // TODO:: to add href link to redirect callback
            window.location.href = `http://127.0.0.1:8000/auth/${provider}/redirect`;

        } catch (error) {
            console.log(error);
        }
    }


    const mutation = useMutation({
        mutationFn: (userData: formValues) => {
            return axios.post('/login', userData);
        },
        onSuccess: (data) => {
            
            let {status} = data?.data;

            if(status == 200)
            {
                let token = data?.data?.data.token;
                
                setValue(token);
                setToggleModal("");
                navigate("/posts");
            }else{
                navigate("/");
            }
            
        },
        onError: (error: any) => {
            setIsLoading(false);
            
            if (error.response) {
                let data = error.response.data;
                // General error message
                setGeneralError(data.message);
            } else {
                setGeneralError("An unexpected error occurred. Please try again.");
            }
        }
    });


    const onSubmit = (loginData: formValues) => {
        setIsLoading(true);
        setGeneralError(null); // Clear any previous general errors
        mutation.mutate(loginData);
    };

    return (
        // Overlay

        <motion.div
            className="fixed inset-0 p-3 md:p-0 bg-gray-50/75 dark:bg-gray-900/75 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.3,
                }}
                className="w-full max-w-md ">
                <div className="p-8 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg">
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setToggleModal("")}
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 dark:hover:bg-gray-700 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <Icons.close className="h-4 w-4" />
                        </Button>
                    </div>

                    <h1 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Welcome Back!</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <div className="relative">
                                <Icons.user className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <Input
                                    {...register("user", { required: true })}
                                    type="text"
                                    id="user"
                                    placeholder="Username or Email"
                                    className="pl-10"
                                />
                            </div>
                            {errors.user && <span className="text-red-500 text-xs mt-1">This field is required</span>}
                            {generalError && (
                                <div className="text-red-500 text-xs mt-1">
                                    {generalError}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <Icons.lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <Input
                                    {...register("password", { required: true })}
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Password"
                                    className="pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                                >
                                    {showPassword ? <Icons.eyeOff className="h-4 w-4" /> : <Icons.eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <span className="text-red-500 text-xs mt-1">Password field is required</span>}
                        </div>

                        <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700" disabled={isLoading}>
                            {mutation.isPending ? (
                                <>
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>


                    <div className="mt-6 flex items-center justify-center space-x-4">
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Or Login With</span>
                        <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                    </div>

                    <div className="mt-6 flex justify-center space-x-4">
                        <Button disabled={mutation.isPending} onClick={() => handleSocialAuth("github")} variant="outline" className="w-10 h-10 p-0">
                            <Icons.gitHub className="h-5 w-5" />
                        </Button>
                        <Button disabled={mutation.isPending} onClick={() => handleSocialAuth("google")} variant="outline" className="w-10 h-10 p-0">
                            <Icons.google className="h-5 w-5" />
                        </Button>
                        <Button disabled={mutation.isPending} onClick={() => handleSocialAuth("facebook")} variant="outline" className="w-10 h-10 p-0">
                            <Icons.facebook className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </motion.div>
        </motion.div>

    )
}

export default LoginForm