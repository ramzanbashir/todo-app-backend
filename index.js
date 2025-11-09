// //okay
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./db/config.js";
// import todoRoutes from "./routes/todos.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect MongoDB
// connectDB();

// // Routes
// app.use("/api/todos", todoRoutes);

// // Server Listen
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/config.js";
import todoRoutes from "./routes/todos.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" })); // allow all origins
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/api/todos", todoRoutes);

// Only listen locally (for development)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app; // Required for Vercel serverless
