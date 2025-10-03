import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Khóa chính, định danh giáo viên

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Khóa ngoại, liên kết user

    isActive: { type: Boolean, default: true },   // Trạng thái hoạt động của giáo viên
    isDeleted: { type: Boolean, default: false }, // Trạng thái xóa của giáo viên

    code: {
        type: String,
        unique: true,
        required: true,
        match: [/^\d{10}$/, "Code must be 10 digits"] // Mã định danh 10 chữ số
    },

    startDate: { type: Date },   // Ngày bắt đầu công tác
    endDate: { type: Date },     // Ngày kết thúc công tác

    teacherPositions: [
        { type: mongoose.Schema.Types.ObjectId, ref: "TeacherPosition" }
    ], // Danh sách khóa ngoại liên kết với teacher Position

    degrees: [
        {
            type: { type: String, required: true },       // Loại bằng cấp
            school: { type: String, required: true },     // Tên trường
            major: { type: String, required: true },      // Chuyên ngành
            year: { type: Number, required: true },       // Năm tốt nghiệp
            isGraduated: { type: Boolean, default: false } // Trạng thái tốt nghiệp
        }
    ] // Danh sách bằng cấp
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
