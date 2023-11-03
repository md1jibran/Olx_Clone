import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import BuyPage from "./components/BuyPage/BuyPage";
import SellPage from "./components/SellPage/SellPage";
import CreateForm from "./components/CreateForm/CreateForm";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Thanks from "./components/Thanks/Thanks";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/buy" element={<BuyPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/form" element={<CreateForm />} />
          <Route path="/details" element={<ProductDetail />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
