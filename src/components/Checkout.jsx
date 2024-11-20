import { useContext } from "react";
import CartContext from "./Store/CartContext.jsx";
import { Modal } from "./UI/Modal.jsx";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "./Store/UserProgressContext.jsx";
import useHttp from "./Hooks/useHttp.js";
import Error from "./Error.jsx";

//configuring config for post request
const requestConfig ={
  method: 'POST',
  headers : {
    'Content-Type':'application/json'
  }
};

export default function Checkout() {
  const CartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

 const{data, isLoading : isSending, error,sendRequest} = useHttp('http://localhost:3000/orders',requestConfig)

  const cartTotal = CartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  //function for closing checkout page ;
  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }


  //function for submiting the form in checkout page ;
  function handleSubmit(event) {
    event.preventDefault();
    //getting value in the  input field of form
    //creating new formdata object for getting values entred in form
    const formdata = new FormData (event.target);
    //converts formdata object to javascript object customerData
    const CustomerData = Object.fromEntries(formdata.entries());


    //Sending  data to post customer data along with order data

    sendRequest(JSON.stringify({
      order: {
          items : CartCtx.items,
          customer : CustomerData,
      },
  })
  );
}

let actions = (
  <>
  <Button type="button" textOnly={true} onClick={handleCloseCheckout}>
            Close
          </Button>
          <Button>Submit Order</Button>
  </>
);

//loading message
if(isSending) {
  actions = <span>Sending Order Data...</span>
}

//modal on successfully posting the order & customer data
if(data && !error){
  return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
    <h2>Success!</h2>
    <p>Your Order Was Submitted Successfully.</p>
    <p className="modal-actions">
      <Button onClick ={handleCloseCheckout}>Okay</Button>
    </p>
  </Modal>
}

//submission form with customer details
  return (
    <Modal open={userProgressCtx.progress === 'checkout'}  onClose={handleCloseCheckout}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Pin Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed To Submit Order" message={error} />}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}
