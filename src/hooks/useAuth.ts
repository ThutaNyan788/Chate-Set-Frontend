import axios from "@/utils/axios";
import { useEffect,useState } from "react";
import { useToast } from '@/hooks/use-toast';



export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<any>(null); // null = loading state
    const {toast} = useToast();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.post('/auth/me');
                const data = await response.data.user;
                
                setIsAuthenticated(!!data); // Set true if user exists
            } catch (error) {
                setIsAuthenticated(false); // Not authenticated
                toast({
                    title: "Authentication Required",
                    description: "Please log in to access this content.",
                    variant: "destructive",
                  })
            }
        };

        checkAuth();
    }, []);

    return isAuthenticated;
};