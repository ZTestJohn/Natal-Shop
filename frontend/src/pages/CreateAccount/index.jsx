import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./CreateAccount.module.css";
import gifAccount from "./createaccount.gif";
import {
  registerUser,
  emailIsAlreadyRegistered,
  getUserByEmail,
} from "../../api/users";

function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");
  const [eightChars, setEightChars] = useState("");
  const [nameEqualsPassword, setNameEqualsPassword] = useState("");
  const [upperChars, setUpperChars] = useState("");
  const [symbolls, setSymbolls] = useState("");

  function changeValueName(e) {
    setName(e.target.value);
  }
  function changeValueEmail(e) {
    setEmail(e.target.value);
  }
  function changeValuePassword(e) {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setEightChars(newPassword.length >= 8 ? "green" : "gray");
    setNameEqualsPassword(newPassword !== name ? "green" : "gray");
    setUpperChars(/[A-Z]/.test(newPassword) ? "green" : "gray");
    setSymbolls(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "green" : "gray");
  }
  function changeValuePasswordRepeat(e) {
    setPasswordRepeat(e.target.value);
  }

  function submitButton(e) {
    e.preventDefault();
    verifyAccount(email, password, passwordRepeat, name);
  }

  async function verifyAccount(email, password, passwordRepeat, name) {
    const emailExists = await emailIsAlreadyRegistered(email);
    if (emailExists) {
      setErrorMessage("Email já cadastrado.");
      return;
    }
    if (verifyPassword(password, passwordRepeat, name)) {
      try {
        await registerUser({ name, email, password });
        const user = await getUserByEmail(email);
        setSucessMessage("A conta foi criada com sucesso!");
        const accountInformations = { 
          isLogged: true, 
          accountId: user.id 
        };
        localStorage.setItem(
          "accountInformation",
          JSON.stringify(accountInformations)
        );
        window.open("/", "_self");
      } catch (error) {
        setErrorMessage("Erro ao criar conta.");
        console.log(error);
      }
    }
  }

  function verifyPassword(password, passwordRepeat, name) {
    let isValid = true;

    if (!(password === passwordRepeat)) {
      setErrorMessage("As senhas não se coincidem.");
      isValid = false;
    }
    if (password === name) {
      setErrorMessage("A senha não pode ser igual ao nome.");
      isValid = false;
    }
    if (password.length < 8) {
      setErrorMessage("A senha deve ter no mínimo 8 caracteres.");
      isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("A senha deve conter uma letra maíscula no mínimo.");
      isValid = false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage("A senha deve conter um símbolo no mínimo.");
      isValid = false;
    }

    return isValid;
  }

  return (
    <main className={styles.main}>
      <Header />
      <Container>
        <section className={styles.CreateAccount}>
          <div className={styles.CreateAccountBox}>
            <div className={styles.DivFirstHalf}>
              <div className={styles.AllTextDiv}>
                <h2>Criar conta</h2>
                <span className={styles.AlertError}>{errorMessage}</span>
                <span className={styles.AlertSucess}>{sucessMessage}</span>
                <form onSubmit={submitButton} className={styles.formCreate}>
                  <div className={styles.inputsAndLabels}>
                    <div>
                      <label htmlFor="first_name">Nome:</label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required={true}
                        onChange={changeValueName}
                        value={name}
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        onChange={changeValueEmail}
                        value={email}
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Senha:</label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        onChange={changeValuePassword}
                        value={password}
                      />
                      <ul>
                        <li style={{ color: eightChars }}>A senha deve conter 8 caracteres no minimo.</li>
                        <li style={{ color: nameEqualsPassword }}>A senha não pode ser igual ao nome.</li>
                        <li style={{ color: upperChars }}>A senha deve conter uma letra maíscula no mínimo</li>
                        <li style={{ color: symbolls }}>A senha deve conter um símbolo no mínimo</li>
                      </ul>
                    </div>
                    <div>
                      <label htmlFor="password_repeat">Repita a senha:</label>
                      <input
                        type="password"
                        name="password_repeat"
                        id="password_repeat"
                        required={true}
                        onChange={changeValuePasswordRepeat}
                        value={passwordRepeat}
                      />
                      <button type="submit">Criar conta</button>
                      <span>
                        Já tem uma conta? <Link to="/Login">Entrar</Link>
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

export default CreateAccount;
