import { Badge } from "@/components/ui/badge";
import { MemoryItemInterface } from "@/types/memory-types";
import { CiClock1 } from "react-icons/ci";
import { DateTime } from "luxon";
import { useState } from "react";
import MemoryModal from "./memory-modal";

const MemoryItem = (props: { item: MemoryItemInterface }) => {
  const [showModal, setShowModal] = useState(false);

  function convertToCustomFormat(dateString: string): string {
    const parsedDate = DateTime.fromISO(dateString);
    const formattedDate = parsedDate.toFormat("dd/MM/yyyy, HH:mm:ss");
    return formattedDate;
  }

  const handleShowModal = (value: boolean) => {
    setShowModal(value);
  };

  return (
    <>
      {
        showModal&&<MemoryModal handleShowModal={handleShowModal} item={props.item} />
      }
      <div onClick={()=>handleShowModal(true)} className="bg-gray-50 p-3 border-b">
        <h4 className="font-medium my-1">{props.item.memory}</h4>
        <p className="text-sm text-gray-400 flex gap-1 align-middle my-1">
          <CiClock1 className="text-gray-600 my-auto" />{" "}
          <span className="">
            {props.item.created_at &&
              convertToCustomFormat(props.item.created_at)}
          </span>
        </p>
        <div className="mt-2 flex gap-2">
          {props.item.categories.map((item, index) => {
            return (
              <Badge key={index} variant="secondary" className="bg-gray-200/80">
                {item}
              </Badge>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MemoryItem;
