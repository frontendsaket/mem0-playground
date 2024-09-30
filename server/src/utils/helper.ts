interface MessageData {
    id: number;
    question: string;
    answer: string;
    model: string;
    provider: string;
    created_at: number;
    updated_at: number;
}

interface ConvertedMessage {
    role: "user" | "assistant";
    content: string;
}

function convertMessages(data: MessageData[]): ConvertedMessage[] {
    const messages: ConvertedMessage[] = [];
    data.forEach(item => {
      messages.push({
        role: "user",
        content: item.question
      });
  

      messages.push({
        role: "assistant",
        content: item.answer
      });
    });
  
    return messages;
}

export {convertMessages};
