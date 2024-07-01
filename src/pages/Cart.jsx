import { useEffect } from "react";
import CartItem from "../components/cart_item/CartItem";
import { UseProducts } from "../context/ProductsProvider";
import "./css/cart.css";
export default function Cart() {
  const { cartItems, setCartItems } = UseProducts();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        const res = await fetch(
          "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/verify",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const user = await res.json();
          (async () => {
            const res = await fetch(
              `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/cart-resource/${user._id}`
            );
            const data = await res.json();
            setCartItems(data);
          })();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cart">
      {cartItems.length > 0 ? (
        <CartItem cartItems={cartItems} />
      ) : (
        <div className="no_item_container">
          <p className="no_item_icon">!</p>
          <p className="no_item">No Item You Have Selected</p>
        </div>
      )}
    </div>
  );
}
