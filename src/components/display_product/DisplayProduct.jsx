/* eslint-disable react/prop-types */
import "./display_product.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { useEffect, useRef, useState } from "react";
import { UseProducts } from "../../context/ProductsProvider";
import { useUsers } from "../../context/UsersProvider";


export default function DisplayProduct({ product }) {
  const [showImg, setShowImg] = useState();
  const quantityRef = useRef();
  const [sizeLetter, setSizeLetter] = useState();
  const { addToCart } = UseProducts();
  const { loginUser } = useUsers();
  useEffect(() => {
    setShowImg(product.image);
  }, [product]);
  const sizeHandler = (e) => {
    const btn = document.querySelectorAll(".btn");
    const current = e.target;
    btn.forEach((b) => {
      if (b === current) {
        b.classList.add("active");
        setSizeLetter(current.value);
      } else {
        b.classList.remove("active");
      }
    });
  };
  const countHandler = (increase) => {
    if (increase) {
      quantityRef.current.value = Number(quantityRef.current.value) + 1;
    } else {
      quantityRef.current.value =
        quantityRef.current.value > 1
          ? Number(quantityRef.current.value) - 1
          : 1;
    }
  };
  return (
    <div className="display_product">
      <div className="display_left">
        <div className="display_image_list">
          {product.showcase.map((image) => {
            return (
              <img
                onClick={() => setShowImg(image.src)}
                key={image.id}
                src={image.src}
              />
            );
          })}
        </div>
        <div className="display_image">
          <img className="display_main_image" src={showImg} />
        </div>
      </div>
      <div className="display_right">
        <h1>{product.title}</h1>
        <div className="display_right_star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="display_right_price">
          <div className="display_old_price">${product.old_price}</div>
          <div className="display_new_price">${product.new_price}</div>
        </div>
        <div className="display_right_description">
          {product.description.slice(0, 100) +
            (product.description.length > 100 ? " ......" : "")}
        </div>
        <div className="display_right_size">
          <h1>Select Size</h1>
          <div className="select_size ">
            {product.size.map((ps) => (
              <button
                className="btn"
                value={ps.letter}
                onClick={loginUser ? sizeHandler : ""}
                key={ps.id}
              >
                {ps.letter}
              </button>
            ))}
          </div>
        </div>
        {loginUser ? (
          <>
            <div className="select_quantity">
              <div onClick={() => countHandler(false)} className="count">
                -
              </div>
              <input
                type="number"
                name="number"
                defaultValue={1}
                ref={quantityRef}
              />
              <div onClick={() => countHandler(true)} className="count">
                +
              </div>
            </div>
            <button
              className="add-cart"
              onClick={() =>
                {
                  addToCart(product._id, sizeLetter, quantityRef.current.value)
                }
              }
            >
              ADD TO CART
            </button>
          </>
        ) : (
          ""
        )}
        <div className="display_right_category">
          <span>Category : </span>
          {product.category},T-Shirt,Crop Top
        </div>
        <div className="display_right_category">
          <span>Tags : </span>
          Modern,Latest
        </div>
      </div>
    </div>
  );
}
