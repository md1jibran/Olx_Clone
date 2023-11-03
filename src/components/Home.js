import React, { useEffect } from "react";
import { CartState } from "../Context";
import Banner from "./Banner/Banner";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Posts from "./Posts/Posts";
import { baseURL } from "./config";

const Home = () => {
  const {
    user,
    setUser,
    AllProducts,
    setAllProducts,
    filteredProducts,
    setFilteredProducts,
  } = CartState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const performAPICall = async () => {
    try {
      var response = await (await fetch(`${baseURL}/api/product`)).json();
    } catch (e) {
      // errored = true;
    }

    return response;
  };

  const getProducts = async () => {
    const response = await performAPICall();
    console.log(response);
    if (response) {
      setAllProducts(response);
    }
  };

  useEffect(() => {
    getProducts();
  }, [user]);

  useEffect(() => {
    setFilteredProducts(AllProducts);
  }, [AllProducts]);

  return (
    <div className="homeParent">
      <Header />
      <Banner />
      <Posts />
      <Footer />
    </div>
  );
};

export default Home;
