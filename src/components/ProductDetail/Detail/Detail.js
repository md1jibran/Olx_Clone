import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductMain } from "../ProductMain/ProductMain";
import { ProductSide } from "../ProductSide/ProductSide";
import { SellerInfo } from "../SellerInfo/SellerInfo";
import { CartState } from "../../../Context";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../config";

export const Detail = (props) => {
  const product = props.product;
  const { user, setUser } = CartState();
  const history = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo"))) {
      setUser(JSON.parse(localStorage.getItem("userInfo")));
    } else {
    }
  }, []);

  const validateResponse = (errored, response) => {
    if (errored) {
      toast.error(
        "Could not update cart. Check that the backend is running, reachable and returns valid JSON.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return false;
    } else if (response.message) {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    }

    return true;
  };

  const postToCart = async (productId) => {
    if (!user) {
      toast.error("Please LogIn to Buy product!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // history("/");
      return;
    }
    let response = {};
    let errored = false;
    let statusCode;
    console.log(user);
    try {
      response = await (
        await fetch(`${baseURL}/api/cart/buy`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
          }),
        })
      ).json();
    } catch (e) {
      errored = true;
    }

    if (validateResponse(errored, response)) {
      toast.success("SuccessFully added to Cart!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      history("/thanks");
    }
  };

  return (
    // <div>
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={styles.productMain}>
        <ProductMain
          imgLink={product.url}
          brand={product.name}
          descText={product.details}
          status="FEATURED"
        />
      </div>
      <div className={styles.productSide}>
        <ProductSide
          price={product.price}
          description={product.details}
          location="Tagore Garden, Delhi, Delhi"
          date="26 Nov"
        />
        <SellerInfo
          profilePic={product.sellerPic}
          name={product.sellerName}
          email={product.seller}
          phone={product.phone}
        />
        <div className={styles.detailButtonContainer}>
          <button
            onClick={(e) => {
              e.preventDefault();
              postToCart(product._id);
            }}
            className={styles.detailButton}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};
