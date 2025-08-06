import { useSelector } from "react-redux";
import BagItem from "../components/BagItem";
import BagSummary from "../components/BagSummary";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Bag = () => {
  const bagItems = useSelector(store => store.bag) ;
  const items = useSelector(store => store.items) ;
  const finalItems = items.filter((item)=>{return bagItems.indexOf(item.id)>=0})

  return (
      <main>
        <div class="bag-page">
          <div class="bag-items-container">
              {finalItems.map((item)=> <BagItem item = {item} /> )}
          </div>
          <BagSummary finalItems = {finalItems}/>
          </div>
      </main>
  );
};

export default Bag;
