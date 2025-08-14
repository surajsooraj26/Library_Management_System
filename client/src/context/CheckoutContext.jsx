import { createContext, useContext, useState } from "react";
const CheckoutContext = createContext();

function CheckoutProvider({ children }) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  return (
    <CheckoutContext.Provider value={{ showCheckoutForm, setShowCheckoutForm }}>
      {children}
    </CheckoutContext.Provider>
  );
}

function useCheckout() {
  return useContext(CheckoutContext);
}
export { CheckoutProvider, useCheckout };
