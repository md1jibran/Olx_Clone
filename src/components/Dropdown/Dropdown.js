import * as React from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../../assets/Arrow";
import { CartState } from "../../Context";
import "./Dropdown.css";

const Dropdown = (props) => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser } = CartState();
  const history = useNavigate();
  const handleOpen = () => {
    setOpen(!open);
  };
  console.log(props.user);

  return (
    <div className="dropdown">
      <div className="dropdown-profile" onClick={handleOpen}>
        <img className="dropdown-img" src={props.user.pic} />
        <Arrow />
      </div>
      {open ? (
        <ul className="menu">
          <li className="menu-item">
            <button
              onClick={() => {
                history("buy");
              }}
            >
              Bought Items
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                history("sell");
              }}
            >
              Sold Items
            </button>
          </li>
          <li className="menu-item">
            <button
              onClick={() => {
                localStorage.removeItem("userInfo");
                setUser(null);
                history("/");
              }}
            >
              logout
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default Dropdown;
