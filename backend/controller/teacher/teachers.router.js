import express from "express";
import { createTeacher, getTeachers } from "./school.teachers.controller.js";

const router = express.Router();

router.post("/", createTeacher);
router.get("/", getTeachers)

const teacherRoutes = router
export default teacherRoutes;
