import { ScrollArea } from "@radix-ui/react-scroll-area";
import { IoReload } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import MemoryItem from "./memory-item";
import { useContext, useEffect } from "react";
import MemoryContext from "@/context/MemoryContext";
import { MemoryItemInterface } from "@/types/memory-types";
import Spinner from "../shared/spinner";

const Memories = (props: { expandLeft: boolean; expandRight: boolean }) => {
  const {  getMemories, memories, loadingMemories } = useContext(MemoryContext);

  useEffect(()=>{
    getMemories("saket");
  },[])


  return (
    <>
      <div
        className={`bg-gray-50/40 p-4 transition-all duration-300 ${
          props.expandRight ? "w-16" : "w-64"
        }`}
      >
        {!props.expandRight && (
          <>
            <div className="flex justify-between my-2">
              <h3 className="text-lg font-semibold my-auto">
                Your Memories ({memories.length})
              </h3>
              <div className="flex gap-2 align-middle">
                <IoReload onClick={()=>getMemories("saket")} size={20} className="my-auto cursor-pointer" />
                <AiOutlineDelete size={20} className="my-auto cursor-pointer" />
              </div>
            </div>
            {
              loadingMemories&&<div className="flex justify-center">
                <Spinner />
              </div>
            }
            <ScrollArea className="h-[calc(100vh-8rem)] overflow-scroll">
              <div className="space-y-4">
                {
                  memories.map((item: MemoryItemInterface, index: string)=>{
                    return <div key={index}>
                    <MemoryItem item={item} />
                    </div>
                  })
                }
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </>
  );
};

export default Memories;
