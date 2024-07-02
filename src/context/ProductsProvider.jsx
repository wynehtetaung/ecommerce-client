/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";
import { useUsers } from "./UsersProvider";
import moment from "moment";
import { Toast } from "../components/alert_message/Toast";
import { Warning } from "../components/alert_message/Warning";

const productsContext = createContext();

export function UseProducts() {
  return useContext(productsContext);
}
export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { loginUser, setLoginUser } = useUsers();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://ecommerce-project-api-s1c9.onrender.com/api/v1/product"
      );
      const { data } = await res.json();
      const getData = data.filter((product) => product.available === true);
      setProducts(getData);
    })();

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
  }, []);

  const orderProducts = async () => {
    const res = await fetch(
      "https://ecommerce-project-api-s1c9.onrender.com/api/v1/product/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: loginUser._id,
          user_name: loginUser.name,
          user_address: loginUser.address,
          user_email: loginUser.email,
          order_date: moment().format("dddd,MMMM,YYYY, h:mm a"),
          order_status: "request order",
          order_products: cartItems,
        }),
      }
    );
    await res.json();

    const remove = await fetch(
      `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/remove/${loginUser._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const remove_data = await remove.json();
    setCartItems(remove_data.data.cartData);
  };

  const addToCart = (itemId, sizeLetter, quantity) => {
    if (!sizeLetter) {
      Warning("warning", "please select size!");
      return false;
    }
    const checkSize = cartItems
      .map((item) => item._id === itemId && item.size === sizeLetter)
      .includes(true);

    const filterProduct = products.filter(
      (product) => product._id === itemId
    )[0];
    const cartProduct = {
      _id: filterProduct._id,
      pid: filterProduct._id + Date.now(),
      title: filterProduct.title,
      category: filterProduct.category,
      new_price: filterProduct.new_price,
      total_price: Number(filterProduct.new_price) * Number(quantity),
      size: sizeLetter,
      image: filterProduct.image,
      description: filterProduct.description,
      quantity: Number(quantity),
    };
    if (checkSize) {
      setTimeout(() => {
        Warning(
          "info",
          "This item has the same type and size, so the quantity has been increased!"
        );
      }, 3000);
    }
    (async () => {
      const res = await fetch(
        `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/update/${loginUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            cartData: cartProduct,
          }),
        }
      );
      const { data } = await res.json();
      Toast("success", "Added Cart!", 2000);

      setCartItems(data.cartData);
    })();
  };
  const removeFromCart = (productId) => {
    const remove = cartItems.filter((product) => product.pid !== productId);
    setCartItems(remove);
    (async () => {
      await fetch(
        `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/remove/${loginUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ productId: productId }),
        }
      );
    })();
  };

  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (let i = 0; i < cartItems.length; i++) {
      totalAmount += cartItems[i].new_price * cartItems[i].quantity;
    }
    return totalAmount;
  };

  const getCartTotalItems = () => {
    return cartItems.length;
  };

  return (
    <productsContext.Provider
      value={{
        products,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
        getCartTotalItems,
        orderProducts,
      }}
    >
      {children}
    </productsContext.Provider>
  );
}
