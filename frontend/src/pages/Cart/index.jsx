import Header from "../../components/Header";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import ProductsList from "../../components/ProductsList";
import styles from "./Cart.module.css";
import { useCartContext } from "../../contexts/Cart";

function Cart() {
  const { cart } = useCartContext();
  console.log(cart.lenght)
  return (
    <>
      <Header />
      <Container>
        <section className={styles.DivCart}>
          <div className={styles.productsDivFinal}>
            <ProductsList productsArray={cart} />
          </div>
          <div className={styles.boxFinal}>
            <div>
              <h2>Finalizar compra?</h2>
              <button>Finalizar</button>
            </div>
          </div>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
