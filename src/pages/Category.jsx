import { useParams } from "react-router-dom";
import "./css/category.css";
import ProductItem from "../components/product_item/ProductItem";
import dropdown_icon from "../assets/dropdown_icon.png";
import { UseProducts } from "../context/ProductsProvider";
import { UseUiState } from "../context/UiStateProvider";
import { useEffect, useState } from "react";
import { Warning } from "../components/alert_message/Warning";

export default function Category() {
  const { type } = useParams();
  const { products } = UseProducts();
  const filterProduct = products.filter((product) => product.category === type);
  const { banner } = UseUiState();
  const [show, setShow] = useState([]);
  const [more, setMore] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://ecommerce-project-api-s1c9.onrender.com/api/v1/product?limit=8&category=${type}`
      );
      const { data } = await res.json();
      setShow(data);
    })();
  }, [type]);

  const moreHandler = () => {
    setMore(!more);
    window.scrollTo(0, window.screenTop + 200);
  };

  return (
    <div className="category">
      <div className="banner_image">
        <img
          src={
            type === "men"
              ? banner.men
              : type === "women"
              ? banner.women
              : banner.kid
          }
          alt="Banner Image"
        />
      </div>
      <div className="category_sort">
        <p>
          <span>Showing 1-{more ? filterProduct.length : show.length} </span>out
          of {filterProduct.length} products
        </p>
        <div
          onClick={() => {
            Warning("info", "Not Available!");
          }}
          className="category_sort_btn"
        >
          Sort by <img src={dropdown_icon} />
        </div>
      </div>
      <div className="products">
        {more
          ? filterProduct.map((product) => {
              return (
                <ProductItem key={product._id} product={product} click={true} />
              );
            })
          : show.map((product) => {
              if (product.category === type) {
                return (
                  <ProductItem
                    key={product._id}
                    product={product}
                    click={true}
                  />
                );
              }
            })}
      </div>
      {show.length < 7 ? (
        ""
      ) : (
        <div onClick={moreHandler} className="product_show_more">
          {more ? "Explore Less" : "Explore More"}
        </div>
      )}
    </div>
  );
}
