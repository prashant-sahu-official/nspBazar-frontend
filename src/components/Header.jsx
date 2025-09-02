import { ImProfile } from "react-icons/im";
import { LuBookHeart } from "react-icons/lu";
import { BsHandbagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { MdPlaylistAddCircle } from "react-icons/md";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { useRef, useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { MdOutlineAddBox } from "react-icons/md";
import { SlBasketLoaded } from "react-icons/sl";
import { IoHomeOutline } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { BiBookmarkHeart } from "react-icons/bi";

import "./Header.css";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const isLogin = useSelector((store) => store.isLogin);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const navRef = useRef(null); // 👈 Reference to #full-scr

  //onCLick event using event delegation for mobile nav links
  useEffect(() => {
    const nav = navRef.current;

    const handleClick = (e) => {
      // check if clicked element or its parent has class "mobile-nav-link"
      const link = e.target.closest(".mobile-nav-link");
      if (link && nav.contains(link)) {
        navRef.current.style.top = "-110%";
      }
    };

    nav.addEventListener("click", handleClick);
    return () => nav.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const navEl = navRef.current;

    const handleTouchStart = (e) => {
      touchStartY.current = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY.current = e.changedTouches[0].screenY;
      const swipeDistance = touchStartY.current - touchEndY.current;

      if (swipeDistance > 50) {
        // Swipe up
        navEl.style.top = "-110%";
      } else if (swipeDistance < -50) {
        // Swipe down
        navEl.style.top = "0%";
      }
    };

    if (navEl) {
      navEl.addEventListener("touchstart", handleTouchStart);
      navEl.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (navEl) {
        navEl.removeEventListener("touchstart", handleTouchStart);
        navEl.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  const handleMenuToggle = () => {
    const fullScreen = navRef.current;
    fullScreen.style.top = fullScreen.style.top === "0%" ? "-110%" : "0%";
  };
  return (
    <>
      <header>
        <div class="logo_container">
          <Link to="/">
            <img
              class="myntra_home"
              src="/images/nspBazarLogo.png"
              alt="Myntra Home"
            />
          </Link>
          <h3 onClick={handleMenuToggle}>
            <FiMenu />{" "}
          </h3>
        </div>
        {/* Mobile Full-Screen Menu */}
        <div id="full-scr" ref={navRef} className="mobile-nav">
          <nav className="mobile-nav-content" aria-label="Mobile Navigation">
            <Link to="/" className="mobile-nav-link">
              <IoHomeOutline />
              <span>Home</span>
            </Link>
            <Link to="/myPost" className="mobile-nav-link">
              <SlBasketLoaded />
              <span>My Listings</span>
            </Link>
            {!isLogin && (
              <Link to="/login" className="mobile-nav-link">
                <IoIosLogIn />
                <span>Login</span>
              </Link>
            )}
            <Link to="/addPost" className="mobile-nav-link">
              <MdOutlineAddBox />
              <span>Sell Something</span>
            </Link>
            <Link to="/myProfile" className="mobile-nav-link">
              <VscAccount />
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="mobile-nav-link">
              <BiBookmarkHeart />
              <span>Saved Items</span>
            </Link>
          </nav>
        </div>
        <nav class="nav_bar">
          <Link to="/myPost"> My Listings </Link>
          {/* <a href="#">Home & Living</a> */}
          {!isLogin && <Link to="/login">Login</Link>}
          <Link to="/addPost">Sell Something</Link>
        </nav>
        <div class="search_bar">
          <button className="search_button">
            <GoSearch className="search_icon" />
          </button>

          <input className="search_input" placeholder="Search for products" />
        </div>
        <div class="action_bar">
          <Link class="action_container" to="/myProfile">
            <ImProfile />
            <span class="action_name">Profile</span>
          </Link>

          <Link class="action_container" to="/wishlist">
            <LuBookHeart />
            <span class="action_name">Wishlist</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
