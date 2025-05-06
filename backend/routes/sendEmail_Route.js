import express from "express";
import { Emailer } from "../controllers/sendEmails.js";

const router = express.Router();

router.post("/", Emailer);

export default router;
