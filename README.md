# Mini Kanban Board

A modern Kanban board application built using Next.js (App Router), TypeScript, and Tailwind CSS. The application enables users to efficiently manage tasks across different stages of a workflow with a clean and responsive UI.

---

## 🚀 Live Demo

https://mock-kanban-board.vercel.app

## 📂 Repository

https://github.com/RegiRegulas/mock-kanban-board.git

---

## 🧰 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React (useState / Context)
* **Deployment:** Vercel

---

## ✨ Features

* Create, edit, and delete task cards
* Move cards across workflow stages:

  * Pending
  * In Progress
  * Completed
* Drag and drop functionality for intuitive task movement
* Local storage persistence (data retained across sessions)
* Search and filter functionality
* Responsive and modern UI design

---

## 🏗️ Architecture & Design Decisions

* **Component-Based Design:**
  The application is divided into reusable components such as Board, Column, and Card for maintainability and scalability.

* **Client-Side State Management:**
  React state is used for managing UI interactions, ensuring fast and responsive updates.

* **Persistence Layer:**
  Browser localStorage is used to persist task data without requiring a backend.

* **Separation of Concerns:**
  UI logic, state handling, and styling are kept modular to improve readability and extensibility.

---

## ⚙️ Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/RegiRegulas/mock-kanban-board.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mock-kanban-board
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open in browser:

   ```
   http://localhost:3000
   ```

---

## 📦 Deployment

The project is deployed on Vercel with automatic CI/CD integration from GitHub.
Any push to the main branch triggers a new production deployment.

---

## 🔮 Future Improvements

* Backend integration (PostgreSQL / Firebase)
* User authentication
* Real-time collaboration
* Enhanced UI animations and accessibility improvements

---
