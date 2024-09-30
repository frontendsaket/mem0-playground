/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
const MemoryContext = createContext<any>({});
const url = import.meta.env.VITE_URL;

const MemoryState = (props: any) => {
  const [memories, setMemories] = useState([]);

  const getMemories = async (userid: string) => {
    try {
      const response = await fetch(`${url}/api/memory?user_id=${userid}`);
      const data = await response.json();

      if (data.success) {
        setMemories(data.memories);
        return true;
      } else {
        setMemories([]);
        return false;
      }
    } catch (error) {
      console.log(error);
      setMemories([]);
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
        await getMemories(data.memories.user_id);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const deleteMemory = async (memoryid: string) => {
    try {
      const response = await fetch(`${url}/api/memory?memoryid=${memoryid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.success) {
        await getMemories(data.memories.user_id);
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
    <MemoryContext.Provider value={{ getMemories, memories, updateMemory, deleteMemory }}>
      {props.children}
    </MemoryContext.Provider>
  );
};

export default MemoryContext;
export { MemoryState };
