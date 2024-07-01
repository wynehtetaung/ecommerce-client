import { createContext, useContext, useEffect, useState } from "react";

const usersContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useUsers() {
  return useContext(usersContext);
}

// eslint-disable-next-line react/prop-types
export default function UsersProvider({ children }) {
  const [loginUser, setLoginUser] = useState();
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
          const user_res = await fetch(
            `https://ecommerce-project-api-s1c9.onrender.com/api/v1/user/user/${user._id}`
          );
          const userData = await user_res.json();
          setLoginUser(userData);
        }
      })();
    }
  }, []);

  return (
    <usersContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </usersContext.Provider>
  );
}
