import React from "react";
import ContentLoader from "react-content-loader";
import s from "./Card.module.scss";
import AppContext from "../../context";
import { Link } from "react-router-dom";

function Card({
  id,
  title,
  imageUrl,
  price,
  onFavorite,
  onPlus,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const { favorited } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  React.useEffect(() => {
    const foundItem = favorited.find((item) => item.id === id);
    if (foundItem) {
      setIsFavorite(true);
    }
  }, [favorited, id]);

  return (
    <div className={s.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={165}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={s.favorite} onClick={onClickFavorite}>
            <img src={isFavorite ? "liked.svg" : "unliked.svg"} alt="" />
          </div>
          <Link to={`/product/${id}?size=M`}>
            <img width="100%" height={235} src={'/'+ imageUrl} alt="" />
          </Link>
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              className={s.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/btn-checked.svg" : "/btn-plus.svg"}
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
