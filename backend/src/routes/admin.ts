import { Router } from "express";
import { registerParty, login } from "../controllers/adminController";

const router = Router();

router.post("/register-party", registerParty);
router.post("/login", login);

export default router;
