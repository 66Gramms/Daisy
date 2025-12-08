import { Router } from "express";
import {
  GetParty,
  RegisterParty,
} from "../../../controllers/admin/party/PartyController";
import { validate } from "../../../middleware/validate";
import { RegisterPartyRequestSchema } from "../../../dtos";

const router = Router();

router.post(
  "/register-party",
  validate(RegisterPartyRequestSchema),
  RegisterParty
);

router.get("/has-party", GetParty);

export default router;
