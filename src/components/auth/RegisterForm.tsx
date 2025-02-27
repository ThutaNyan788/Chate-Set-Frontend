
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
// import exp from "constants";
import { motion } from "framer-motion";

interface RegisterFormProps {
    toggleModal: string | null;
    setToggleModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const RegisterForm = ({ setToggleModal }: RegisterFormProps) => {

    const handleSocialAuth = (provider: string) => {
        try {
            // TODO:: to add href link to redirect callback
            window.location.href = `http://127.0.0.1:8000/auth/${provider}/redirect`;

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <motion.div
            className="fixed inset-0  p-3 md:p-0 bg-gray-50/75 dark:bg-gray-900/75 backdrop-blur-sm z-50 flex items-center justify-center"
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
                <Card className="w-full max-w-md dark:bg-gray-800">
                    <div className="flex justify-end p-5 pb-0">
                        <Button
                            onClick={() => setToggleModal("")}
                            variant="ghost"
                            size="icon"
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <Icons.close className="h-4 w-4" />
                        </Button>
                    </div>
                    <CardHeader className="text-center pt-0">
                        <div className="flex items-center justify-center">
                            <CardTitle className="text-2xl font-semibold">Create an Account</CardTitle>
                        </div>
                        <CardDescription className="text-center">Choose your preferred method to register</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Button
                            onClick={() => handleSocialAuth("github")}
                            variant="outline"
                            className="w-full flex items-center justify-center space-x-2 py-5 text-white hover:text-white
                        bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Icons.gitHub className="h-5 w-5" />
                            <span>Continue with GitHub</span>
                        </Button>
                        <Button
                            onClick={() => handleSocialAuth("google")}
                            variant="outline"
                            className="w-full flex items-center justify-center space-x-2 py-5 text-white hover:text-white
                        bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Icons.google className="h-5 w-5" />
                            <span>Continue with Google</span>
                        </Button>
                        <Button
                            onClick={() => handleSocialAuth("facebook")}
                            variant="outline"
                            className="w-full flex items-center justify-center space-x-2 py-5 text-white hover:text-white
                        bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Icons.facebook className="h-5 w-5" />
                            <span>Continue with Facebook</span>
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="max-w-[250px] text-xs text-gray-500 dark:text-gray-400 text-center">
                            By registering, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    )
}

export default RegisterForm

