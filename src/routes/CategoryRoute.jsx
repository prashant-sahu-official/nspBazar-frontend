import { useSelector } from "react-redux";
import Categories from "../components/Categories.jsx";
import { useParams } from "react-router-dom";
import HomeItem from "../components/HomeItem.jsx";

const CategoryRoute = () =>{
    const { category } = useParams();
    const items = useSelector(store => store.items)
    const filteredItems = items.filter(item => item.category === category);
    
    return (
         <>
    <main>
        <Categories></Categories>
        <div class="items-container">
          {filteredItems.map((item)=><HomeItem key={item.id} item={item}></HomeItem>)}
        </div>
        {filteredItems.length === 0 && <h2 className="no-items">No items available of this Category</h2>}
      </main>
      </>
    );
}

export default CategoryRoute;