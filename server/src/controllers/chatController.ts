import dotenv from "dotenv";
dotenv.config();

import User from "../models/user";
import { Request, Response } from "express";
import { convertMessages } from "../utils/helper";

const REQ_URL = "https://api.mem0.ai/v1/memories/";
const TOKEN = process.env.MEM0_GAUTH_TOKEN as string;

const sendChat = async (req: Request, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let { user_id, model, provider, query, session_id } = req.body;

  try {
    // check if user exists
    //   let user = await User.findById(req.user.id);
    //   if (!user) {
    //     return res.status(400).json({ success, error: "User not found!" });
    //   }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",
        playground: true,
        provider: provider || "OpenAI",
        query: query,
        user_id: user_id,
        session_id: session_id,
      }),
    };
    const response = await fetch(
      `https://api.mem0.ai/api/v1/memory/chat/`,
      options
    );
    if (response.status == 200) {
      const opts = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
      };
      const conversations = await fetch(
        `https://api.mem0.ai/api/v1/conversations/${session_id}`,
        opts
      );
      const data = await conversations.json();
      const messages = convertMessages(data);
      const options2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify({
          user_id: user_id,
          messages: messages,
        }),
      };

      const res2 = await fetch("http://localhost:9000/api/memory/add", options2);
      const data2 = await res2.json();
      if (data2.success) {
        success = true;
        return res.json({ success, conversations: data });
      } else {
        return res.json({ success, conversations: data });
      }
    } else {
      return res.status(410).json({ success, error: "Something went wrong!" });
    }
    // const data = await response.json();

    success = true;
    return res.json({ success, memories: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

// const getConversations = 

export { sendChat };
