# Task Management System
This is a simple Task Management System API designed with **Role-Based Access Control (RBAC)**. It allows users to perform CRUD operations on their own tasks, while admins have full CRUD access to all tasks.

Upon aplication startup:
- Three default roles are created: **User**, **Admin**, and **Manager.**
- A default **Admin** account is created using credentials specified in the `.env` file (email, name and password).

Upcoming Features (for Admin)
- [] Create new roles
- [] Attach permissions to roles
- [] Assign roles to users

## Documentation
[POSTMAN Collection Documentation](https://documenter.getpostman.com/view/30328806/2sAYJ1kN8K)
## Setup Instructions
### Prerequisites
Before you start, ensure you hve the following installed:
- Node.js (LTS): [Download Node.js](https://nodejs.org/en/download/package-manager)
- Docker: [Download Docker](https://docs.docker.com/get-started/get-docker/)
- Docker Dekstop (optional) [Download Doker Deksptop](https://www.docker.com/products/docker-desktop/) 

> [!NOTE]
> Ensure to have a database (PostgreSQL, MySQL, etc) setup if you are not using the compose file.

### 1. Clone the Repository
Start by cloning the repository to your local machine:
```bash
git clone https://github.com/Daniel-Ojo-Williams/TMS.git
cd TMS
```

### 2. Setup Environment Variables
Create a `.env` file in the root of the project directory. Use the `.env.sample` as a template. Here's an example:
```ini
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=db_name
DB_PORT=your_db_port
PORT=4xxx
JWT_SECRET=abcxxx*******...
DEFAULT_ADMIN_EMAIL=sample@admin.com
DEFAULT_ADMIN_PASSWORD=******
DEFAULT_ADMIN_NAME="sample admin"
```
Ensure you replace the values with your actual env configurations.
> [!IMPORTANT]
> Notice the `default admin details`, those details need to be provided before starting the app. The App would throw an error and crash if those details are not provided.

### 3. Install Dependencies
Install the required dependencies using your preferred package manager. 
```bash
# Using pnpm
# Install pnpm first if you don't have it
npm install -g pnpm
pnpm install

#using npm
npm install
```

### 4. Build the application
The code is written in TypesScript, so it needs to be transpiled first. Build before running the app:
```bash
# Using your preferred or installed manager
pnpm build # npm build or yarn build as the case may be
```
> [!NOTE]
> Alternatively, if you are using Docker, the build process is handled in the Dockerfile and you can skip this section.

### 5. Run the Application
You can run the application to get started
```bash
pnpm start
```
This will start the application on the port specified in the .env file or default to 3000.
#### Docker
A Dockerfile and docker-compose.yaml file is provided in the root directory, which also includes a postgres db, so you have a ready database connected to the app on a single click.
If you are using Docker and the Docker compose file provided, you can run the app with  the following command:
```bash
doker compose up
```
This will start the application and its related service (postgres db) or you can also make your own updates as you deem fit.