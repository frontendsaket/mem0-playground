/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
const ChatContext = createContext<any>({});
const url = import.meta.env.VITE_URL;

const ChatState = (props: any) => {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState("");

  const getChats = async () => {
    try {
      const response = await fetch(`${url}/api/chats`);
      const data = await response.json();

      if (data.success) {
        setConversations(data.conversations);
        return true;
      } else {
        setConversations([]);
        return false;
      }
    } catch (error) {
      console.log(error);
      setConversations([]);
      return false;
    }
  };

  const getChat = async (session_id: string) => {
    try {
      const response = await fetch(`${url}/api/chat?session_id=${session_id}`);
      const data = await response.json();

      if (data.success) {
        console.log(data);
        setConversation(data.conversation);
        setSelectedConversation(session_id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const updateMemory = async (memoryid: string, text: string) => {
    try {
      const response = await fetch(`${url}/api/memory`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memoryid: memoryid,
          text: text,
        }),
      });
      const data = await response.json();

      if (data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };



  return (
    <ChatContext.Provider
      value={{
        getChats,
        getChat,
        updateMemory,
        conversations,
        conversation,
        selectedConversation,
        setSelectedConversation,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
export { ChatState };
