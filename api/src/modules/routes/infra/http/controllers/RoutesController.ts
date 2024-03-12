import { Request, Response, NextFunction } from "express";
import CalculateRouteService from "../../../services/CalculateRoutesService";
import { AppError } from "@shared/errors/AppError";

export default class RouteController {
  public async calculateRoute(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const calculateRouteService = new CalculateRouteService();

    try {
      const route = await calculateRouteService.execute();
      return response.status(200).json(route);
    } catch (error) {
      if (error instanceof Error) {
        return next(new AppError(error.message, 400));
      }
      return next(new AppError("An unknown error occurred", 500));
    }
  }
}
