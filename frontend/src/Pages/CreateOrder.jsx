import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";
const CreateOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([
    { itemName: "", quantity: "", price: "" },
  ]);
  const navigate = useNavigate();

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const values = [...items];
    values[index][name] = value;
    setItems(values);
  };

  const handleAddFields = () => {
    setItems([...items, { itemName: "", quantity: "", price: "" }]);
  };

  const handleRemoveFields = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const order = {
        customerName,
        items,
      };
      axios
        .post(
          "https://order-management-system-y958.onrender.com/order/postOrder",
          order
        )
        .then(() => {
          console.log("Order Added Successfully");
          navigate("/");
        });
    } catch (error) {
      console.log("You are getting this error", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Create an Order
      </h1>
      <div className="flex justify-end mr-5">
        <BackButton />
      </div>
      <form>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Customer Name:
          </label>
          <input
            type="text"
            name="customerName"
            className="w-full border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800">
          Items
        </h2>
        {items.map((item, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              name="itemName"
              className="border border-gray-300 px-3 py-2 rounded-md text-black"
              placeholder="Item Name"
              value={item.itemName}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="number"
              name="quantity"
              min="1"
              className="border border-gray-300 px-3 py-2 rounded-md text-black"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
            />
            <input
              type="number"
              name="price"
              className="border border-gray-300 px-3 py-2 rounded-md text-black"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
            />

            <div className="col-span-1 md:col-span-3 flex justify-end">
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <button
            type="button"
            onClick={handleAddFields}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add Item
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-700 px-3 py-2 rounded-xl font-bold text-white cursor-pointer"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateOrder;
