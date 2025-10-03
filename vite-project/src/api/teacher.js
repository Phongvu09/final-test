import api from "./api";
// teacherService.js
export const getTeachers = async (page = 1, limit = 10) => {
    const response = await api.get("/teachers", {
        params: { page, limit }
    });
    return response.data;
};

export const createTeacher = async (teacherData) => {
    const response = await api.post("/teachers", teacherData)
    return response.data;
}