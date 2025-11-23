import { Router } from "express";
import { Login } from "../../controllers/admin/AdminController";
import { validate } from "../../middleware/validate";
import { LoginRequestSchema } from "../../dtos";

const router = Router();

router.post("/login", validate(LoginRequestSchema), Login);

export default router;
