import React, { useEffect, useState } from "react";
import { FileInput } from "./FileInput";
import styles from "./Form.module.css";
import { TbCameraPlus } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";
import { TextInput } from "./TextInput";
import { useNavigate } from "react-router-dom";
import { CartState } from "../../Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../config";

export const Form = () => {
  const [image, setImage] = React.useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [pic, setPic] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState();

  const history = useNavigate();

  const { user, setUser, AllProducts, setAllProducts } = CartState();
  console.log(pic);
  const postDetails = (pics) => {
    if (pics === undefined) {
      // PopUp
      toast.error("Image required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "jf9gdinj");
      data.append("cloud_name", "ddqnomvbu");
      fetch("https://api.cloudinary.com/v1_1/ddqnomvbu/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        });
    } else {
      console.log("PopUp assign");
      toast.error("Please upload jpeg or png image!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };

  const submitHandler = async () => {
    console.log("fahsdffdfg");
    const dxt1 = {
      name: name,
      category: category,
      price: price,
      url: pic,
      phone: phone,
      details: details,
    };
    console.log(dxt1);
    if (!name || !category || !price || !pic) {
      // PopUp
      toast.error("name, category, price, pic required!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    const dxt = {
      name: name,
      category: category,
      price: price,
      url: pic,
      phone: phone,
      details: details,
    };

    console.log(dxt);

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dxt),
    };
    try {
      const fetchResponse = await fetch(`${baseURL}/api/product/`, settings);
      const data = await fetchResponse.json();
      // PopUp
      toast.success("products imported successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(data);
      setAllProducts(data);
      history("/");
    } catch (error) {
      // PopUp
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);
  return (
    <div className={styles.mainFormContainer}>
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
      <p className={styles.CreateFormheading}>POST YOUR AD</p>
      <div className={styles.Formcontainer}>
        <div className={styles.FormsubHeading}>INCLUDE SOME DETAILS</div>
        <TextInput
          title="Name*"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          title="Category*"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextInput
          title="Price*"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextInput
          title="Phone No*"
          type="number"
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className={styles.Formtitle}>Details</div>
        <textarea
          className={styles.FormtextArea}
          onChange={(e) => setDetails(e.target.value)}
        />
        {pic !== "" ? (
          <div className={styles.FormimageContainer}>
            <div className={styles.title}>Uploaded Photo</div>
            <img
              className={styles.FormproductPic}
              src={pic}
              alt="product pic"
            />
            <RxCrossCircled
              onClick={() => setPic("")}
              size={20}
              className={styles.FormcrossIcon}
            />
          </div>
        ) : (
          <FileInput
            onChange={postDetails}
            displayComponent={
              <TbCameraPlus
                color="red"
                size={50}
                className={styles.FormcameraIcon}
              />
            }
          />
        )}

        <button className={styles.Formbutton} onClick={submitHandler}>
          POST NOW
        </button>
      </div>
    </div>
  );
};
