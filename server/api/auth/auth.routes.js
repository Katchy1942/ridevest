import express from "express";
import { loginCompany, loginRider } from "./auth.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { validateRequest } from "../../core/middlewares/validateRequest.js";
import { loginCompanySchema, loginRiderSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/login", validateRequest(loginCompanySchema), loginCompany);
router.post("/login/rider", validateRequest(loginRiderSchema), loginRider);
router.get("/verify", requireAuth, (req, res) => {
	res.status(200).json({ valid: true, company: req.company });
});

export default router;
