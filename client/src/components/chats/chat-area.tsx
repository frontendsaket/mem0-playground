import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { GoArrowRight } from "react-icons/go";
import Dropdown from "./dropdown";
import ChatContext from "@/context/ChatContext";
import ChatPair from "./chat-pair";
import { ChatPairInterface } from "@/types/chat-type";
import ChatDefault from "./chat-default";
import ChatInput from "./chat-input";
import ChatPairLoading from "./chat-pair-loading";
import Spinner from "../shared/spinner";

const ChatArea = (props: {
  setExpandLeft: React.Dispatch<React.SetStateAction<boolean>>;
  setExpandRight: React.Dispatch<React.SetStateAction<boolean>>;
  expandLeft: boolean;
  expandRight: boolean;
}) => {
  const { conversation, loadingChat, loadingQuestion, loadingSelectedChats } = useContext(ChatContext);

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
          { loadingSelectedChats&&
            <div className="flex justify-center"> 
              <Spinner />
            </div>
          }
          <div className="mb-4">
            {conversation.length === 0 && !loadingChat && !loadingSelectedChats && <ChatDefault name="Saket Aryan" />}
            {conversation.map((item: ChatPairInterface, index: number) => {
              return (
                <div key={index}>
                  <ChatPair item={item} />
                </div>
              );
            })}
            {
              loadingChat&&<ChatPairLoading question={loadingQuestion} />
            }
          </div>
        </div>
        <div className="p-4">
          <ChatInput />
        </div>
      </div>
    </>
  );
};

export default ChatArea;
