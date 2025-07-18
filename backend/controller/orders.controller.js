import { Item } from "../model/items.models.js";
import { Order } from "../model/orders.model.js";

export const postAddOrder = async (req, res, next) => {
  try {
    const { customerName, totalCost, items } = req.body;
    if (!customerName || !totalCost || !items) {
      return res.status(400).send({
        message: "Send all required fields: CustomerName, Price, Items",
      });
    }
    const itemsId = [];

    for (const item of items) {
      const { itemName } = item;
      const quantity = Number(item.quantity);
      const price = Number(item.price);

      if (!itemName || quantity < 0 || price < 0) {
        return res.status(400).send({ message: "Items name are not valid" });
      }
      const newItems = new Item({
        itemName,
        quantity,
        price,
      });
      await newItems.save();
      itemsId.push(newItems._id);
    }
    const newOrder = new Order({
      customerName,
      totalCost,
      items: itemsId,
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
  try {
    const { customerName, totalCost, items } = req.body;
    if (!customerName || !totalCost || !items) {
      return res.status(400).send({
        message:
          "Send all required fields to update: CustomerName, Price, Items",
      });
    }
  } catch (error) {}
};
