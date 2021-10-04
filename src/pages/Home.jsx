import React from 'react';
import Card from '../components/Card/Card';


function Home ({  items, searchValue, setSearchValue, onChancheSearchInput, onAddToCart, onFavorite, isLoading}) {
    
   
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
          ))
    }
    
    return(
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>

          <div className="search-block d-flex">
            <img src="/img/search.svg" alt=""/>
            {searchValue && <img onClick={() => setSearchValue('')}className="clear cu-p" src="/img/btn-remove.svg" alt=""/>}
            <input onChange={onChancheSearchInput} value={searchValue} placeholder="Поиск..." />
          </div>
        </div>
        
        <div className="d-flex flex-wrap">{renderItems()}</div>

      </div>
    )
}
export default Home;