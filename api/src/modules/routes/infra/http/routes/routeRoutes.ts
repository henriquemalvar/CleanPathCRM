import { Router } from "express";
import RouteController from "../controllers/RoutesController";

const routeRoutes = Router();
const routeController = new RouteController();

routeRoutes.get("/calculate", routeController.calculateRoute);

export default routeRoutes;