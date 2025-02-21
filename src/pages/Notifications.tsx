import Echo from "@/utils/echo";
import { useEffect, useState } from "react";
import PrivatePresenceTest from "./PrivatePresenceTest";
import { useGlobalContext } from "@/context/AppContextProvider";

const Notifications = () => {

    const [message, setMessage] = useState<string>("Waiting for messages...");
    const { user } = useGlobalContext();
    
    useEffect(() => {
        const channel = Echo.channel("test-channel");

        channel.listen(".TestMessageEvent", (data: { message: string }) => {
            console.log("Received event:", data);
            setMessage(data.message);
        });

        return () => {
            channel.stopListening(".TestMessageEvent");
        };
    }, []);



    return (
        <div className="container mx-auto">
                <h2>WebSocket Test</h2>
            <p>Message: {message}</p>
            {user.id}
                <PrivatePresenceTest userId={user?.id}/>
        </div>
    )
}

export default Notifications