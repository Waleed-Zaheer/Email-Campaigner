import express from "express";
import { getRecipients } from "../controllers/recipients.js"; 

const router = express.Router();

router.get("/",getRecipients);

export default router;
