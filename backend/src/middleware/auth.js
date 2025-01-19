import jwt from 'jsonwebtoken';
import dotenvConfig from '../../../dotev.json' assert { type: 'json' };

const secretKey = Buffer.from(dotenvConfig.JWT_SECRET, 'utf-8');

export async function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '30d' });
}


async function generateAndFetchToken() {
  const token = await generateToken({ id: 1 });
  fetch('http://localhost:3000/api/protected', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};

async function generateAndFetchToken2() {
  const token = await generateToken({ id: 1 });
  fetch('http://localhost:3000/api/user-id', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};