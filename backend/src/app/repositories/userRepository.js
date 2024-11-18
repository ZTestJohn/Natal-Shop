import { consultation } from "../db/connection.js";

class userRepository {

    create(user) {
        const sql = "INSERT INTO users SET ?";
        return consultation(sql, user, "Não foi possível cadastrar o elemento")
    }

    findAll() {
        const sql = "SELECT * FROM users";
        return consultation(sql, "Não foi possível localizar")
    }

    findById(id) {
        const sql = "SELECT * FROM users WHERE id=?";
        return consultation(sql, id, "Não foi possível localizar")
    }

    update(user, id) {
        const sql = "UPDATE users SET ? WHERE id=?";
        return consultation(sql, [user, id], "Não foi possível atualizar")
    }

    delete(id) {
        const sql = "DELETE FROM users WHERE id=?";
        return consultation(sql, id, "Não foi possível deletar")
    }

} 

export default new userRepository();
