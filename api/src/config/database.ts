import { Pool, PoolConfig } from "pg";
import dotenv from "dotenv";

dotenv.config();

let pool: Pool;

export default function getPool() {
  if (!pool) {
    const config: PoolConfig = {
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT || "5432", 10),
    };

    pool = new Pool(config);

    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }

  return pool;
}
