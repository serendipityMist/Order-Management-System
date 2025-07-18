import React, { useState } from "react";

const OrderForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ itemName: "", quantity: 1, price: 0 }]);

  // Add new item
  const addItem = () => {
    setItems([...items, { itemName: "", quantity: 1, price: 0 }]);
  };

  // Remove item by index
  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // Handle changes in item fields
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "itemName" ? value : Number(value);
    setItems(updated);
  };

  // Calculate total cost
  const totalCost = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      customerName,
      totalCost,
      items,
    };

    // 🔁 Replace with axios.post('/api/orders', order) if needed
    console.log("Submitting order:", order);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <hr />
        <h3>Items</h3>
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Item Name"
              value={item.itemName}
              onChange={(e) =>
                handleItemChange(index, "itemName", e.target.value)
              }
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              min="0"
              required
            />
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(index)}>
                ❌ Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addItem}>
          ➕ Add Item
        </button>

        <h3>Total Cost: Rs. {totalCost}</h3>

        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
