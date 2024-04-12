# Frontend Setup for the Web3 Project

This document outlines how to set up and run the frontend of the Web3 project.

## Project Structure

The frontend directory structure includes:

- `public/` - Contains static assets like HTML files, icons, and manifest files.
- `src/` - Contains all the React components and JavaScript code.
  - `App.js`, `App.css` - Main React component and its styling.
  - `Auth/` - Authentication related components.
  - `components/` - Reusable components like buttons, text fields, etc.
  - `contracts/` - Contains ABIs and other contract-related details.
  - `pages/` - Contains page components like Admin Dashboard, Login page, etc.

## Setup

To set up the frontend, navigate to the `frontend` directory and install all necessary dependencies:

```bash
npm install
```
# Running the Frontend
To run the frontend on your local machine, execute:

```bash
npm start
```
This will start the React development server, typically accessible via http://localhost:3000.

## Notes
### Ensure that you have Node.js installed and that the backend server is running, as the frontend will need to interact with it for full functionality also Ensure that you have configured the necessary environment variables
