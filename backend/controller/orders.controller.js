import { Order } from "../model/orders.model.js";

export const postAddOrder = async (req, res, next) => {
  try {
    const { customerName, items } = req.body;
    if (!customerName || !items) {
      return res.status(400).send({
        message: "Send all required fields: CustomerName, Price, Items",
      });
    }
    let totalCost = 0;
    let newItems = [];
    for (const item of items) {
      const { itemName } = item;
      const quantity = Number(item.quantity);
      const price = Number(item.price);
      if (!itemName || quantity < 0 || price < 0) {
        return res.status(400).send({ message: "Items name are not valid" });
      }
      totalCost += quantity * price;
      newItems.push({ itemName, quantity, price });
    }
    const newOrder = new Order({
      customerName,
      totalCost,
      items: newItems,
    });
    await newOrder.save();
    return res
      .status(200)
      .send({ message: "Order entered successfully", order: newOrder });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orderList = await Order.find();
    return res.status(200).send({
      message: "Order List Retrieved Successfully",
      orderList,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    return res.status(200).send({
      message: "Order retrieved successfully",
      order,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

export const editOrder = async (req, res, next) => {
  console.log("REQ.BODY:", req.body);
  console.log("REQ.QUERY:", req.query);
  console.log("REQ.PARAMS:", req.params);

  try {
    const { customerName, items } = req.body;
    const { id: orderId } = req.params;
    console.log(orderId);
    let totalCost = 0;
    let updated = [];
    if (!customerName || !items) {
      return res.status(400).json({
        message:
          "Send all required fields to update: customerName, totalCost, items, id",
      });
    }

    for (const item of items) {
      console.log(item);

      const { itemName, quantity, price } = item;

      if (!itemName || quantity < 0 || price < 0) {
        return res.status(400).json({ message: "Invalid item data" });
      }
      totalCost += quantity * price;
      updated.push({ itemName, quantity, price });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        customerName,
        totalCost,
        items: updated,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order and items updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update error:", error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteOrderByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(500).send({
        message: "Order not found",
      });
    }
    console.log(deletedOrder);

    return res.status(200).send({
      message: "Order Deleted Sucessfully",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};
