import authService from "../../middleware/authService.js";

class authController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const { token } = await authService.verifyEmailAndGenerateToken(
        email,
        password
      );
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async authenticateToken(req, res) {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    try {
      const payload = jwt.verify(token, secretKey);
      req.user = payload;
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  }
}

export default new authController();
