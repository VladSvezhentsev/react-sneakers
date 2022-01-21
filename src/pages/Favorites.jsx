import { useContext } from "react";
import AppContext from "../context";
import Card from "../components/Card";

function Favorites() {
   const { favorites, onAddToFavorites } = useContext(AppContext);

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мої закладки</h1>
         </div>
         <div className="d-flex sneakers">
            {favorites.map((item, index) => (
               <Card
                  key={index}
                  onFavorite={onAddToFavorites}
                  favorited
                  {...item}
               />
            ))}
         </div>
      </div>
   );
}

export default Favorites;
