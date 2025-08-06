import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice"

const BagItem = ({item})=> {

  //   let item = {
  //   id: "001",
  //   image: "images/1.jpg",
  //   company: "Carlton London",
  //   item_name: "Rhodium-Plated CZ Floral Studs",
  //   original_price: 1045,
  //   current_price: 606,
  //   discount_percentage: 42,
  //   return_period: 14,
  //   delivery_date: "10 Oct 2023",
  //   rating: {
  //     stars: 4.5,
  //     count: 1400,
  //   },
  // };
  const dispatch = useDispatch() ;

  const handleremoveFromCart = () =>{
        dispatch(bagActions.removeFromBag(item.id)) ;
  }

    return <div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src={item.image} />
    </div>
    <div class="item-right-part">
      <div class="company">{item.company}</div>
      <div class="item-name">{item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs {item.current_price}</span>
        <span class="original-price">Rs {item.original_price}</span>
        <span class="discount-percentage">({item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">{item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">{item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onClick={handleremoveFromCart}>X</div>
  </div>
}

export default BagItem ;