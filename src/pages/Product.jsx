import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context";
import Card from "../components/Card/Card";

const Product = () => {
  const [product, setProduct] = React.useState([]);
  const [cartProduct, setCartProduct] = React.useState([]);
  const [similarProducts, setSimilarProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const location = useLocation();
  const { onAddToCart, onFavorite } = React.useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetctData() {
      const dataResponse = await axios.get(
        `https://615a0fed601e6f0017e5a3b1.mockapi.io/items?id=${id}`
      );
      setProduct(dataResponse.data[0]);

      const cartResponse = await axios.get(
        `https://615a0fed601e6f0017e5a3b1.mockapi.io/cart?id=${id}`
      );
      setCartProduct(cartResponse.data);

      const similarResponse = await axios.get(
        `https://615a0fed601e6f0017e5a3b1.mockapi.io/items?type=${product.type}`
      );
      setSimilarProducts(similarResponse.data);

      setIsLoading(false);
    }
    fetctData();
  }, [id, onAddToCart]);

  const onBackClick = () => {
    navigate("/react-shop/");
  };

  return (
    <div className="content p-40">
      <button className="backButton" onClick={onBackClick}>
        <img src="https://milezgrand.github.io/react-shop/arrow.svg" alt="back" />
        Назад
      </button>

      {!isLoading && (
        <div className="d-flex productInfo justify-around">
          <div>
            <img src={`https://milezgrand.github.io/react-shop/${product.imageUrl}`} alt="preview" />
          </div>
          <div className="w100p ml-50 d-flex flex-column justify-between">
            <div>
              <h2>{product.title}</h2>
              <h3 className="opacity-8">{`${product.price} руб.`}</h3>
            </div>
            <div>
              <h4 className="opacity-8">Размеры:</h4>
              <ul className="d-flex filter sizeSelect mb-25">
                {product.sizes.map((item, index) => (
                  <Link key={index} to={`?size=${item}`}>
                    <li
                      className={
                        location.search === `?size=${item}` ? "selected" : ""
                      }
                    >
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
              <div className="d-flex">
                <button
                  className="greenButton"
                  onClick={() => onAddToCart(product)}
                >
                  {cartProduct.length
                    ? "Добавить в корзину"
                    : "Убрать из корзины"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h2>Похожие товары:</h2>
      <div className="d-flex flex-wrap products justify-between">
        {(isLoading ? [...Array(8)] : similarProducts).map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
