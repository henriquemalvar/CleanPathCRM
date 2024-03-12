# **CleanPathCRM**

CleanPathCRM is an integrated solution for customer management and route optimization. This project comprises a Node.js-powered backend with PostgreSQL for data persistence and a React-based frontend for a dynamic user experience.

## **Getting Started**

Follow these instructions to set up the project on your local machine for development and testing purposes.

### **Prerequisites**

Ensure you have the following installed on your local machine:

- Node.js (v14.x)
- PostgreSQL (v12.x)
- npm (v6.x) or yarn (v1.x)

### **Repository Structure**

The repository is structured as follows:

- **`api/`** - contains the backend code
- **`front/`** - contains the frontend code

## **Installation**

### **Backend Setup**

1. Navigate to the backend directory:

   ```

   cd api

   ```

2. Install the project dependencies:

   ```
   npm install
   # or
   yarn install

   ```

3. Set up your PostgreSQL database and fill in the **`.env`** file with your database credentials (refer to **`.env.example`** for guidance).
4. Start the development server:

   ```
   npm run dev
   # or
   yarn dev

   ```

### **Frontend Setup**

1. Navigate to the frontend directory:

   ```
   cd front

   ```

2. Install the project dependencies:

   ```
   npm install
   # or
   yarn install

   ```

3. Start the development server:

   ```
   npm start
   # or
   yarn start

   ```

## **Usage**

### **Backend API**

Provides routes for customer management and route optimization:

- **`GET /customers`**: Lists all customers.
- **`POST /customers`**: Registers a new customer.
- **`GET /customers/:id`**: Returns data of a specific customer.
- **`PUT /customers/:id`**: Updates data of a specific customer.
- **`DELETE /customers/:id`**: Removes a customer from the system.
- **`GET /routes/calculate`**: Calculates and returns the optimized route for customer visits.

### **Frontend Features**

- Registration of new customers
- Viewing and editing customer details
- Calculation and display of optimized service routes

## **Technologies Used**

- Backend: Node.js, Express, PostgreSQL
- Frontend: React, Material-UI, Axios, React Router DOM, TypeScript
