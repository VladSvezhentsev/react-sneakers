import Card from "../components/Card";

function Home({
   items,
   searchValue,
   onChangeSearchInput,
   onAddToFavorites,
   onAddToCart,
   isLoading,
}) {
   const renderItems = () => {
      const filtredItems = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
         <Card
            key={index}
            onFavorite={(obj) => onAddToFavorites(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
         />
      ));
   };

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>
               {searchValue
                  ? `Пошук по запиту: "${searchValue}"`
                  : "Всі кросівки"}
            </h1>
            <div className="search-block d-flex">
               <img src="/img/search.svg" alt="Search" />
               <input
                  onChange={onChangeSearchInput}
                  value={searchValue}
                  placeholder="Пошук..."
               />
            </div>
         </div>
         <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
   );
}

export default Home;
