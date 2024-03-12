import { NextFunction, Request, Response } from "express";
import CreateCustomerService from "@modules/customers/services/CreateCustomerService";
import ListCustomersService from "@modules/customers/services/ListCustomersService";
import UpdateCustomerService from "@modules/customers/services/UpdateCustomerService";
import DeleteCustomerService from "@modules/customers/services/DeleteCustomerService";
import { AppError } from "@shared/errors/AppError";

export class CustomerController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { name, email, phone, coordinate_x, coordinate_y } = request.body;

    if (!name || !email || !phone) {
      return next(new AppError("Missing parameters", 400));
    }

    try {
      const createCustomer = new CreateCustomerService();

      const customer = await createCustomer.execute({
        name,
        email,
        phone,
        coordinate_x,
        coordinate_y,
      });

      return response.status(201).json(customer);
    } catch (error) {
      if (error instanceof Error) {
        return next(new AppError(error.message, 500));
      } else {
        return next(new AppError("An unknown error occurred", 500));
      }
    }
  }

  public async list(
    req: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name, email, phone, coordinate_x, coordinate_y } = req.query;

      const listCustomers = new ListCustomersService();

      const customers = await listCustomers.execute({
        name: typeof name === "string" ? name : undefined,
        email: typeof email === "string" ? email : undefined,
        phone: typeof phone === "string" ? phone : undefined,
        coordinate_x:
          typeof coordinate_x === "string"
            ? parseFloat(coordinate_x)
            : undefined,
        coordinate_y:
          typeof coordinate_y === "string"
            ? parseFloat(coordinate_y)
            : undefined,
      });

      return response.status(200).json(customers);
    } catch (error) {
      if (error instanceof Error) {
        return next(new AppError(error.message, 500));
      } else {
        return next(new AppError("An unknown error occurred", 500));
      }
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { id } = request.params;
    const { name, email, phone, coordinate_x, coordinate_y } = request.body;

    if (!id || !name || !email || !phone) {
      return next(new AppError("Missing parameters", 400));
    }

    try {
      const updateCustomer = new UpdateCustomerService();

      const customer = await updateCustomer.execute({
        id,
        name,
        email,
        phone,
        coordinate_x,
        coordinate_y,
      });

      return response.status(200).json(customer);
    } catch (error) {
      if (error instanceof Error) {
        return next(new AppError(error.message, 500));
      } else {
        return next(new AppError("An unknown error occurred", 500));
      }
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = request.params;

      if (!id) {
        return next(new AppError("No ID provided", 400));
      }

      const deleteCustomer = new DeleteCustomerService();

      await deleteCustomer.execute({ id });

      return response.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return next(new AppError(error.message, 500));
      } else {
        return next(new AppError("An unknown error occurred", 500));
      }
    }
  }
}
