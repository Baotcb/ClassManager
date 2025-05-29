# Class Manager System

Welcome to the **Class Manager System**! This project is an integrated solution designed to manage classes, students, and administrative functions for educational institutions. It is composed of three main repositories:

- **Class Manager Server** (`Baotcb/Class_Manager_Server`): The backend API and database logic, written in C# and T-SQL.
- **Class Manager Admin Client** (`Baotcb/ClassManager_AdminClient_Typescript`): The admin-facing web client, built with TypeScript, HTML, and CSS.
- **Class Manager Public Client** (`Baotcb/ClassManager`): The public-facing website for students and teachers, built with HTML, TypeScript, and CSS.

---

## Repository Links

- [Class Manager Server (C#)](https://github.com/Baotcb/Class_Manager_Server)
- [Class Manager Admin Client (TypeScript)](https://github.com/Baotcb/ClassManager_AdminClient_Typescript)
- [Class Manager Public Client (TypeScript/HTML)](https://github.com/Baotcb/ClassManager)

---

## Project Overview

The Class Manager System is divided into three core projects:

### 1. Class Manager Server

- **Repository:** [Baotcb/Class_Manager_Server](https://github.com/Baotcb/Class_Manager_Server)
- **Languages:** C# (87%), TSQL (13%)
- **Description:** Handles all backend operations, including database management, authentication, class and student data handling, and API endpoints used by both client applications.

### 2. Class Manager Admin Client

- **Repository:** [Baotcb/ClassManager_AdminClient_Typescript](https://github.com/Baotcb/ClassManager_AdminClient_Typescript)
- **Languages:** TypeScript (47%), HTML (39.8%), CSS (13.2%)
- **Description:** The administrative dashboard allowing staff to manage classes, users, attendance, schedules, and reports.

### 3. Class Manager Public Client

- **Repository:** [Baotcb/ClassManager](https://github.com/Baotcb/ClassManager)
- **Languages:** HTML (42%), TypeScript (38.9%), CSS (19.1%)
- **Description:** The main portal for students and teachers to access class information, schedules, resources, and notifications.

---

## Getting Started

This repository is the **Class Manager Public Client**. To set up the project locally, follow these steps:

### Prerequisites

- [Node.js (v18 or above recommended)](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Baotcb/ClassManager.git
   cd ClassManager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values (if applicable).

4. **Start the development server:**

   ```bash
   npm start
   ```

   The app should now be running at [http://localhost:3000](http://localhost:3000) or another port specified in your configuration.

5. **Build for production:**

   ```bash
   ng serve
   ```

   The production-ready files will be generated in the `dist` or `build` directory (check your project setup).

---

## Contribution

We welcome contributions! Please open issues or submit pull requests to the appropriate repository. For questions, use the Issues tab or contact the repository maintainers.

---

## License

This project is licensed under the terms described in each repository.

---

## Related Projects

- [Class Manager Server](https://github.com/Baotcb/Class_Manager_Server)
- [Class Manager Admin Client](https://github.com/Baotcb/ClassManager_AdminClient_Typescript)
- [Class Manager Public Client](https://github.com/Baotcb/ClassManager)
