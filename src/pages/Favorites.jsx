import React from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

function Favorites() {
  const { favorited, onFavorite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>
      </div>
      <div className="d-flex flex-wrap products justify-between">
        {favorited.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
export default Favorites;
