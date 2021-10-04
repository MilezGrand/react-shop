import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorited, setFavorited] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetctData() {
      const cartResponse = await axios.get("https://615a0fed601e6f0017e5a3b1.mockapi.io/cart");
      const favoritesResponse = await axios.get("https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites");
      const itemsResponse = await axios.get("https://615a0fed601e6f0017e5a3b1.mockapi.io/items");
      
      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorited(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetctData();
  }, [])
  
  const onAddToCart = (obj) => {
    try {
      if (cartItems.find(item => Number(item.id) == Number(obj.id))) {
        axios.delete(`/cart/${obj.id}`);
        setCartItems(prev => prev.filter(item => item.id != obj.id));
        
      } else {
        axios.post("https://615a0fed601e6f0017e5a3b1.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
      
    } catch (error) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://615a0fed601e6f0017e5a3b1.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id != id));
  }

  const onFavorite = async (obj) => {
    try {
      if (favorited.find(favObj => Number(favObj.id) == Number(obj.id))) {
        axios.delete(`https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites/${obj.id}`);
        setFavorited((prev) => prev.filter((item) => Number(item.id) != Number(obj.id)));
      } else {
        const { data } = await axios.post('https://615a0fed601e6f0017e5a3b1.mockapi.io/favorites', obj);
        setFavorited((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChancheSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) == Number(id));
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorited, isItemAdded, onFavorite, setCartOpened, setCartItems}}>
      <div className="wrapper clear">
        {cartOpened ? <Drawer items = {cartItems} onClose={()=> setCartOpened(false)} onRemove={onRemoveItem}/> : null}
        
        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home 
            items={items} 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            onChancheSearchInput={onChancheSearchInput}
            onAddToCart={onAddToCart}
            onFavorite={onFavorite}
            cartItems={cartItems}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        
      </div>
    </AppContext.Provider>
    
  );
}

export default App;