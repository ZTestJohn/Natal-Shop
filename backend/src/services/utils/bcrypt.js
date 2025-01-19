import bcrypt from 'bcryptjs';

export async function encryptPassword(password){
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function passwordsAreTheSame(storedHashedPassword, userInputPassword) {
  try {
    const result = await bcrypt.compare(userInputPassword, storedHashedPassword);
    return result;
  } catch (err) {
    console.error('Erro ao comparar as senhas:', err);
    return false; 
  }
}