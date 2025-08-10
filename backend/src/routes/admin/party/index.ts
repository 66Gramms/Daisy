import { Router } from "express";
import {
  HasParty,
  RegisterParty,
} from "../../../controllers/admin/party/PartyController";

const router = Router();

router.post("/register-party", RegisterParty);
router.get("/has-party", HasParty);

export default router;
