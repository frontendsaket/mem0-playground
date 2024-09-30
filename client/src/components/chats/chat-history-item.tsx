import { ChatItemInterface } from "@/types/chat-type";
import { convertTimestampToCustomFormat } from "@/utils/helpers";

const ChatHistoryItem = (props: {item: ChatItemInterface}) => {
  return (
    <div className="mb-2 rounded-md px-4 py-2 cursor-pointer">
      <h1 className="font-medium text-[14px]">{props.item.title}</h1>
      <p className="text-[14px] text-gray-500">{convertTimestampToCustomFormat(props.item.created_at)}</p>
    </div>
  );
};

export default ChatHistoryItem;
