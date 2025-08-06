import { useState, useRef } from "react";
import "./AuthPage.css"; // CSS file import
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { isLoginActions } from "../store/isLoginSlice";
import { wishlistActions } from "../store/wishlistSlice";
import Loader from "../components/Loader";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = nameRef.current?.value || ""; // safe check
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
   

    if (!isValidEmail(email)) {
      return setError("Invalid Email Formate");
    }

    if(password.length<8){
      return setError("Password length must be atleast 8 character") ;
    }

    const formData = isLogin ? { email, password } : { name, email, password };

    const url = isLogin
      ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`
      : `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();

      if (res.ok) {
        console.log("Response data:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("userName", data.user.name);
        dispatch(isLoginActions.setLogin(true));

        // Fetch the wishlist for the logged-in user
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${localStorage.getItem("userId")}`
        )
          .then((res) => res.json())
          .then((data) => {
            // Handle the fetched wishlist data
            
            dispatch(wishlistActions.addInitialWishlist(data.wishlist));
          })
          .catch((error) => {
            console.error("Error fetching wishlist:", error);
          });
        //---------------------------------------------------------
        setLoading(false);
        alert("Login/Signup Success ✅");

        navigate("/");
      } else {
        alert(data.msg || "Something went wrong ❌");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <Header></Header>
        {loading ? <Loader /> : (
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
              {error && <p stylee={{color:"red"}}>{error}</p>}
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
