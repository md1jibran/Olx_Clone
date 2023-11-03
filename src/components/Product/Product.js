import React from "react";
import Heart from "../../assets/Heart";
import "./Product.css";

export default function Product(props) {
  const product = props.product;
  const isSell = props.sell;
  const dateToString = (date) => {
    const result = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(result);
    return formattedDate;
  };

  const isSold = () => {
    if (isSell) {
      if (product.sold) {
        return <div className="sold-color">Sold!</div>;
      } else {
        return <div className="not-sold-color">Not Sold!</div>;
      }
    } else {
      return "Date";
    }
  };
  return (
    <div className="product">
      <div className="favorite">
        <Heart></Heart>
      </div>
      <img className="product-image" alt="product" src={product.url} />

      <div className="product-info">
        <div className="product-info-text">
          <div className="product-title">{`₹ ${product.price}`}</div>
          <div className="product-category">{product.name}</div>
        </div>

        <div className="product-info-utility">
          <div className="location">{isSold()}</div>
          <div className="date">{dateToString(product.createdAt)}</div>
        </div>
      </div>
    </div>
  );
}
