import React from "react";
import { Routes, Route } from "react-router-dom";
import TeacherList from "./page/TeacherList/TeacherList.jsx";
import AddTeacher from "./page/AddTeacher/AddTeacher.jsx";
import TeacherPositionList from "./page/TeacherPositionList/TeacherPositionList.jsx";
import AddTeacherPosition from "./page/AddTeacherPosition/AddTeacherPosition.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/teachers" element={<TeacherList />} />
      <Route path="/add-teacher" element={<AddTeacher />} />
      <Route path="/positions" element={<TeacherPositionList />} />
      <Route path="/add-position" element={<AddTeacherPosition />} />
      <Route path="*" element={<TeacherList />} />
    </Routes>
  );
}
