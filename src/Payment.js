import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebaseConfig";

function Payment() {
    const navigate = useNavigate();
  const [{ user, basket }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
const [succeeded, setSucceeded] = useState(false);
const [processing, setProcessing] = useState("");

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const [clientSecret, setClientSecret] = useState(false);

  useEffect(() => {
    const getClientSecret = async () => {
        const response = await axios({
            method: 'post',
            url: `/payments/create?total=${getBasketTotal(basket)*100}`
        })
        setClientSecret(response.data.clientSecret);
    }

    getClientSecret();
  }, [basket]);

  console.log("The Secret is >>> ", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({paymentIntent}) => {
        
        db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent?.id)
        .set({
          basket: basket,
          createdAt: paymentIntent.created,
          amount: paymentIntent.amount,
        })

        setSucceeded(true);
        setError(null);
        setProcessing(false);
        navigate('/orders')

        dispatch({
            type: 'EMPTY_BASKET'
        })
    })
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>123, React Lane</p>
            <p>City, State</p>
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment-price-container">
                <CurrencyFormat 
                    renderText={(value) => (
                        <h3>Order Total : {value}</h3>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator
                    prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : <p>Buy Now</p>}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
