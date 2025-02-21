import { useEffect, useState } from "react";
import echo from "@/utils/echo";

const PrivatePresenceTest = ({ userId }: { userId: number }) => {
  const [privateMessage, setPrivateMessage] = useState<string>("Waiting for private messages...");
  const [presenceMessage, setPresenceMessage] = useState<string>("Waiting for presence messages...");
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    // Private Channel Listener
    const privateChannel = echo.private(`private-chat.42`);
    privateChannel.listen(".PrivateMessageEvent", (data: { message: string }) => {
      console.log("🔒 Private event received:", data);
      setPrivateMessage(data.message);
    });

    // Presence Channel Listener
    const presenceChannel = echo.join("presence-chatroom")
      .here((users: any[]) => {
        console.log("👥 Users currently in the presence channel:", users);
        setMembers(users.map((user) => user.name));
      })
      .joining((user: any) => {
        console.log("➕ User joined:", user);
        setMembers((prev) => [...prev, user.name]);
      })
      .leaving((user: any) => {
        console.log("❌ User left:", user);
        setMembers((prev) => prev.filter((name) => name !== user.name));
      })
      .listen(".PresenceMessageEvent", (data: { message: string }) => {
        console.log("📢 Presence event received:", data);
        setPresenceMessage(data.message);
      });

    return () => {
      privateChannel.stopListening(".PrivateMessageEvent");
      presenceChannel.stopListening(".PresenceMessageEvent");
    };
  }, [userId]);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">🔒 Private Chat</h2>
      <p>{privateMessage}</p>

      <h2 className="text-xl font-bold mt-4">👥 Presence Chatroom</h2>
      <p>{presenceMessage}</p>

      <h3 className="text-lg font-semibold mt-2">Active Members:</h3>
      <ul className="list-disc ml-6">
        {members.length > 0 ? members.map((name, idx) => (
          <li key={idx}>{name}</li>
        )) : <li>No members online</li>}
      </ul>
    </div>
  );
};

export default PrivatePresenceTest;
