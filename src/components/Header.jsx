import { Link } from "react-router-dom";
import AppContext from "../context";
import React from "react";
// import Logo from '../../public/logo.png'

function Header(props) {
  const { getTotalPrice } = React.useContext(AppContext);
  return (
    <header className="d-flex justify-between align-center ">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={55} height={50} src="/logo.png" alt="RELAW" />
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={props.onClickCart}>
          <img width={18} height={18} src="/cart.svg" alt="cart" />
          <span>{getTotalPrice()} ₽</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/heart.svg" alt="like" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src="/user.svg" alt="profile" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
