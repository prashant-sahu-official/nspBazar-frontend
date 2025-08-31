import { useState, useRef } from "react";
import "./AuthPage.css"; // CSS file import
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { isLoginActions } from "../store/isLoginSlice";
import { wishlistActions } from "../store/wishlistSlice";
import Loader from "../components/Loader";
import { toast, Bounce } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { jwtDecode } from "jwt-decode";

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const toggleForm = () => setIsLogin(!isLogin);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = useAuthSubmit(setLoading, setError, isLogin, nameRef, emailRef, passwordRef);
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user:", decoded);

      // Extract useful info
      const name = decoded.name;
      const email = decoded.email;
      const googleId = decoded.sub; // unique google id

      // ---- Option A: Send token to backend for verification & login ----
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, googleId }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);

        dispatch(isLoginActions.setLogin(true));

        // fetch wishlist
        const wishlistRes = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${data.user.id}`
        );
        const wishlistData = await wishlistRes.json();
        dispatch(wishlistActions.addInitialWishlist(wishlistData.wishlist));
        setLoading(false);
        toast.success("Google Login Success ✅", {
          position: "top-center",
          autoClose: 4000,
          theme: "dark",
          transition: Bounce,
        });
        
        navigate("/");
      } else {
        toast.error(data.message || "Google login failed ❌", {
          position: "top-center",
          autoClose: 4000,
          theme: "dark",
          transition: Bounce,
        });
      }

      // ---- Option B (quick local login without backend) ----
      // localStorage.setItem("token", credentialResponse.credential);
      // localStorage.setItem("userId", googleId);
      // localStorage.setItem("userName", name);
      // dispatch(isLoginActions.setLogin(true));
      // navigate("/");

    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed ❌", {
        position: "top-center",
        autoClose: 4000,
        theme: "dark",
        transition: Bounce,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Header></Header>
      {loading ? (
        <Loader />
      ) : (
        <div className="auth-container">
          <div className="auth-box">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  ref={nameRef}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
              <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleLogin(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </form>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="toggle-link" onClick={toggleForm}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default AuthPage;
