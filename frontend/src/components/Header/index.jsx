import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";
import Sidebar from "../Sidebar";
import ProfileButton from "../ProfileButton";

function Header() {
  const [sidebar, setSidebar] = useState(false);
  const [SearchBarContent, setSearchBarContent] = useState("Árvore de Natal");

  function getSearchAreaContent(event) {
    let textInput = event.target.value;
    textInput = textInput.trim();
    setSearchBarContent(textInput);
    if (textInput === "") {
      setSearchBarContent("Árvore de Natal");
    }
  }
  function menuFunction() {
    setSidebar(!sidebar);
  }

  return (
    <>
      <Sidebar active={sidebar} setActive={setSidebar} />
      <header className={styles.header}>
        <div>
          <button onClick={menuFunction}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </button>
          <div>
            <img src="/natal.png" alt="Logo" width="38px" />
            <Link to="/">
              <span>Natalshop</span>
            </Link>
          </div>
        </div>
        <div className={styles.SearchArea}>
          <input
            type="text"
            name="buscar"
            placeholder="Digite o queira buscar"
            onChange={getSearchAreaContent}
          />
          <Link to={`/SearchPage/${SearchBarContent}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-search"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </Link>
        </div>
        <nav className={styles.linksNav}>
          <Link to="/Favorites">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
            </svg>
          </Link>
          <Link to="/Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </Link>
          <ProfileButton />
        </nav>
      </header>
    </>
  );
}
export default Header;
