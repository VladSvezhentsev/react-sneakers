import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import AppContext from "../context";
const Url = "https://618aa2c234b4f400177c47e2.mockapi.io";

function Orders() {
   const { onAddToCart } = useContext(AppContext);
   const [orders, setOrders] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get(`${Url}/orders`);
            setOrders(data.map((obj) => obj.items).flat());
            setIsLoading(false);
         } catch (error) {
            alert("Помилка при запиті заказу");
         }
      })();
   }, []);

   return (
      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1>Мої замовлення</h1>
         </div>
         <div className="d-flex sneakers">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
               <Card key={index} loading={isLoading} {...item} />
            ))}
         </div>
      </div>
   );
}

export default Orders;
