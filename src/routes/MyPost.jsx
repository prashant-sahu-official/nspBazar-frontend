import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myItemsActions } from "../store/myItemsSlice";
import HomeItem from "../components/HomeItem";
import Loader from "../components/Loader";
const MyPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);

    const myItems = useSelector((state) => state.myItems);

    console.log("My Items:", myItems);
  

    useEffect(() => {
        setLoading(true);
        // Check if user is logged in
        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("You need to be logged in to view your posts.");
            navigate('/login'); // Redirect to login if not logged in
        }
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/myPosts/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(myItemsActions.addItems(data.myItems)) ;
            })
            .catch((err) => {
                console.error("Error fetching user's posts:", err);
            });
            setLoading(false);
    }, []);

    return <>
    {loading ? <Loader /> : (<>
         <div class="items-container">
          {myItems.map((item)=><HomeItem key={item.id} item={item}></HomeItem>)}
        </div>
        {myItems.length === 0 && <h2 className="no-items">No Post yet</h2>}
        </>)}
    </>
}

export default MyPost ;