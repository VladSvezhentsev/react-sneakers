import { useContext } from "react";
import AppContext from "../context";

function Info({ title, image, description }) {
   const { setIsOpened } = useContext(AppContext);

   return (
      <div className="cart-empty d-flex align-center justify-center flex-column flex">
         <img className="mb-20" width={120} src={image} alt="" />
         <h2>{title} </h2>
         <p className="opacity-6">{description}</p>
         <button onClick={() => setIsOpened(false)} className="green-btn">
            <img src="/img/arrow.svg" alt="" />
            Повернутись назад
         </button>
      </div>
   );
}

export default Info;
