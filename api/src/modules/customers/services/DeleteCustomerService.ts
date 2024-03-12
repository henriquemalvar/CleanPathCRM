import getPool from "@config/database";
import { AppError } from "@shared/errors/AppError";

export default class DeleteCustomerService {
  public async execute({ id }: { id: string }): Promise<void> {
    try {
      await getPool().query("DELETE FROM customers WHERE id = $1", [id]);
    } catch (error) {
      if (error instanceof Error) {
        throw new AppError("Error deleting customer", 500);
      }
      throw new AppError("An unknown error occurred", 500);
    }
  }
}