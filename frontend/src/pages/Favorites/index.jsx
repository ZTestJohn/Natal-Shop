import Header from "./../../components/Header";
import Container from "./../../components/Container";
import Footer from "./../../components/Footer";
import ProductsList from "./../../components/ProductsList";
import styles from "./Favorites.module.css";
import { useFavoriteContext } from "../../contexts/Favorite";

function Favorites() {
  const { favorite } = useFavoriteContext()

  return (
    <>
      <Header />
      <Container className={styles.fundo}>
        <ProductsList productsArray={favorite} />
      </Container>
      <Footer />
    </>
  );
}

export default Favorites;
