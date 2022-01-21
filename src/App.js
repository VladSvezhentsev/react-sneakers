import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppContext from "./context";
import axios from "axios";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
const Url = "https://618aa2c234b4f400177c47e2.mockapi.io";

function App() {
   const [items, setItems] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const [favorites, setFavorites] = useState([]);
   const [searchValue, setSearchValue] = useState("");
   const [isOpened, setIsOpened] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      async function fetchData() {
         const cartResponse = await axios.get(`${Url}/cart`);
         const favoritesResponse = await axios.get(`${Url}/favorites`);
         const itemsResponse = await axios.get(`${Url}/items`);

         setIsLoading(false);
         setCartItems(cartResponse.data);
         setFavorites(favoritesResponse.data);
         setItems(itemsResponse.data);
      }

      fetchData();
   }, []);

   const onAddToCart = (obj) => {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
         axios.delete(`${Url}/cart/${obj.id}`);
         setCartItems((prev) =>
            prev.filter((item) => Number(item.id) !== Number(obj.id))
         );
      } else {
         axios.post(`${Url}/cart`, obj);
         setCartItems((prev) => [...prev, obj]);
      }
   };

   const onRemoveItem = (id) => {
      axios.delete(`${Url}/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
   };

   const onAddToFavorites = async (obj) => {
      try {
         if (favorites.find((favObj) => favObj.id === obj.id)) {
            axios.delete(`${Url}/favorites/${obj.id}`);
            setFavorites((prev) =>
               prev.filter((item) => Number(item.id) !== Number(obj.id))
            );
         } else {
            const { data } = await axios.post(`${Url}/favorites`, obj);
            setFavorites((prev) => [...prev, data]);
         }
      } catch (error) {
         alert("Не вдалось добавити в закладки");
      }
   };

   const onChangeSearchInput = (e) => setSearchValue(e.target.value);

   const isItemAdded = (id) =>
      cartItems.some((obj) => Number(obj.id) === Number(id));

   return (
      <AppContext.Provider
         value={{
            items,
            cartItems,
            favorites,
            isItemAdded,
            onAddToFavorites,
            onAddToCart,
            setIsOpened,
            setCartItems,
         }}
      >
         <div className="wrapper clear">
            {isOpened && (
               <Drawer
                  items={cartItems}
                  onClose={() => setIsOpened(false)}
                  onRemove={onRemoveItem}
               />
            )}
            <Header onClickCart={() => setIsOpened(true)} />
            <Routes>
               <Route
                  path="/"
                  element={
                     <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorites={onAddToFavorites}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                     />
                  }
               />
               <Route path="/favorites" element={<Favorites />} />
               <Route path="/orders" element={<Orders />} />
            </Routes>
         </div>
      </AppContext.Provider>
   );
}

export default App;
