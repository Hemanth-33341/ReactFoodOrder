
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import CartContext from "./Store/CartContext.jsx";
import { useContext } from "react";
import UserProgressContext from "./Store/UserProgressContext";


export default function Header() {

  //cartCxt with the all values(states) of cart that shared using useContext in CartContext.jsx

   const cartCxt = useContext(CartContext);
   const totalItemsinCart = cartCxt.items.reduce((noofItems,item)=>{
      return noofItems + item.quantity;
   },0);

   //UserProgressCntx with the all values(states) of user progress that shared using useContext in UserProgressContext.jsx
  const UserProgressCntx = useContext(UserProgressContext);


   function handleShowCart() {
    UserProgressCntx.showCart();
   }

  return (
    <header id="main-header">
      <div id="title">
    {/* logo image for our app */}
        <img src={logoImg} alt="logo" />
        <h1>Hungry Hunt</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} >Cart ({totalItemsinCart})</Button>
      </nav>
    </header>
  );
}
