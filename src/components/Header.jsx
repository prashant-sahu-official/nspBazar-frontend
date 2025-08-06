import { ImProfile } from "react-icons/im";
import { LuBookHeart } from "react-icons/lu";
import { BsHandbagFill } from "react-icons/bs";
import {Link} from "react-router-dom" ;
import { useSelector } from "react-redux";
import { GoSearch } from "react-icons/go";
import './Header.css' ;


const Header = ()=> {

    const bag = useSelector( store => store.bag) ;
    const isLogin = useSelector(store => store.isLogin) ;
  
    return <>
         <header>
        <div class="logo_container">
            <Link to="/"><img class="myntra_home" src="/images/nspBazarLogo.png" alt="Myntra Home" /></Link>
        </div>
        <nav class="nav_bar">
            <Link to="/myPost"> My Posts </Link>
            {/* <a href="#">Home & Living</a> */}
            {!isLogin && <Link to="/login">Login</Link>}
            <Link to="/addPost">Create Post <sup>New</sup></Link>
        </nav>
        <div class="search_bar">
            <button className="search_button"><GoSearch className="search_icon" /></button>
            
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
}

export default Header ;