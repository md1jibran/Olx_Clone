import React from "react";
import { Link } from "react-router-dom";
import "./Thanks.css";

const Thanks = () => {
  return (
    <>
      <div className="thanks-parent-container">
        <div className="thanks-container">
          <h1 style={{ fontWeight: "600" }}>It's ordered!</h1>

          <div className="thanks-line green-text-thanks-line">
            Seller of Product Will Contact You Shortly!
          </div>

          <Link to="/" className="thanks-line">
            <button className="thanks-button">Browse for more products</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Thanks;
