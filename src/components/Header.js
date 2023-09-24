import { Link } from "react-router-dom";
import AppContext from "../context";
import React from "react";

function Header(props) {
  const { getTotalPrice } = React.useContext(AppContext);
  return (
    <header className="d-flex justify-between align-center ">
      <Link to="/react-shop/">
        <div className="d-flex align-center">
          <img width={55} height={50} src="logo.png" alt="" />
          <div>
            <h3 className="text-uppercase">RELAW</h3>
            <p className="opacity-5">Магазин уличной одежды</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={props.onClickCart}>
          <img width={18} height={18} src="cart.svg" alt="" />
          <span>{getTotalPrice()} ₽</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/react-shop/favorites">
            <img width={18} height={18} src="heart.svg" alt="" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="user.svg" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
