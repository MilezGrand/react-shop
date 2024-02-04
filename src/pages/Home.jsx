import React from "react";
import Card from "../components/Card/Card";
import { Link, useLocation } from "react-router-dom";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onFavorite,
  isLoading,
}) {
  const location = useLocation();

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex justify-between mb-40 search_container">
        <ul className="d-flex filter">
          <li className={location.search === "" ? "selected" : ""}>
            <Link to="/=">Все товары</Link>
          </li>
          <li className={location.search === "?type=hoodie" ? "selected" : ""}>
            <Link to="?type=hoodie">Толстовки</Link>
          </li>
          <li className={location.search === "?type=tshirt" ? "selected" : ""}>
            <Link to="?type=tshirt">Футболки</Link>
          </li>
          <li
            className={location.search === "?type=sneakers" ? "selected" : ""}
          >
            <Link to="?type=sneakers">Штаны</Link>
          </li>
        </ul>

        <div className="search-block d-flex ">
          <img src="./search.svg" alt="" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="./btn-remove.svg"
              alt=""
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap products justify-between">
        {renderItems()}
      </div>
    </div>
  );
}
export default Home;
