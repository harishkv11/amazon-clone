import { useEffect } from "react";
import "./App.css";
import "./Header";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from './Orders'

const promise = loadStripe(
  "pk_test_51NY5CjSEH0cMPn5IFSWPcycjDFXsKW93DNnOmw6sWZJ5DNvWGTnK319avsWNRpLr8dihjtN7AGCN7MXggGWzEaVk009pZuP4WY"
);

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <Checkout />
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
};

const LoginPage = () => {
  return <Login />;
};

const PaymentPage = () => {
  return (
    <>
      <Header />
      <Elements stripe={promise}>
        <Payment />
      </Elements>
    </>
  );
};

const OrdersPage = () => {
  return (
    <>
      <Header />
      <Orders />
    </>
  );
};

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("The User is >>>>", authUser);

      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
