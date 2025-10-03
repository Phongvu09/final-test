import express from "express";
import { createTeacherPosition, getAllTeacherPositions } from "./school.teacherPositions.controller.js";

const router = express.Router();

router.post("/", createTeacherPosition);
router.get("/", getAllTeacherPositions)

const teacherPositionRoutes = router
export default teacherPositionRoutes;
