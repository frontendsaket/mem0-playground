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
        console.log(data.memories);
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

  return (
    <MemoryContext.Provider value={{ getMemories, memories }}>
      {props.children}
    </MemoryContext.Provider>
  );
};

export default MemoryContext;
export { MemoryState };
