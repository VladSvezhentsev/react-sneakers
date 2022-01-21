import { useState, useContext } from "react";

import AppContext from "../context";
import axios from "axios";

import Info from "./Info";

const Url = "https://618aa2c234b4f400177c47e2.mockapi.io";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
   const { cartItems, setCartItems } = useContext(AppContext);
   const [isOrderComplete, setIsOrderComplete] = useState(false);
   const [orderId, setOrderId] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

   const onClickOrder = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post(`${Url}/orders`, {
            items: cartItems,
         });
         setOrderId(data.id);
         setIsOrderComplete(true);
         setCartItems([]);

         for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete(`${Url}/cart` + item.id);
            await delay(1000);
         }
      } catch (error) {
         alert("Помилка при створенні замовлення");
         console.log(error);
      }
      setIsLoading(false);
   };

   return (
      <div className="overlay">
         <div className="drawer">
            <h2 onClick={onClose} className="d-flex justify-between mb-20">
               Корзина
               <img className="cu-p" src="/img/btn-remove.svg" alt="remove" />
            </h2>
            {items.length ? (
               <div className="d-flex flex-column flex">
                  <div className="items">
                     {items.map((item) => (
                        <div
                           key={item.id}
                           className="cart-item d-flex align=center mb-20"
                        >
                           <img
                              className="mr-20"
                              width={70}
                              height={70}
                              src={item.imageUrl}
                              alt="sneakers"
                           />
                           <div className="mr-20">
                              <p className="mb-5">{item.title}</p>
                              <b>{item.price} грн.</b>
                           </div>
                           <img
                              onClick={() => onRemove(item.id)}
                              className="remove-btn"
                              src="/img/btn-remove.svg"
                              alt="remove"
                           />
                        </div>
                     ))}
                  </div>
                  <div className="cartTotalBlock">
                     <ul>
                        <li>
                           <span>Всього:</span>
                           <div></div>
                           <b>{totalPrice} грн.</b>
                        </li>
                        <li>
                           <span>Податок 5%:</span>
                           <div></div>
                           <b>{Math.round((totalPrice / 100) * 5)} грн. </b>
                        </li>
                     </ul>
                     <button
                        disabled={isLoading}
                        onClick={onClickOrder}
                        className="green-btn"
                     >
                        Оформити замовлення <img src="/img/arrow.svg" alt="" />
                     </button>
                  </div>
               </div>
            ) : (
               <Info
                  title={
                     isOrderComplete
                        ? "Замовлення оформлено!"
                        : "Корзина порожня"
                  }
                  image={
                     isOrderComplete
                        ? "/img/complete-order.jpg"
                        : "/img/empty-cart.jpg"
                  }
                  description={
                     isOrderComplete
                        ? `Ваше замовлення №${orderId} скоро буде передане кур'єрській доставці`
                        : "Добавте хоча б одну пару кросівок, щоб зробити замовлення"
                  }
               />
            )}
         </div>
      </div>
   );
}

export default Drawer;
