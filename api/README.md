# CleanPathCRM Backend

CleanPathCRM Backend is a customer management and route optimization solution. It allows efficient administration of customer information and generates optimized routes for customer visits, starting and ending at the company's headquarters.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v18.17)
- PostgreSQL (v12.x)
- npm (v10.4)

### Installation

Follow these steps to set up the development environment:

1. Clone the repository to your local machine:

```
git clone https://github.com/henriquemalvar/cleanpathcrm.git
cd api

```

1. Instale as dependências do projeto:

```
npm install
# ou
yarn install

```

2. Fill in the .env file with the necessary settings (see .env.example for an example).
3. Start the development server:

```
npm run dev
# ou
yarn dev

```

## Usage

The backend API provides the following routes for customer management and route optimization:

### Customers

- `GET /customers`: Lists all customers.
- `POST /customers`: Registers a new customer.
- `GET /customers/:id`: Returns the data of a specific customer.
- `PUT /customers/:id`: Updates the data of a specific customer.
- `DELETE /customers/:id`: Removes a customer from the system.

### Routes

- `GET /routes/calculate`: Calculates and returns the optimized route for customer visits.
