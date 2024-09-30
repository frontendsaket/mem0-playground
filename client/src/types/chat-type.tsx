interface ChatItemInterface {
  created_at: number;
  id: string;
  title: string;
  updated_at: number;
}

interface ChatPairInterface {
    answer: string;
    created_at: number;
    id: number;
    model: string;
    provider: string;
    question: string;
    updated_at: number;
  }
  

export type { ChatItemInterface, ChatPairInterface };
