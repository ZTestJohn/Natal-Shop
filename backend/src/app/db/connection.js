import mysql from "mysql";

const connectionSQL = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'ADMIN',
  database: 'natal_website',
});

connectionSQL.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados com sucesso!");
  }
});

/**
 * Executa um código sql com ou sem valores
 * @param {string} sql instruções sql
 * @param {string | array} values parâmetros
 * @param {string} messageReject mensagem a ser retornada ao rejeitar
 * @returns objeto da promisse
 */

export const consultation = (sql, values="", messageReject ) => {
  return new Promise((resolve, reject )=> {
    connectionSQL.query(sql, values, (error, result) => {
        if(error) return reject(messageReject);
        const row = JSON.parse(JSON.stringify(result))
        return resolve(row);
    })
})
}

export default connectionSQL; 