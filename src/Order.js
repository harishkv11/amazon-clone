import React from "react";
import "./Order.css";
import moment from "moment/moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <div className="hacky-order-div">
        <div>
          <h2>Order</h2>
          <p>
            {moment.unix(order.data.createdAt).format("MMMM Do YYYY, h:mma")}
          </p>
        </div>
        <p className="order-id">
          <small>{order.id}</small>
        </p>
      </div>

      {order.data.basket.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          rating={item.rating}
          price={item.price}
          hideButton
        />
      ))}

      <CurrencyFormat
        renderText={(value) => <h3 className="order-total">Order Total : {value}</h3>}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator
        prefix={"₹"}
      />
    </div>
  );
}

export default Order;
