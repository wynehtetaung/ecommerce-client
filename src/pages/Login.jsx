import "./css/login_signup.css";
import google_icon from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useUsers } from "../context/UsersProvider";
import { UseProducts } from "../context/ProductsProvider";
import { useGoogleLogin } from "@react-oauth/google";
import { Toast } from "../components/alert_message/Toast";
import { Warning } from "../components/alert_message/Warning";
import { Loading } from "../components/alert_message/Loading";

export default function Login() {
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setLoginUser } = useUsers();
  const { setCartItems } = UseProducts();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}`,
            },
          }
        );
        const { sub, email } = await res.json();
        (async () => {
          Loading("Please Wait!");
          const res = await fetch(
            "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/login",
            {
              method: "POST",
              body: JSON.stringify({ email, password: sub }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await res.json();
          localStorage.setItem("token", data.token);
          if (!res.ok) {
            Warning("warning", data.message);
            return false;
          }
          await fetch(
            "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/verify",
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
              },
            }
          )
            .then((res) => res.json())
            .then((user) => {
              setLoginUser(user);
              (async () => {
                const res = await fetch(
                  `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/cart-resource/${user._id}`
                );
                const data = await res.json();
                setCartItems(data);
              })();
            });
          Toast("success", "Signed In successfully", 3000);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        })();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="background">
      <div className="login">
        <h1>StandardX</h1>
        <p>Online Shopping</p>
        <h2>login</h2>
        <div className="login_container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="input_container"
          >
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              placeholder="Enter Your Email"
            />
            <input
              type={type ? "text" : "password"}
              name="password"
              id="password"
              ref={passwordRef}
              placeholder="Enter Your Password"
            />
            <span
              onClick={() => {
                setType(!type);
              }}
            >
              {type ? "HIDE" : "SHOW"}
            </span>
            <input
              type="submit"
              value="Login"
              onClick={async () => {
                const email = emailRef.current.value;
                const password = passwordRef.current.value;
                if (!email || !password) {
                  Warning("warning", "Fill Email,Password.");
                  return false;
                }
                (async () => {
                  Loading("Please Wait!");
                  const res = await fetch(
                    "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/login",
                    {
                      method: "POST",
                      body: JSON.stringify({ email, password }),
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const data = await res.json();
                  // sessionStorage.setItem("token", data.token);
                  localStorage.setItem("token", data.token);
                  if (!res.ok) {
                    Warning("warning", data.message);
                    return false;
                  }
                  fetch(
                    "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/verify",
                    {
                      headers: {
                        Authorization: `Bearer ${data.token}`,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((user) => {
                      setLoginUser(user);
                      (async () => {
                        const res = await fetch(
                          `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/cart-resource/${user._id}`
                        );
                        const data = await res.json();
                        setCartItems(data);
                      })();
                    });
                  Toast("success", "Signed In successfully", 3000);
                  setTimeout(() => {
                    navigate("/");
                  }, 3000);
                })();
              }}
            />
          </form>
          <div className="login_text">
            <p onClick={() => navigate("/")}>Back To Home</p>
            <p onClick={() => navigate("/signup")}>Create Account?</p>
          </div>
          <div className="divider">
            <div className="line"></div>
            <span>or</span>
            <div className="line"></div>
          </div>
          <div className="social_box">
            <p>Login With</p>
            <div onClick={login} className="image_container">
              <img src={google_icon} alt="google icon" title="Google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
