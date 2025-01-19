import { Router } from "express";
import userController from "./app/controllers/userController.js";
import authController from "./app/controllers/authController.js";

const router = Router();

router.get("/api/users", userController.index);
router.get("/api/users/:id", userController.show);
router.post("/api/users", userController.store);
router.put("/api/users/:id", userController.update);
router.delete("/api/users/:id", userController.delete);
router.get('/api/users/email/:email', userController.findByEmail);
router.post('/api/users/login', authController.login);

// router.get('/api/user-id', authenticateToken, (req, res) => {
//   res.json({ userId: req.user.id });
// });

export default router;
