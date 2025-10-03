import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Khóa chính

    name: { type: String, required: true },        // Tên người dùng
    email: { type: String, required: true, unique: true }, // Email
    phoneNumber: { type: String },                 // Số điện thoại
    address: { type: String },                     // Địa chỉ
    identity: { type: String },                    // CMND/CCCD
    dob: { type: Date },                           // Ngày sinh

    isDeleted: { type: Boolean, default: false },  // Trạng thái xóa

    role: {
        type: String,
        enum: ["STUDENT", "TEACHER", "ADMIN"],
        required: true
    } // Vai trò
});

const User = mongoose.model("User", userSchema);

export default User;
