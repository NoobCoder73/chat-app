import express from "express";

import { protectRoute } from "../middlewares/auth.js";

import {
  getMessages,
  getUsersForSidebar,
  markMessageAsSeen,
  sendMessage,
} from "../controllers/messageController.js";

const messageRoter = express.Router();

messageRoter.get("/users", protectRoute, getUsersForSidebar);
messageRoter.get("/:id", protectRoute, getMessages);
messageRoter.put("/mark/:id", protectRoute, markMessageAsSeen);
messageRoter.post("/send/:id", protectRoute, sendMessage);

export default messageRoter;
