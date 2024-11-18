import { Router } from "express";
import userController from "./app/controllers/userController.js";

const router = Router();

router.get("/api/users", userController.index);
router.get("/api/users/:id", userController.show);
router.post("/api/users", userController.store);
router.put("/api/users/:id", userController.update);
router.delete("/api/users/:id", userController.delete);
 
export default router;
