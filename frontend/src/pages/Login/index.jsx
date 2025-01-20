import { Link } from "react-router-dom";
import { useState } from "react";
import { passwordsAreTheSame } from "../../../../backend/src/services/utils/bcrypt.js";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Login.module.css";
import gifAccount from "./createaccount.gif";
import { 
  emailIsAlreadyRegistered, 
  getUserByEmail,
  loginUser
} from "../../api/users.js"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [sucessMessage, setSucessMessage] = useState("")

  async function submitButton(e){
    e.preventDefault();
    await verifyAccount(email, password)
  }

  async function verifyAccount(email, password){
    const IsAlreadyRegistered = await emailIsAlreadyRegistered(email)

    if (IsAlreadyRegistered){
      try {
        const userAccount = await getUserByEmail(email)
        if (await passwordsAreTheSame(userAccount.password, password)){
          const { token } = await loginUser(email, password)
          setErrorMessage("")
          setSucessMessage("Sucesso ao entrar!");
          const accountInformations = { 
            isLogged: true, 
            token: token
          };
          localStorage.setItem(
            "accountInformation",
            JSON.stringify(accountInformations)
          );
          window.open("/", "_self");
          return

        }
        setErrorMessage("Senha incoreta!")
        return
        
      }
      catch (e) {
        setErrorMessage("Erro ao criar conta")
        console.log("Erro ao criar conta:\n", e)
        return
      }
    }

    setErrorMessage("Seu email não está cadastrado")
  }

  return (
    <main className={styles.main}>
      <Header />
      <Container> 
        <section className={styles.CreateAccount}>
          <div className={styles.CreateAccountBox}>
            <div className={styles.DivFirstHalf}>
              <div className={styles.AllTextDiv}>
                <h2>Entrar</h2>
                <span className={styles.AlertError}>{errorMessage}</span>
                <span className={styles.AlertSucess}>{sucessMessage}</span>
                <form onSubmit={submitButton} className={styles.formCreate}>
                  <div className={styles.inputsAndLabels}>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Senha:</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button type="submit">Entrar</button>
                      <span>
                        Não tem uma conta?
                        <Link to="/CreateAccount">Criar conta</Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.svgDiv}>
              <img src={gifAccount} alt="icone" />
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </main>
  );
}

export default Login;
