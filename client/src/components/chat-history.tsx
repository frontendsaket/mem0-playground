import { FaRegEdit } from "react-icons/fa";

const ChatHistory = (props: {expandLeft: boolean}) => {
  return (
    <>
        <div className={`bg-gray-50/50 flex flex-col h-full justify-between py-4 transition-all duration-300 ${props.expandLeft ? 'w-16' : 'w-64'}`}>
        {!props.expandLeft && (
          <>
          <div>
            <h3 className="text-md font-semibold mb-4 text-gray-400 ml-4">Today</h3>
              <div className="mb-2 rounded-md bg-gray-200/40 px-4 py-2 cursor-pointer">
                <h1 className="font-medium">What do you remember about me?</h1>
                <p className="text-[14px] text-gray-500">Sep 27, 2024, 11:21:49 PM</p>
              </div>
              </div>
              <div className="px-2">
                <div className="border border-gray-300 rounded-lg  px-3 py-2 cursor-pointer hover:bg-gray-100">
                  <div className="flex justify-center align-middle gap-4">
                    <FaRegEdit size={20} className="my-auto" />
                    <h1 className="font-medium">New Chat</h1>
                  </div>
                </div>
              </div>
          </>
        )}
      </div>
    </>
  )
}

export default ChatHistory