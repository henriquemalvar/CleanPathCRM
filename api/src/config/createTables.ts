import getPool from "./database";

export const createTables = async () => {
  const pool = getPool();
  const queryCustomers = `
  CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phone VARCHAR(20) NOT NULL,
      coordinate_x INTEGER,
      coordinate_y INTEGER,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

`;

  try {
    await pool.query(queryCustomers);
    console.log("Tables verified/created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw new Error(`Error creating tables: ${error}`);
  }
};
