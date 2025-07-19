import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import CreateOrder from "./Pages/CreateOrder.jsx";
import ReadOrder from "./Pages/ReadOrder.jsx";
import UpdateOrder from "./Pages/UpdateOrder.jsx";
import DeleteOrder from "./Pages/DeleteOrder.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/order/create" element={<CreateOrder />} />
      <Route path="/order/details/:id" element={<ReadOrder />} />
      <Route path="/order/edit/:id" element={<UpdateOrder />} />
      <Route path="/order/delete/:id" element={<DeleteOrder />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <App />
  </StrictMode>
);
