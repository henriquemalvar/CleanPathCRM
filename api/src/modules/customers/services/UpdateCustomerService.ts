import getPool from "@config/database";
import { ICustomer } from "../interfaces/ICustomer";
import { AppError } from "@shared/errors/AppError";

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
    phone,
    coordinate_x,
    coordinate_y,
  }: ICustomer): Promise<ICustomer> {
    try {
      let query = "UPDATE customers SET name = $1, email = $2, phone = $3";
      let values = [name, email, phone];

      if (coordinate_x !== undefined && coordinate_y !== undefined) {
        query += ", coordinate_x = $4, coordinate_y = $5";
        values.push(coordinate_x.toString(), coordinate_y.toString());
      }

      query += " WHERE id = $6 RETURNING *";
      values.push(id!);

      const response = await getPool().query(query, values);

      return response.rows[0];
    } catch (error) {
      console.log("🚀 ~ UpdateCustomerService ~ error:", error)
      if (error instanceof Error) {
        if (
          error.message.includes(
            "duplicate key value violates unique constraint"
          )
        ) {
          throw new AppError("Email already in use", 400);
        }
        throw new AppError("Error updating customer", 500);
      }
      throw new AppError("An unknown error occurred", 500);
    }
  }
}