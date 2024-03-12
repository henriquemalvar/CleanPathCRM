import getPool from "@config/database";
import { ICustomer } from "../interfaces/ICustomer";
import { AppError } from "@shared/errors/AppError";

export default class CreateCustomerService {
  public async execute({
    name,
    email,
    phone,
    coordinate_x,
    coordinate_y,
  }: ICustomer): Promise<ICustomer> {
    try {
      let query = "INSERT INTO customers (name, email, phone";
      let values = [name, email, phone];

      if (coordinate_x !== undefined && coordinate_y !== undefined) {
        query += ", coordinate_x, coordinate_y";
        values.push(coordinate_x.toString(), coordinate_y.toString());
      }

      query += ") VALUES ($1, $2, $3";

      if (coordinate_x !== undefined && coordinate_y !== undefined) {
        query += ", $4, $5";
      }

      query += ") RETURNING *";

      const response = await getPool().query(query, values);

      return response.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          throw new AppError("Email already in use", 400);
        }
        throw new AppError("Error creating customer", 500);
      }
      throw new AppError("An unknown error occurred", 500);
    }
  }
}
