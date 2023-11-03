import React from "react";
import Footer from "../Footer/Footer";
import { Form } from "./Form";
import "./CreateForm.css";
const CreateForm = () => {
  return (
    <div className="createform-container">
      <Form />
      <Footer />
    </div>
  );
};

export default CreateForm;
