import { Router } from "express";
import customerRoutes from "@modules/customers/infra/http/routes/customerRoutes";
import routeRoutes from "@modules/routes/infra/http/routes/routeRoutes";

const routes = Router();

routes.use("/customers", customerRoutes);
routes.use("/routes", routeRoutes);

export default routes;
