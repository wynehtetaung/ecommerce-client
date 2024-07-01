/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.png";
import logo_sx from "../../assets/sx.png";
import card_icon from "../../assets/cart_icon.png";
import { UseProducts } from "../../context/ProductsProvider";
import { useUsers } from "../../context/UsersProvider";
export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop");
  const menuRef = useRef();
  const { getCartTotalItems } = UseProducts();
  const { loginUser } = useUsers();
  useEffect(() => {
    switch (pathname) {
      case "/":
        setMenu("shop");
        break;
      case "/category/men":
        setMenu("men");
        break;
      case "/category/women":
        setMenu("women");
        break;
      case "/category/kid":
        setMenu("kid");
        break;
      default:
        setMenu("");
        break;
    }
  }, [pathname]);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav_menu_visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <svg
        onClick={dropdown_toggle}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 menu_icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>

      <div className="nav_logo">
        {/* <img src={logo} alt="Logo" /> */}
        {/* <img src={logo_sx} alt="Logo" /> */}
        <p onClick={() => navigate("/")}>
          Standard<span className="highlight">X</span>
        </p>
      </div>
      <ul ref={menuRef} className="nav_menu">
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          Shop
          {menu === "shop" ? <hr /> : ""}
        </li>
        <li
          onClick={() => {
            navigate("/category/men");
          }}
        >
          Men
          {menu === "men" ? <hr /> : ""}
        </li>
        <li
          onClick={() => {
            navigate("/category/women");
          }}
        >
          Women
          {menu === "women" ? <hr /> : ""}
        </li>
        <li
          onClick={() => {
            navigate("/category/kid");
          }}
        >
          Kids {menu === "kid" ? <hr /> : ""}
        </li>
      </ul>
      <div className="nav_login_card">
        {!loginUser ? (
          <button
            onClick={() => {
              navigate("/login");
              setMenu("");
            }}
          >
            Login
          </button>
        ) : (
          <div
            onClick={() => {
              navigate("/profile");
              setMenu("");
            }}
            className="profile"
          >
            {!loginUser.image ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <div>
                <img src={loginUser.image} alt="" />
              </div>
            )}
          </div>
        )}
        <div className="cart_container">
          {loginUser ? (
            <>
              <img onClick={() => navigate("/cart")} src={card_icon} alt="" />
              {getCartTotalItems() !== 0 ? (
                <div className="nav_card_count">{getCartTotalItems()}</div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
