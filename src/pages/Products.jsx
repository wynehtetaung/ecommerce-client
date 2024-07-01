import { useParams } from "react-router-dom";
import { UseProducts } from "../context/ProductsProvider";
import Breadcrumbs from "../components/breadcrums/Breadcrumbs";
import DisplayProduct from "../components/display_product/DisplayProduct";
import DescriptionBox from "../components/description_box/DescriptionBox";
import RelatedProducts from "../components/related_products/RelatedProducts";

export default function Products() {
  const { id } = useParams();
  const { products } = UseProducts();

  const product = products.find((pro) => pro._id === id);
  if (product) {
    return (
      <div>
        <Breadcrumbs product={product} />
        <DisplayProduct product={product} />
        <DescriptionBox product={product} />
        <RelatedProducts product={product} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
