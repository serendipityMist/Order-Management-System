import { Router } from "express";
import {
  getOrder,
  getOrderDetails,
  postAddOrder,
} from "../controller/orders.controller.js";

const orderRouter = Router();

orderRouter.get("/", getOrder);
orderRouter.post("/postOrder", postAddOrder);
orderRouter.get("/:id", getOrderDetails);

export default orderRouter;
