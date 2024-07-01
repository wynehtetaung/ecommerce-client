/* eslint-disable react/prop-types */
import "./description_box.css";

export default function DescriptionBox({ product }) {
  return (
    <div className="description_box">
      <div className="description_nav">
        <div className="description_nav_box">Description</div>
        {/* <div className="description_nav_box fade">Review (122)</div> */}
      </div>
      <div className="description_text">
        <p>{product.description}</p>
        <p>
          At Standard X, we prioritize customer satisfaction above all else.
          Enjoy seamless transactions with secure payment options and swift
          delivery to your doorstep. Plus, our dedicated customer support team
          is always here to assist you every step of the way, ensuring a
          hassle-free shopping experience.
        </p>
      </div>
    </div>
  );
}
