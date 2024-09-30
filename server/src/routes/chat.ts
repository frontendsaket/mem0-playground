import { Router, Response } from "express";

import { sendChat } from "../controllers/chatController";

export default (router: Router) => {
    router.route("/api/chat").post((req: any, res: Response)=>sendChat(req, res));
}