/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./breadcrumbs.css";
import arrow_icon from "../../assets/breadcrum_arrow.png";
export default function Breadcrumbs({ product }) {
  const navigate = useNavigate();
  return (
    <div className="breadcrumbs">
      {/* <span onClick={() => navigate("/")}>HOME</span> <img src={arrow_icon} />{" "} */}
      <span onClick={() => navigate("/")}>shop</span> <img src={arrow_icon} />
      <span onClick={() => navigate(`/category/${product.category}`)}>
        {product.category}
      </span>{" "}
      <img src={arrow_icon} /> {product.title}
    </div>
  );
}
