import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:4500/order").then((result) => {
      console.log(result.data.orderList);
      setLoading(false);
      setOrders([...result.data.orderList]);
      console.log("orders", orders);
    });
  }, []);

  const deleteOrder = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:4500/order/${id}/delete`)
      .then(() => {
        setLoading(false);
        setOrders((prevOrder) => prevOrder.filter((order) => order._id != id));
      })
      .catch((err) => {
        console.log("You are getting this err", err);
      });
  };

  return (
    <>
      <h1 className="font-bold text-2xl text-black mb-4">
        Order Management System
      </h1>

      <div>
        {loading && (
          <h1 className="text-lg text-gray-700">Loading orders...</h1>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">SN</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Total Cost</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b bg-white text-gray-900"
                  >
                    <td className="px-4 py-2 font-medium">{index + 1}</td>
                    <td className="px-4 py-2">{order.customerName}</td>
                    <td className="px-4 py-2">
                      <table className="w-full text-xs text-left border">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="px-2 py-1">Name</th>
                            <th className="px-2 py-1">Quantity</th>
                            <th className="px-2 py-1">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item._id} className="bg-gray-50 border-b">
                              <td className="px-2 py-1">{item.itemName}</td>
                              <td className="px-2 py-1">{item.quantity}</td>
                              <td className="px-2 py-1">{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="px-4 py-2 font-semibold">
                      Rs. {order.totalCost}
                    </td>

                    <td className="px-4 py-2 font-semibold">
                      <Link
                        to={`/order/edit/${order._id}`}
                        className="px-4 py-2 bg-blue-700 rounded-xl font-bold mx-1 text-white"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="px-4 py-2 bg-red-700 rounded-xl font-bold mx-1 text-white hover:bg-violet-600 focus:outline-2 focus:outline-offset-2 focus:outline-violet-500 active:bg-violet-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <h1>No order made ...</h1>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
