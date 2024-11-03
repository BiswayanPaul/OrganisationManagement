# Organisation Dashboard

Welcome to the Organisation Dashboard project! This web application allows users to view, interact with, and manage organizations they are part of. It provides an intuitive interface for displaying organization details, including creation dates, and allows for interaction through clickable cards for viewing and deletion.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- View a list of organizations with their names and creation dates.
- Clickable organization cards for detailed interaction.
- Delete organizations with a simple button click.
- Responsive design for optimal viewing on various devices.

## Technologies Used

- **Frontend:**
  - React
  - Next.js
  - TypeScript
  - Tailwind CSS (for styling)
- **Backend:**
  - Node.js
  - Express
  - Prisma (for database interactions)
- **Database:**
  - PostgreSQL

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/organisation-dashboard.git
   cd organisation-dashboard
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the environment variables:**

   Create a `.env` file in the root directory and add the necessary environment variables. Here's an example structure:

   ```env
   DATABASE_URL=your_database_url
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Your application should now be running at `http://localhost:3000`.

## Usage

After starting the application, navigate to the dashboard to view the list of organizations. You can click on an organization card to log its ID and use the delete button to remove an organization (currently, this action logs the ID to the console).

## API Endpoints

- **GET /api/organisation/get**
  - Retrieves the list of organizations for the user.
- **DELETE /api/organisation/delete/:id**
  - Deletes the specified organization by ID.

## Contributing

Contributions are welcome! Please follow these steps to contribute to this project:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

No License till now.

---

Thank you for checking out the Organisation Dashboard project! For any questions or feedback, feel free to reach out.
