import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = orders.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(orders.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://order-management-system-y958.onrender.com/order")
      .then((result) => {
        setOrders(result.data.orderList || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const deleteOrder = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:4500/order/${id}/delete`)
      .then(() => {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error deleting order:", err);
        setLoading(false);
      });
  };

  const nextPage = () => {
    if (currentPage < nPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const changeCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl text-black mb-4">
        Order Management System
      </h1>

      <div className="flex justify-end mb-4 mr-5">
        <Link
          to={"/order/create"}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 font-semibold shadow-md"
        >
          Create Order
        </Link>
      </div>

      {loading && <p className="text-gray-700 mb-4">Loading orders...</p>}

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
            {records.length > 0 ? (
              records.map((order, index) => (
                <tr key={order._id} className="border-b bg-white text-gray-900">
                  <td className="px-4 py-2 font-medium">
                    {firstIndex + index + 1}
                  </td>
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
                        {order.items.map((item, i) => (
                          <tr key={i} className="bg-gray-50 border-b">
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
                      to={`/order/details/${order._id}`}
                      className="px-4 py-2 bg-green-700 rounded-xl font-bold mx-1 text-white"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/order/edit/${order._id}`}
                      className="px-4 py-2 bg-blue-700 rounded-xl font-bold mx-1 text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="px-4 py-2 bg-red-700 rounded-xl font-bold mx-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center items-center space-x-2 my-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {numbers.map((num, idx) => (
            <button
              key={idx}
              onClick={() => changeCurrentPage(num)}
              className={`px-3 py-1 rounded ${
                currentPage === num
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === nPage}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
