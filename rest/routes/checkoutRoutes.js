import { Router } from "express";
import { CheckoutControllers } from "../controllers/checkoutControllers.js";

const checkoutRoutes = Router();

checkoutRoutes.get("/produtos", CheckoutControllers.produtos);

export default checkoutRoutes;