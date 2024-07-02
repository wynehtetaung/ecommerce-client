import "./css/login_signup.css";
import google_icon from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Toast } from "../components/alert_message/Toast";
import { Warning } from "../components/alert_message/Warning";
import { Loading } from "../components/alert_message/Loading";
export default function SignUp() {
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [check, setCheck] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  const GoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        Loading("Please Wait!");
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}`,
            },
          }
        );
        const { sub, name, picture, email, email_verified } = await res.json();
        (async () => {
          const res = await fetch(
            "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/register",
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                googleId: sub,
                name: name,
                email: email,
                password: sub,
                image: picture,
                cartData: [],
                type: "google",
                emailVerified: email_verified,
                address: "Enter Your Address",
              }),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            Warning("warning", data.message);
            return false;
          } else {
            Toast("success", "Signed Up successfully", 3000);
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        })();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="login">
      <h1>StandardX</h1>
      <p>Online Shopping</p>
      <h2>signup</h2>

      <div className="login_container">
        <form className="input_container">
          <input
            type="text"
            name="name"
            id="name"
            ref={nameRef}
            placeholder="Enter Your Name"
          />
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
          <i
            className="eye"
            onClick={() => {
              setType(!type);
            }}
          >
            {type ? "HIDE" : "SHOW"}
          </i>

          <input
            type="text"
            name="address"
            id="address"
            ref={addressRef}
            placeholder="Address [eg. house number,street,township,region]"
          />

          <input
            type="submit"
            value="SignUP"
            onClick={(e) => {
              e.preventDefault();
              if (!check) {
                Warning("warning", "agree the terms?");
                return false;
              }

              const name = nameRef.current.value;
              const email = emailRef.current.value;
              const password = passwordRef.current.value;
              const address =
                addressRef.current.value === ""
                  ? "enter your address"
                  : addressRef.current.value;
              if (!name || !email || !password) {
                Warning("warning", "Fill Name,Email,Password.");
                return false;
              }
              (async () => {
                Loading("Please Wait!");
                const res = await fetch(
                  "https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/register",
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                      name,
                      email,
                      password,
                      image: "",
                      cartData: [],
                      type: "default",
                      emailVerified: false,
                      googleId: "",
                      address,
                    }),
                  }
                );
                const data = await res.json();
                if (!res.ok) {
                  Warning("warning", data.message);
                  return false;
                } else {
                  Warning(
                    "success",
                    "SignUp successfully,A verification email has been sent to your email address!Please Check and verify."
                  );
                }
              })();
              nameRef.current.value = "";
              emailRef.current.value = "";
              passwordRef.current.value = "";
              addressRef.current.value = "";
            }}
          />
        </form>
        <div className="login_text">
          <p onClick={() => navigate("/")}>Go To Home</p>
          <p onClick={() => navigate("/login")}>Already Have An Account?</p>
        </div>
        <div className="divider">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div>
        <div className="social_box">
          <p>Login With</p>
          <div onClick={GoogleLogin} className="image_container">
            <img src={google_icon} alt="google icon" title="Google" />
          </div>
        </div>
      </div>
      <div className="agree">
        <input
          onClick={() => {
            setCheck(!check);
          }}
          type="checkbox"
          name="agree_check"
          id="agree_check"
        />
        <span>By continuing,i agree the terms of use & privacy policy.</span>
      </div>
    </div>
  );
}
