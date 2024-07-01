import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Shop from "./pages/Shop";
import Category from "./pages/Category";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import SingUp from "./pages/SignUp";
import Login from "./pages/Login";
import NewCollection from "./components/new_collection/NewCollection";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Shop />,
      },
      {
        path: "/category/:type",
        element: <Category />,
      },
      {
        path: "/product/:id",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SingUp />,
  },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
