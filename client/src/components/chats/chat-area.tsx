import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useContext, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { LuSendHorizonal } from "react-icons/lu";
import Dropdown from "./dropdown";
import ChatContext from "@/context/ChatContext";
import ChatPair from "./chat-pair";
import { ChatPairInterface } from "@/types/chat-type";
import ChatDefault from "./chat-default";

const ChatArea = (props: {
  setExpandLeft: React.Dispatch<React.SetStateAction<boolean>>;
  setExpandRight: React.Dispatch<React.SetStateAction<boolean>>;
  expandLeft: boolean;
  expandRight: boolean;
}) => {
  const [message, setMessage] = useState("");
  const { conversation } = useContext(ChatContext);

  return (
    <>
      <div className="flex-1 h-full flex flex-col relative border-r-2 border-l-2 border-gray-200">
        <Button
          size="icon"
          variant="ghost"
          className="absolute hidden md:flex bg-gray-50 border border-gray-300 hover:bg-gray-100 rounded-lg -left-5 top-1/2 z-10"
          onClick={() => props.setExpandLeft(!props.expandLeft)}
        >
          {props.expandLeft ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="absolute hidden md:flex bg-gray-50 border border-gray-300 hover:bg-gray-100 rounded-lg -right-5 top-1/2 z-10"
          onClick={() => props.setExpandRight(!props.expandRight)}
        >
          {props.expandRight ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex flex-col md:flex-row justify-end gap-2 md:gap-6 mb-4">
            <div className="flex">
              <input
                className="border px-2 py-1 w-full border-gray-300 rounded-md pr-8 focus:outline-none"
                placeholder="User Id"
              />
              <GoArrowRight size={20} className="-ml-8 my-auto text-gray-400" />
            </div>

            <div className="flex my-auto w-full md:w-auto">
              <Dropdown />
            </div>

            
          </div>
          <div className="mb-4">
            {
              conversation.length===0&&<ChatDefault name="Saket Aryan" />
            }
            {
              conversation.map((item: ChatPairInterface, index: number)=>{
                return <div key={index}>
                  <ChatPair item={item} />
                </div>
              })
            }
          </div>
        </div>
        <div className="p-4">
          <div className="flex bg-gray-100 pr-4 rounded-[6rem]">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 mr-2 py-6 bg-white border border-gray-200 rounded-[6rem]"
            />
            <LuSendHorizonal className="my-auto" size={20} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatArea;
