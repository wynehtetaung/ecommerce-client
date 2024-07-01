import "./new_collection.css";
import ProductItem from "../product_item/ProductItem";
import { useEffect, useState } from "react";
export default function NewCollection() {
  const [NewCollections, setNewCollections] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://ecommerce-project-api-s1c9.onrender.com/api/v1/product/new-collections"
      );
      const { data } = await res.json();
      setNewCollections(data);
    })();
  }, []);
  return (
    <div className="new_collection" id="latest">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {NewCollections.map((item) => {
          return <ProductItem key={item._id} product={item} click={true} />;
        })}
      </div>
    </div>
  );
}
