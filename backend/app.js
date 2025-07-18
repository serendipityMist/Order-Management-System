import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import orderRouter from "./routes/orders.routes.js";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/order", orderRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The server is running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB Error", err.message);
  });
