/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

import "./product_item.css";

export default function ProductItem({ product, click }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (click) {
          navigate(`/product/${product._id}`);
          window.scrollTo(0, 0);
        }
      }}
      className="item"
    >
      <img src={product.image} alt="" />
      <p>{product.title}</p>
      <div className="item_prices">
        <div className="item_new_price">${product.new_price}</div>
        {product.old_price ? (
          <div className="item_old_price">${product.old_price}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
