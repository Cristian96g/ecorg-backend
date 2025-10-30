import { Router } from "express";
import { me, updateMe, setRole } from "../controllers/usersController.js";
import { verifyJWT, requireRole } from "../middleware/auth.js";
import { uploadAvatar } from "../middleware/upload.js";

const router = Router();

router.get("/me", verifyJWT, me);
router.put("/me", verifyJWT, uploadAvatar.single("avatar"), updateMe);

// ADMIN: setear rol de un usuario
router.put("/:id/role", verifyJWT, requireRole("admin"), setRole);

export default router;
