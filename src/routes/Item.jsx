import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { descriptionActions } from "../store/descriptionSlice";
import "./Item.css";

const Item = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((store) => store.description);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(descriptionActions.addDescription(data.item));
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [id]);

  return (
    <div className="item-outer-container">
      <div className="item-image-container">
        <img
          src={item.image}
          alt={item.title || "Item"}
          className="item-image"
        />
      </div>
      <div className="item-details-container">
        <h2 className="item-title">{item.title}</h2>
        <p className="item-description">{item.description}</p>
        <div className="item-meta">
          <span>
            <strong>Posted At:</strong> {item.postedAt}
          </span>
          <span>
            <strong>Location:</strong> {item.location}
          </span>
        </div>
        {/* Add more details or actions here if needed */}
      </div>
    </div>
  );
};

export default Item;
