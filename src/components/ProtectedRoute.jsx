import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { isLoginActions } from "../store/isLoginSlice";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const isLogin = useSelector((store) => store.isLogin);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  

  if (typeof token !== "string" || token.trim() === "" || token === "undefined" || token === "null") { //this checks for empty, undefined, or null strings because localStorage can return these values
  console.log("No token found");
  dispatch(isLoginActions.setLogin(false));
  if (location.pathname === "/") {
    return children; // Allow access to Home without login
  }
  console.log("Redirecting to login");
  return <Navigate to="/login" replace />;
}

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      console.log("Token expired");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      dispatch(isLoginActions.setLogin(false));
      if (location.pathname == "/")
        return children; // Allow access to Home without login
      else
        return <Navigate to="/login"  replace />;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />;
  }
  dispatch(isLoginActions.setLogin(true));
  return children;
};

export default ProtectedRoute;
