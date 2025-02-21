import Echo from "@/utils/echo";
import { useEffect, useState } from "react";

const Notifications = () => {

    const [message, setMessage] = useState<string>("Waiting for messages...");
    
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
        </div>
    )
}

export default Notifications