import { useSelector } from 'react-redux';
import HomeItem from '../components/HomeItem'
import Categories from '../components/Categories';

const Home = ()=> {
  
  const token = localStorage.getItem("token") ;
        

 let items = useSelector(store => store.items) ;

    return <>
    <main>
        <Categories></Categories>
        <div class="items-container">
          {items.map((item)=><HomeItem key={item.id} item={item}></HomeItem>)}
        </div>
        {items.length === 0 && <h2 className="no-items">No items available</h2>}
      </main>
      </>

}

export default Home ;