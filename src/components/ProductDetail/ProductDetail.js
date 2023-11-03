import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Detail } from "./Detail/Detail";
import "./ProductDetail.css";

const ProductDetail = (props) => {
  const location = useLocation();
  console.log(location);
  const { product } = location.state;
  console.log(product);
  // const product = props.location.state;
  return (
    <div
      className="productDetailContainer
    "
    >
      <div className="product-detail-header"></div>
      <Detail product={product} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
