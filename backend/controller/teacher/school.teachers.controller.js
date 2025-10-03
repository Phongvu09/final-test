import User from "../user/school.users.model.js";
import Teacher from "./school.teachers.model.js";

// Sinh code 10 chữ số unique cho Teacher
async function generateTeacherCode() {
    let code;
    let exists = true;
    while (exists) {
        code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        const teacher = await Teacher.findOne({ code });
        if (!teacher) exists = false;
    }
    return code;
}

export const createTeacher = async (req, res) => {
    try {
        const {
            name, email, phoneNumber, address, identity, dob,
            startDate, endDate,
            teacherPositions, // array of TeacherPosition IDs
            degrees
        } = req.body;

        // 1. Check email unique
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // 2. Tạo User role TEACHER
        const newUser = await User.create({
            name, email, phoneNumber, address, identity, dob,
            role: "TEACHER",
            isDeleted: false
        });

        // 3. Sinh code giáo viên
        const code = await generateTeacherCode();

        // 4. Tạo Teacher, tham chiếu tới TeacherPosition qua ID
        const teacher = await Teacher.create({
            userId: newUser._id,
            code,
            startDate,
            endDate,
            teacherPositions, // frontend gửi array of IDs
            degrees,
            isActive: true,
            isDeleted: false
        });

        return res.status(201).json({
            success: true,
            message: "Teacher created successfully",
            data: { user: newUser, teacher }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getTeachers = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const teachers = await Teacher.find({ isDeleted: false })
            .populate("userId", "name email phoneNumber address role")
            .populate("teacherPositions", "name code des")
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Teacher.countDocuments({ isDeleted: false });
        const totalPages = Math.ceil(total / limit);

        const data = teachers.map(t => ({
            code: t.code,
            name: t.userId.name,
            email: t.userId.email,
            phoneNumber: t.userId.phoneNumber,
            isActive: t.isActive,
            address: t.userId.address,
            teacherPositions: t.teacherPositions,
            degrees: t.degrees || []
        }));

        return res.status(200).json({
            success: true,
            page,
            totalPages,
            total,
            limit,
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
