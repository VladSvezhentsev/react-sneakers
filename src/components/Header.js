import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

function Header({ onClickCart }) {
   const { cartItems } = useContext(AppContext);
   const totalPrice = cartItems.reduce((sum, obj) => sum + obj.price, 0);

   return (
      <header className="d-flex justify-between align-center p-40">
         <Link to="/">
            <div className="d-flex align=center">
               <img width={40} height={40} src="/img/logo.png" alt="Logo" />
               <div>
                  <h3 className="text-uppercase">React Sneakers</h3>
                  <p className="opacity-5">Магазин найкращих кросівок</p>
               </div>
            </div>
         </Link>
         <ul className="d-flex">
            <li onClick={onClickCart} className="mr-30 cu-p">
               <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
               <span>{totalPrice} грн.</span>
            </li>
            <Link to="/favorites">
               <li className="mr-20 cu-p">
                  <img
                     width={18}
                     height={18}
                     src="/img/heart.svg"
                     alt="favorite"
                  />
               </li>
            </Link>
            <Link to="/orders">
               <li>
                  <img src="/img/user.svg" alt="user" />
               </li>
            </Link>
         </ul>
      </header>
   );
}

export default Header;
