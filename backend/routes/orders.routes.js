import { Router } from "express";
import {
  deleteOrderByID,
  editOrder,
  getOrder,
  getOrderDetails,
  postAddOrder,
} from "../controller/orders.controller.js";

const orderRouter = Router();

orderRouter.get("/", getOrder);
orderRouter.post("/postOrder", postAddOrder);
orderRouter.get("/:id", getOrderDetails);
orderRouter.put("/:id/edit", editOrder);
orderRouter.delete("/:id/delete", deleteOrderByID);

export default orderRouter;
