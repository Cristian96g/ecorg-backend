import { Router } from "express";
import { verifyJWT, requireRole } from "../middleware/auth.js";
import { uploadReportPhotos } from "../middleware/upload.js";
import { createReport, listReports, getReport, setReportStatus } from "../controllers/reportsController.js";

const router = Router();

router.get("/", listReports);
router.get("/:id", getReport);

router.post(
  "/",
  verifyJWT,
  uploadReportPhotos.array("fotos", 3),
  createReport
);

// admin: actualizar estado
router.put("/:id/status", verifyJWT, requireRole("admin"), setReportStatus);

export default router;
