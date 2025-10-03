import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./common/config/mongoDb.js";
import teacherPositionRoutes from "./controller/teacherPosition/school.teacher.router.js";
import teacherRoutes from "./controller/teacher/teachers.router.js";

// 1️⃣ Load .env
dotenv.config();

// 2️⃣ Kết nối MongoDB
connectDB();

const app = express();

// 3️⃣ Middleware
app.use(cors());        // cho phép frontend khác port
app.use(express.json());

// 4️⃣ Routes
app.use("/teacher-positions", teacherPositionRoutes);
app.use("/teachers", teacherRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
