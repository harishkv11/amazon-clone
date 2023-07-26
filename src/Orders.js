import React, { useEffect,useState } from "react";
import "./Orders.css";
import { db } from "./firebaseConfig";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, []);


  return (
    <div className="orders">
      <h1>Yours Orders</h1>

      <div className="orders-order">
        {orders?.map(order => (
            <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
