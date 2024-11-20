
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import { CartContextProvider } from "./components/Store/CartContext.jsx";
import { UserProgressContextProvider } from "./components/Store/UserProgressContext.jsx";

function App() {
  return (
   <UserProgressContextProvider>
    <CartContextProvider>
    <Header />
     <Meals/>
     <Cart/>
     <Checkout/>
    </CartContextProvider>
   </UserProgressContextProvider>
  );
}

export default App;
