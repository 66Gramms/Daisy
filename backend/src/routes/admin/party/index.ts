import { Router } from "express";
import { RegisterParty } from "../../../controllers/admin/party/PartyController";

const router = Router();

router.post("/register-party", RegisterParty);

export default router;
