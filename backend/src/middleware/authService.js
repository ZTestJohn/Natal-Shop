import { generateToken } from './auth.js';
import userRepository from '../app/repositories/userRepository.js';
import { passwordsAreTheSame } from '../services/utils/bcrypt.js';

class AuthService {
  async verifyEmailAndGenerateToken(email, password) {
    const users = await userRepository.findByEmail(email);
    const user = users[0];

    if (!user) {
      throw new Error('User not found');
    }

    if (!await passwordsAreTheSame(user.password, password)) {
      throw new Error('Invalid password');
    }

    const token = await generateToken(user);
    return { token };
  }
}

export default new AuthService();