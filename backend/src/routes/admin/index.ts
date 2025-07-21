import { Router } from "express";
import { Login } from "../../controllers/admin/AdminController";

const router = Router();

router.post("/login", Login);

export default router;
