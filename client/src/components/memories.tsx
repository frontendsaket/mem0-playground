import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Badge } from "@/components/ui/badge";
import { IoReload } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { CiClock1 } from "react-icons/ci";

const Memories = (props: { expandLeft: boolean; expandRight: boolean }) => {
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
                Your Memories (1)
              </h3>
              <div className="flex gap-2 align-middle">
                <IoReload size={20} className="my-auto cursor-pointer" />
                <AiOutlineDelete size={20} className="my-auto cursor-pointer" />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 border-b">
                  <h4 className="font-medium my-1">Codes sometimes</h4>
                  <p className="text-sm text-gray-400 flex gap-1 align-middle my-1">
                    <CiClock1 className="text-gray-600 my-auto" /> 27/09/2024,
                    23:19:48
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Badge variant="secondary" className="bg-gray-200/80">
                      technology
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-200/80">
                      hobbies
                    </Badge>
                  </div>
                </div>
                {/* Add more memory items here */}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </>
  );
};

export default Memories;
