/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChatQueryInterface } from "@/types/chat-type";
import { createContext, useState } from "react";
const ChatContext = createContext<any>({});
const url = import.meta.env.VITE_URL;

const ChatState = (props: any) => {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingQuestion, setLoadingQuestion] = useState("");

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

  const sendChat = async (item: ChatQueryInterface ) => {
    try {
      setLoadingChat(true);
      setLoadingQuestion(item.query);
      const requestBody: Partial<ChatQueryInterface> = {};
      if (item.query) requestBody.query = item.query;
      if (item.model) requestBody.model = item.model;
      if (item.provider) requestBody.provider = item.provider;
      if (item.user_id) requestBody.user_id = item.user_id;
      if (item.session_id) requestBody.session_id = item.session_id;
  
      const response = await fetch(`${url}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();

      if (data.success) {
        setConversation(data.conversations);
        setSelectedConversation(data.session_id);
        setLoadingChat(false);
        if(data.newItem){
          await getChats();
        }
        return data.memoryUpdate;
      } else {
        setLoadingChat(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const newChat = ()=>{
    setConversation([]);
    setSelectedConversation("");
  }


  return (
    <ChatContext.Provider
      value={{
        getChats,
        getChat,
        sendChat,
        conversations,
        conversation,
        selectedConversation,
        setSelectedConversation,
        newChat,
        loadingChat,
        loadingQuestion
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
export { ChatState };
