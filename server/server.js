import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import authRoutes from "./routes/auth.routes.js";
import feedbacksRoutes from "./routes/feedbacks.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";
import path from "path";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/feedbacks", feedbacksRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle all other requests
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`Server Running on port ${PORT}`);
});

export default app;