import { useContext } from "react";
import { Modal } from "./UI/Modal.jsx";
import CartContext from "./Store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "./Store/UserProgressContext.jsx";
import CartItem from "./CardItem.jsx";


export default function Cart() {

  const CartCtx = useContext(CartContext);

  const UserProgressCtx = useContext(UserProgressContext);

  //Caculating the toatal price og the ordered food
  const cartTotal = CartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);


  //function for clse button in the cart page
  function handleCloseCart() {
    UserProgressCtx.hideCart();
  }

  //function for Go To Checkout button
  function handleOpenCheckout() {
    UserProgressCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={UserProgressCtx.progress === "cart"} onClose={UserProgressCtx.progress === "cart"? handleCloseCart :null}>
      <h2>Your Cart</h2>
      <ul>
        {CartCtx.items.map((item) => (
          <CartItem  
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          onIncrease={()=>CartCtx.addItem(item)}
          onDecrease={()=>CartCtx.removeItem(item.id)}/>
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <Button textOnly={true} onClick={handleCloseCart}>Close</Button>
      {CartCtx.items.length > 0 && <Button onClick={handleOpenCheckout} >Go To Checkout</Button>}
    </Modal>
  );
}
