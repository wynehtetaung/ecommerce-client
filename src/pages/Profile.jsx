import "./css/profile.css";
import { useUsers } from "../context/UsersProvider";
import { useNavigate } from "react-router-dom";
import Service from "../firebase/Service";
import { useState } from "react";
import { Toast } from "../components/alert_message/Toast";
import { Loading } from "../components/alert_message/Loading";
import { InputPopUp } from "../components/alert_message/InputPopUp";
import { Warning } from "../components/alert_message/Warning";
import { DeletePopUp } from "../components/alert_message/DeletePopUp";

export default function Profile() {
  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useUsers();
  const [upload, setUpload] = useState(false);
  return loginUser ? (
    <div className="profile_container">
      <div className="profile_image">
        <div className="image_box">
          {!loginUser.image ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ) : (
            <img src={loginUser.image} />
          )}
          <div className="upload_image">
            <label htmlFor="profile">
              <input
                onChange={async (e) => {
                  const image = e.target.files[0];
                  if (image.size > 300000) {
                    Warning("warning", "please select under 300kb image file!");
                  } else {
                    setUpload(true);
                    if (image) {
                      if (loginUser.image) {
                        await Service.image_delete(loginUser.image);
                      }
                      const url = await Service.image_upload(image);
                      const res = await fetch(
                        `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/update/${loginUser._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ image: url }),
                        }
                      );
                      if (res.ok) {
                        const { data } = await res.json();
                        setLoginUser(data);
                        Toast("success", "Done!upload image.", 3000);
                        setUpload(false);
                      } else {
                        return false;
                      }
                    }
                  }
                }}
                type="file"
                name="profile"
                id="profile"
                accept="image/*"
                hidden
              />
              <p>{upload ? Loading("Uploading") : "upload"}</p>
            </label>
          </div>
        </div>
      </div>
      <div className="profile_info">
        <div className="name">
          <h1>{loginUser.name}</h1>
          <span
            onClick={async () => {
              const name = await InputPopUp(
                "Enter Your New Name",
                "text",
                "Enter text"
              );
              if (name !== undefined) {
                const res = await fetch(
                  `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/update/${loginUser._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: name }),
                  }
                );
                const { data } = await res.json();
                setLoginUser(data);
              } else {
                return false;
              }
            }}
            className="edit_pen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </span>
        </div>
        <div className="email">
          <p>{loginUser.email}</p>
        </div>
        <div className="address">
          <p>
            {loginUser.address.toLocaleLowerCase() == "enter your address" ? (
              <span style={{ color: "red" }}>
                {"(Required!)" + loginUser.address}
                <div style={{ fontSize: "10px" }}>
                  eg. house number,street,township,region
                </div>
              </span>
            ) : (
              loginUser.address
            )}
          </p>
          <span
            onClick={async () => {
              const address = await InputPopUp(
                "Enter Your New Address",
                "text",
                "Enter text"
              );
              if (address !== undefined) {
                const res = await fetch(
                  `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/update/${loginUser._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ address: address }),
                  }
                );
                const { data } = await res.json();
                setLoginUser(data);
              } else {
                return false;
              }
            }}
            className="edit_pen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </span>
        </div>

        <p>{loginUser.gmail}</p>
        {loginUser.type != "google" ? (
          <button
            onClick={async () => {
              const password = await InputPopUp(
                "Enter Your New Password",
                "text",
                "Enter text"
              );
              if (password !== undefined) {
                await fetch(
                  `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/update/${loginUser._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password: password }),
                  }
                );
                setLoginUser(null);
                localStorage.removeItem("token");
                navigate("/");
              } else {
                return false;
              }
            }}
          >
            change password
          </button>
        ) : (
          ""
        )}

        <button
          onClick={() => {
            setLoginUser(null);
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Logout
        </button>
        <button
          style={{ background: "red", color: "#fff", border: "1px solid red" }}
          onClick={async () => {
            const result = await DeletePopUp();
            if (result) {
              await Service.image_delete(loginUser.image);
              setLoginUser(null);
              localStorage.removeItem("token");
              await fetch(
                `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/${loginUser._id}`,
                {
                  method: "DELETE",
                }
              );
              navigate("/");
            } else {
              return false;
            }
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
