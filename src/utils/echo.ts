
import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Ensure TypeScript recognizes Pusher globally
declare global {
  interface Window {
    Pusher: typeof Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "reverb",
  key: import.meta.env.VITE_REVERB_APP_KEY as string, // Explicitly cast environment variable
  authorizer: (channel, options) => {
    return {
      authorize: (socketId: string, callback: (error: boolean, data: any) => void) => {
        axios
          .post("http://127.0.0.1:8000/api/broadcasting/auth", {
            socket_id: socketId,
            channel_name: channel.name,
          },{
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
  wsHost: import.meta.env.VITE_REVERB_HOST as string,
  wsPort: (import.meta.env.VITE_REVERB_PORT as unknown as number) ?? 80,
  wssPort: (import.meta.env.VITE_REVERB_PORT as unknown as number) ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
  enabledTransports: ["ws", "wss"],
});

export default window.Echo;
