import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";
import Footer from "./components/Footer";
import Product from "./pages/Product";


const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorited, setFavorited] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [type, setType] = React.useState("Все товары");
  const location = useLocation();

  React.useEffect(() => {
    async function fetctData() {
      setIsLoading(true);
      const cartResponse = await axios.get(
        `https://615a0fed601e6f0017e5a3b1.mockapi.io/cart`
      );
      const favoritesResponse = await axios.get(
        "https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        `https://615a0fed601e6f0017e5a3b1.mockapi.io/items/${location.search}`
      );

      setIsLoading(false);
      setCartItems(cartResponse.data)
      setFavorited(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    if (location.search === "?type=hoodie") {
      setType("Толстовки");
    } else if (location.search === "?type=tshirt") {
      setType("Футболки");
    } else if (location.search === "?type=sneakers") {
      setType("Штаны");
    } else if (location.search === "") {
      setType("Все товары");
    }

    fetctData();
  }, [location, type]);

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        const { data } = await axios.get(
          `https://615a0fed601e6f0017e5a3b1.mockapi.io/cart?id=${obj.id}`
        );
        axios.delete(
          `https://615a0fed601e6f0017e5a3b1.mockapi.io/cart/${data[0]._id}`
        );
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        axios.post("https://615a0fed601e6f0017e5a3b1.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в корзину");
    }
  };

  const onRemoveItem = async (id) => {
    const { data } = await axios.get(
      `https://615a0fed601e6f0017e5a3b1.mockapi.io/cart?id=${id}`
    );
    axios.delete(
      `https://615a0fed601e6f0017e5a3b1.mockapi.io/cart/${data[0]._id}`
    );
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavorite = async (obj) => {
    try {
      if (favorited.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        const { data } = await axios.get(
          `https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites?id=${obj.id}`
        );

        axios.delete(
          `https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites/${data[0]._id}`
        );
        setFavorited((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites",
          obj
        );
        setFavorited((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в избранное");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const getTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorited,
        isItemAdded,
        onFavorite,
        setCartOpened,
        setCartItems,
        getTotalPrice,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        {cartOpened ? (
          <Drawer
            items={cartItems}
            onClose={() => {
              setCartOpened(false);
              document.body.style.overflow = "visible";
            }}
            onRemove={onRemoveItem}
          />
        ) : null}

        <Header
          onClickCart={() => {
            setCartOpened(true);
            document.body.style.overflow = "hidden";
          }}
        />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onFavorite={onFavorite}
                cartItems={cartItems}
                isLoading={isLoading}
                type={type}
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>

        <Footer />
      </div>
    </AppContext.Provider>
  );
};

export default App;
