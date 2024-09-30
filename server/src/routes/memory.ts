import { Router, Response } from "express";

import { getMemory, addMemory } from "../controllers/memoryController";

export default (router: Router) => {
    router.route("/api/memory").get((req: any, res: Response)=>getMemory(req, res));
    router.route("/api/memory/add").post((req: any, res: Response)=>addMemory(req, res));
}