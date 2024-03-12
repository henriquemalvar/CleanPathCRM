import getPool from "@config/database";
import { ICustomer } from "../interfaces/ICustomer";
import { AppError } from "@shared/errors/AppError";

export default class ListCustomersService {
  public async execute({
    name,
    email,
    phone,
    coordinate_x,
    coordinate_y,
  }: Partial<ICustomer>): Promise<ICustomer[]> {
    try {
      let query = "SELECT * FROM customers WHERE 1 = 1";
      let values = [];

      if (name) {
        query += ` AND name LIKE $${values.length + 1}`;
        values.push(`%${name}%`);
      }

      if (email) {
        query += ` AND email LIKE $${values.length + 1}`;
        values.push(`%${email}%`);
      }

      if (phone) {
        query += ` AND phone LIKE $${values.length + 1}`;
        values.push(`%${phone}%`);
      }

      if (coordinate_x !== undefined) {
        query += ` AND coordinate_x = $${values.length + 1}`;
        values.push(coordinate_x);
      }

      if (coordinate_y !== undefined) {
        query += ` AND coordinate_y = $${values.length + 1}`;
        values.push(coordinate_y);
      }

      const response = await getPool().query(query, values);
      return response.rows;
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError("Error listing customers", 500);
      }
      throw new AppError("An unknown error occurred", 500);
    }
  }
}