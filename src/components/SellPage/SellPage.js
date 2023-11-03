import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartState } from "../../Context";
import Footer from "../Footer/Footer";
import Product from "../Product/Product";
import { baseURL } from "../config";
import "./SellPage.css";

const SellPage = () => {
  const { sellItems, setSellItems, user, setUser } = CartState();
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setUser(JSON.parse(localStorage.getItem("userInfo")));
    } else {
      history("/login");
    }
  }, []);

  const performAPICall = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      var response = await (await fetch(`${baseURL}/api/cart/sold`, config)).json();
    } catch (e) {
      // errored = true;
    }

    return response;
  };

  const getProducts = async () => {
    const response = await performAPICall();
    console.log(response);
    if (response) {
      setSellItems(response);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    console.log(user);
  }, []);

  useEffect(() => {
    getProducts();
  }, [user]);
  return (
    <div className="sell-container">
      <div className="sell-header"></div>
      <div className="sell-grid-container">
        <div className="sell-title">Items Buy By {user ? user.name : ""}</div>
        <div className="grid sell-grid">
          {sellItems.length ? (
            sellItems.map((product) => (
              <div className="col" onClick={() => {}}>
                <Product product={product} sell={true} />
              </div>
            ))
          ) : (
            <div className="Sell-grid-noItem">
              No Product available in database!
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellPage;
