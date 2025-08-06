import { FaStar } from "react-icons/fa6";
import "./Wishlist.css";
import { useEffect } from "react";
import HomeItem from "../components/HomeItem";
import { useDispatch, useSelector } from "react-redux";
import { wishlistActions } from "../store/wishlistSlice";
const Wishlist = () => {
 const wishlistItems = useSelector((state) => state.wishlist);
 const dispatch = useDispatch() ;
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // Handle the fetched wishlist data
        console.log(data);
        dispatch(wishlistActions.addInitialWishlist(data.wishlist));
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, []);

  return (
    <>
         <div class="items-container">
          {wishlistItems.map((item)=><HomeItem key={item.id} item={item}></HomeItem>)}
        </div>
        {wishlistItems.length === 0 && <h2 className="no-items">No Post yet</h2>}
    </>
  );
};

export default Wishlist;
