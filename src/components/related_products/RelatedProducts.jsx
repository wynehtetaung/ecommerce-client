/* eslint-disable react/prop-types */
import "./related_products.css";
import ProductItem from "../product_item/ProductItem";
import { UseProducts } from "../../context/ProductsProvider";
export default function RelatedProducts({ product }) {
  const { products } = UseProducts();
  const filterProducts = products
    .filter(
      (proFilter) =>
        proFilter.category === product.category && proFilter._id !== product._id
    )
    .slice(0, 4);
  return (
    <div className="related_products">
      <h1>Related Products</h1>
      <hr />
      <div className="related_products_items">
        {filterProducts.map((product) => {
          return (
            <ProductItem key={product._id} product={product} click={true} />
          );
        })}
      </div>
    </div>
  );
}
