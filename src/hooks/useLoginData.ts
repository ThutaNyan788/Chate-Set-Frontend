import { useMutation } from "@tanstack/react-query"
import axios from "@/utils/axios";
import { FormInput } from "lucide-react";

type FormInput = {
    user: string,
    password: string,
}

const userLogin = (formData: FormInput) => {
    return axios.post("/login", formData);
}


export const useLoginData = () => {

    return useMutation({
        mutationFn: (formData: FormInput) => userLogin(formData),
        onSuccess: ({data}) => {
            console.log("Login successful:", data);

            // Optionally store token in localStorage or state management
            if (data?.data?.token) {
                localStorage.setItem("token", data.data.token);
            }
        },
        onError: (error: any) => {
            console.error("Login failed:", error);

            throw error;
        },
    })
}