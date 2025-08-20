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
import { useRef, useState, useEffect } from 'react';
import { IoHome } from "react-icons/io5";


import "./Header.css";

const Header = () => {
  const bag = useSelector((store) => store.bag);
  const isLogin = useSelector((store) => store.isLogin);

  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const navRef = useRef(null); // 👈 Reference to #full-scr

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
      navEl.addEventListener('touchstart', handleTouchStart);
      navEl.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (navEl) {
        navEl.removeEventListener('touchstart', handleTouchStart);
        navEl.removeEventListener('touchend', handleTouchEnd);
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
            <IoHome />
              <span>Home</span>
            </Link>
            <Link to="/myPost" className="mobile-nav-link">
              <MdPlaylistAddCheckCircle />
              <span>My Posts</span>
            </Link>
            {!isLogin && (
              <Link to="/login" className="mobile-nav-link">
                <IoIosLogIn />
                <span>Login</span>
              </Link>
            )}
            <Link to="/addPost" className="mobile-nav-link">
              <MdPlaylistAddCircle />
              <span>Create Post</span>
            </Link>
            <Link to="/myProfile" className="mobile-nav-link">
              <ImProfile />
              <span>Profile</span>
            </Link>
            <Link to="/wishlist" className="mobile-nav-link">
              <LuBookHeart />
              <span>Wishlist</span>
            </Link>
          </nav>
        </div>
        <nav class="nav_bar">
          <Link to="/myPost"> My Posts </Link>
          {/* <a href="#">Home & Living</a> */}
          {!isLogin && <Link to="/login">Login</Link>}
          <Link to="/addPost">Create Post</Link>
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

          <Link class="action_container" to="/bag">
            <BsHandbagFill />
            <span class="action_name">Bag</span>
            <span class="bag-item-count">{bag.length}</span>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
