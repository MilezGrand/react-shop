import React from "react";
import Info from "./Info";
import AppContext from "../context";
import axios from "axios";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, items = [], onRemove }) {
  const { cartItems, setCartItems, getTotalPrice } =
    React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://615a0fed601e6f0017e5a3b1.mockapi.io/orders",
        {
          items: cartItems,
        }
      );

      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://615a0fed601e6f0017e5a3b1.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <h2 className="d-flex justify-between ">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="https://milezgrand.github.io/react-shop/btn-remove.svg"
            alt="close"
          />
        </h2>

        <h4 className="opacity-5">{`Товары (${items.length})`}</h4>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id}>
                  <div className="cartItem d-flex align-center  mb-20">
                    <div
                      style={{ backgroundImage: `url(https://milezgrand.github.io/react-shop/${obj.imageUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(obj.id)}
                      className="removeBtn"
                      src="https://milezgrand.github.io/react-shop/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого</span>
                  <div></div>
                  <b>{getTotalPrice()} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
                <img src="https://milezgrand.github.io/react-shop/arrow.svg" alt="" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} передан в доставку`
                : "Добавьте что нибудь"
            }
            image={isOrderCompleted ? "https://milezgrand.github.io/react-shop/complete-order.jpg" : "https://milezgrand.github.io/react-shop/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
