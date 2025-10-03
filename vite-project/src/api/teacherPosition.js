import api from "./api";

export const getAllTeacherPositions = async () => {
    try {
        const response = await api.get("/teacher-positions");
        return response.data;
    } catch (err) {
        console.error("Axios error:", err.message);
        return { success: false, data: [] };
    }
};

export const createTeacherPosition = async (teacherPositionData) => {
    const response = await api.post("/teacher-positions", teacherPositionData);
    return response.data;
}