# Fishing Idle Game

Welcome to the Fishing Idle Game! This is a fun and relaxing idle game where you can fish, earn money, upgrade your fishing rod, and interact with other fishermen bots. The game now includes a server-side component with MySQL integration for user authentication and game state persistence.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [Usage](#usage)
- [Gameplay](#gameplay)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Idle Fishing**: Automatically fish over time and catch various types of fish.
- **Upgrades**: Upgrade your fishing rod to increase your catch rate and catch more valuable fish.
- **Interactive Bots**: Chat and interact with friendly and competitive bot fishermen.
- **Real-time Logging**: Log fishing activities and track your progress.
- **User Authentication**: Register and log in to the game using a secure authentication system.
- **Game State Persistence**: Your game progress is saved and can be resumed across sessions.
- **MySQL Integration**: Game data is stored in a MySQL database for efficient data management.

## Installation

### Server Setup

1. **Create a MySQL database for the game**:
    - Open your MySQL client or command-line interface.
    - Run the following command to create a new database named `fishing_game_db`:
      ```sql
      CREATE DATABASE fishing_game_db;
      ```

2. **Generate a JWT secret**:
    - Open a terminal or command prompt.
    - Run the following command to generate a random JWT secret:
      ```bash
      node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
      ```
    - Copy the generated secret for use in the next step.

3. **Create a `.env` file in the `server` directory with the following content**:
    ```
    DB_NAME=fishing_game_db
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    JWT_SECRET=your_generated_jwt_secret
    ```
    Replace `your_database_user`, `your_database_password`, and `your_database_host` with your actual MySQL database credentials, and `your_generated_jwt_secret` with the JWT secret you generated in the previous step.

4. **Install server dependencies**:
    ```bash
    cd server
    npm install
    ```

5. **Run database migrations**:
    ```bash
    npx sequelize-cli db:migrate
    ```

### Client Setup

1. **Clone the repository**:
    ```bash
    git clone git@github.com:anthonybo/fishing-idle-game.git
    cd fishing-idle-game
    ```

2. **Install client dependencies**:
    ```bash
    npm install
    ```

## Usage

1. **Start the development server**:
    ```bash
    npm run dev
    ```
    This command will start both the frontend and backend concurrently.

The application will be available at `http://localhost:3000`.

### Commands

- `npm run dev`: Starts the development server for both frontend and backend.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.
- `npm run eject`: Ejects the app from Create React App configuration.

## Gameplay

- **Fishing**: Your character will automatically fish over time. Watch for notifications of caught fish or fish that got away.
- **Upgrading**: Use the money earned from fishing to upgrade your rod and increase your catch rate.
- **Interacting**: Interact with bot fishermen through the chat system and log your fishing activities.
- **Authentication**: Register a new account or log in to an existing account to save your game progress.

## Contributing

Contributions are welcome! To contribute to this project, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push to the branch**:
    ```bash
    git push origin feature-name
    ```
6. **Create a new Pull Request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Happy fishing!
