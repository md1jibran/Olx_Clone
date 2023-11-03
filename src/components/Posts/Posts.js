import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Heart from "../../assets/Heart";
import { CartState } from "../../Context";
import Product from "../Product/Product";
import "./Post.css";

function Posts() {
  const { AllProducts, setAllProducts, filteredProducts, setFilteredProducts } =
    CartState();
  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="grid-title">Fresh recommendations</div>
        <div className="grid">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col">
                <Link
                  style={{ textDecoration: "none" }}
                  to="/details"
                  state={{ product: product }}
                >
                  <Product product={product} />
                </Link>
              </div>
            ))
          ) : (
            <div className="col">No Product available in database!</div>
          )}
          {/* ; */}
        </div>
      </div>
    </div>
  );
}

export default Posts;
