import { createContext, useState } from "react";

//initialized with default context object
const UserProgressContext = createContext({
    progress: '',
    showCart: () =>{},
    hideCart: () =>{},
    showCheckout: () =>{},
    hideCheckout: () =>{}
});

//function  that provide acces to child components to maintains opening and closing of cart and checkout button 
export function UserProgressContextProvider({children}) {

    const [userProgress,setUserProgress] = useState('');

    function showCart() {
        setUserProgress('cart');
    }
    function hideCart() {
        setUserProgress('');
    }
    function showCheckout() {
        setUserProgress('checkout');
    }
    function hideCheckout() {
        setUserProgress('');
    }
    

    //object for setting current value of userprogress to progress and refference of corresponding functions
    const UserProgressCtx = {
        progress :userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    };

    return (<UserProgressContext.Provider value={UserProgressCtx}>
        {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressContext;