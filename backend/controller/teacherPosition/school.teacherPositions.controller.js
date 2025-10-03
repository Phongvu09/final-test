import TeacherPosition from "./school.teacherPositions.model.js";

// Tạo TeacherPosition
export const createTeacherPosition = async (req, res) => {
    try {
        const { name, code, des } = req.body;

        if (!name || !code || !des) {
            return res.status(400).json({
                success: false,
                message: "Name, code, and des are required"
            });
        }

        // Kiểm tra trùng code
        const existingCode = await TeacherPosition.findOne({ code });
        if (existingCode) {
            return res.status(400).json({
                success: false,
                message: "Teacher position with this code already exists"
            });
        }

        // Tạo mới
        const newPosition = await TeacherPosition.create({ name, code, des });

        return res.status(201).json({
            success: true,
            message: "Teacher position created successfully",
            data: newPosition
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAllTeacherPositions = async (req, res) => {
    try {
        const positions = await TeacherPosition.find({ isDeleted: false });
        return res.status(200).json({
            success: true,
            data: positions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};