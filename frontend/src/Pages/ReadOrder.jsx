import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../Components/BackButton";

const ReadOrder = () => {
  const [loading, setLoading] = useState(false);
  const [orderDetail, setOrderDetail] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://order-management-system-y958.onrender.com/order/${id}`)
      .then((result) => {
        console.log(result.data.order);
        setOrderDetail(result.data.order);
      })
      .catch((err) => {
        console.log("You are getting this error", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {orderDetail ? (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Customer Name:{" "}
            <span className="font-medium text-gray-700">
              {orderDetail.customerName}
            </span>
          </h1>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Items:</h2>

          <table className="min-w-full border border-gray-300 text-sm mb-4">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Item Name</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.items.map((element) => (
                <tr
                  key={element._id}
                  className="border-t bg-white text-gray-800"
                >
                  <td className="px-4 py-2 border">{element.itemName}</td>
                  <td className="px-4 py-2 border">{element.quantity}</td>
                  <td className="px-4 py-2 border">Rs. {element.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1 className="text-lg font-semibold text-gray-800 mb-1">
            Total Cost:{" "}
            <span className="text-green-700">Rs. {orderDetail.totalCost}</span>
          </h1>

          <h1 className="text-md text-gray-600">
            Order Date:{" "}
            <span className="text-gray-700">
              {new Date(orderDetail.createdAt).toLocaleDateString()}
            </span>
          </h1>
        </div>
      ) : (
        <h1 className="text-center text-gray-500 text-lg">
          Details not available
        </h1>
      )}

      <div className="flex justify-center mt-6 ">
        <BackButton />
      </div>
    </div>
  );
};

export default ReadOrder;
