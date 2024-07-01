/* eslint-disable react/prop-types */
import "./cart_item.css";
import remove_icon from "../../assets/cart_cross_icon.png";
import { UseProducts } from "../../context/ProductsProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import deliveryIcon from "../../assets/delivery-truck.png";
import { Toast } from "../alert_message/Toast";
import { Warning } from "../alert_message/Warning";
import { useUsers } from "../../context/UsersProvider";

export default function CartItem({ cartItems }) {
  const navigate = useNavigate();
  const { loginUser } = useUsers();
  const { orderProducts, removeFromCart, getCartTotalAmount } = UseProducts();
  const [load, setLoad] = useState(false);
  return (
    <div className="cart_item">
      <div className="cart_item_title">
        <p>Products</p>
        <p>Name</p>
        <p>Price</p>
        <p>Size</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {cartItems.map((product) => {
        return (
          <div key={product.pid}>
            <div className="cart_item_list">
              <img
                onClick={() => navigate(`/product/${product._id}`)}
                src={product.image}
                alt=""
                className="cart_item_product_image"
              />
              <p className="cart_item_name">{product.title}</p>
              <p>${product.new_price}</p>
              <p>{product.size}</p>
              <button className="cart_item_quantity">{product.quantity}</button>
              <p>${product.new_price * product.quantity}</p>
              <img
                className="remove_item_icon"
                src={remove_icon}
                onClick={() => {
                  removeFromCart(product.pid);
                }}
              />
            </div>
            <hr />
          </div>
        );
      })}
      <div className="cart_item_down">
        <div className="cart_item_total">
          <h1>Cart Total</h1>
          <div>
            <div className="cart_total_item">
              <p>Subtotal</p>
              <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart_total_item">
              <p>Shopping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart_total_item">
              <h3>Total</h3>
              <h3>${getCartTotalAmount()}</h3>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                if (
                  loginUser.address.toLocaleLowerCase() == "enter your address"
                ) {
                  Warning("warning", "Need Your address");
                  navigate("/profile");
                } else {
                  setLoad(true);
                  Toast("success", "Order done!", 2000);
                  setTimeout(() => {
                    orderProducts();
                  }, 2000);
                }
              }}
            >
              {load ? (
                <div className="loading">
                  ORDERING{" "}
                  <div className="loader-animate">
                    <img src={deliveryIcon} alt="" />
                  </div>
                </div>
              ) : (
                "PROCEED TO CHECKOUT"
              )}
            </button>
          </div>
        </div>
        <div className="cart_item_promo_code">
          <p>If You have a promo code, Enter it here</p>
          <div className="promo_code_box">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
