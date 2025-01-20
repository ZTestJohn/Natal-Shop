import { apiClient } from "./apiClient.js"

export async function registerUser({ name, email, password }) {
  return apiClient.post("/users", {
    users_firts_name: name,
    password: password,
    email: email,
    country: "Brasil",
  });
}

export async function emailIsAlreadyRegistered(email) {
  try {
    const emailTest = await apiClient.get(`/users/email/${email}`);
    return emailTest && emailTest.length > 0 && emailTest[0].email === email;
  } catch {
    return false;
  }
}

export async function getUserByEmail(email) {
  try {
    const emailTest = await apiClient.get(`/users/email/${email}`);
    if (emailTest && emailTest.length > 0 && emailTest[0].id) {
      return emailTest[0];
    }
  } catch {
    return false;
  }
}

export async function loginUser(email, password) {
  try {
    return apiClient.post('/users/login', {
      email: email,
      password: password
    })
  } catch (e) {
    console.error(e)
  }
}

