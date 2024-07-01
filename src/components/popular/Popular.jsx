import "./popular.css";
import ProductItem from "../product_item/ProductItem";
import { useEffect, useState } from "react";
export default function Popular() {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://ecommerce-project-api-s1c9.onrender.com/api/v1/product/popular?limit=4"
      );
      const { data } = await res.json();
      setPopular(data);
    })();
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN PRODUCTS</h1>
      <hr />
      <div className="popular_item">
        {popular.map((item) => {
          return <ProductItem key={item._id} product={item} click={true} />;
        })}
      </div>
    </div>
  );
}
