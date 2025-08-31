import { Children, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/App.jsx";
import Bag from "./routes/Bag.jsx";
import Home from "./routes/Home.jsx";
import Item from "./routes/Item.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import myntraStore from "./store/index.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPost from "./routes/AddPost.jsx";
import AuthPage from "./routes/AuthPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import MyPost from "./routes/MyPost.jsx";
import MyProfile from "./routes/MyProfile.jsx";
import Wishlist from "./routes/Wishlist.jsx";
import CategoryRoute from "./routes/CategoryRoute.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/bag",
        element: (
          <ProtectedRoute>
            <Bag />
          </ProtectedRoute>
        ),
      },
      {
        path: "/item/:id",
        element: <Item />,
      },
      {
        path: "/myPost",
        element: (
          <ProtectedRoute>
            <MyPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myProfile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addPost",
        element: (
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:category",
        element: <CategoryRoute /> ,
      },
    ],
  },

  {
    path: "/login",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="397608238006-equbap7begks871rkf1pfbav6mr3t8bb.apps.googleusercontent.com">
    <Provider store={myntraStore}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </Provider>
    </GoogleOAuthProvider>;
  </StrictMode>
);
