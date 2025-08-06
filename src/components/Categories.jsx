import "./Categories.css";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <nav className="categories-container" aria-label="Main categories">
      <h2 className="categories-title">Browse Categories</h2>
      <ul className="categories-list">
        <li>
          <Link to="/category/electronics" className="category-link">
            <img
              src="/images/electronics.png"
              alt="Electronics"
              className="category-img"
            />
            <span>Electronics</span>
          </Link>
        </li>
        <li>
          <Link to="/category/book" className="category-link">
            <img src="/images/books.png" alt="Books" className="category-img" />
            <span>Books</span>
          </Link>
        </li>
        <li>
          <Link to="/category/properties" className="category-link">
            <img
              src="/images/properties.png"
              alt="Properties"
              className="category-img"
            />
            <span>Properties</span>
          </Link>
        </li>
        <li>
          <Link to="/category/vehicles" className="category-link">
            <img
              src="/images/vehicles.png"
              alt="Vehicles"
              className="category-img"
            />
            <span>Vehicles</span>
          </Link>
        </li>
        <li>
          <Link to="/category/fashion" className="category-link">
            <img
              src="/images/fashion.png"
              alt="Fashion"
              className="category-img"
            />
            <span>Fashion</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Categories;
