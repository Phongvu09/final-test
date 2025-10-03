import React, { useState, useEffect } from "react";
import { getAllTeacherPositions } from "../../api/teacherPosition";
import { createTeacher } from "../../api/teacher";
import "./AddTeacher.css";

export default function AddTeacher({ onClose }) {
    const [form, setForm] = useState({
        name: "",
        dob: "",
        phoneNumber: "",
        email: "",
        identity: "",
        address: "",
        teacherPosition: "",
        degrees: []
    });

    const [positions, setPositions] = useState([]);
    const [showDegreeForm, setShowDegreeForm] = useState(false);
    const [newDegree, setNewDegree] = useState({
        type: "",
        school: "",
        major: "",
        graduated: ""
    });

    // Lấy danh sách chức vụ từ API
    useEffect(() => {
        getAllTeacherPositions().then((res) => {
            if (res.success) setPositions(res.data || []);
        });
    }, []);

    // Cập nhật field form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Cập nhật field học vị
    const handleDegreeChange = (e) => {
        setNewDegree({ ...newDegree, [e.target.name]: e.target.value });
    };

    // Thêm học vị vào danh sách
    const addDegree = () => {
        if (!newDegree.type || !newDegree.school || !newDegree.graduated) {
            alert("Vui lòng nhập đầy đủ thông tin học vị (loại bằng, trường, năm tốt nghiệp)");
            return;
        }
        setForm({
            ...form,
            degrees: [...form.degrees, newDegree]
        });
        setNewDegree({ type: "", school: "", major: "", graduated: "" });
        setShowDegreeForm(false);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Chuẩn payload đúng format backend
        const payload = {
            name: form.name,
            email: form.email,
            phoneNumber: form.phoneNumber,
            identity: form.identity,
            address: form.address,
            // chỉ thêm dob nếu có
            ...(form.dob && { dob: new Date(form.dob) }),
            // chỉ thêm teacherPositions nếu có
            ...(form.teacherPosition ? { teacherPositions: [form.teacherPosition] } : {}),
            // map graduated -> year
            degrees: form.degrees.map(d => ({
                type: d.type,
                school: d.school,
                major: d.major,
                year: d.graduated
            }))
        };

        console.log("Payload gửi:", JSON.stringify(payload, null, 2));

        try {
            await createTeacher(payload);
            alert("Lưu thành công ✅");
            onClose();
        } catch (err) {
            const msg = err.response?.data?.message || err.message;
            console.error("Lỗi khi lưu:", msg);
            alert("Không lưu được giáo viên ❌\n" + msg);
        }
    };

    return (
        <div className="add-teacher">
            <h2>Thêm giáo viên</h2>
            <form onSubmit={handleSubmit}>
                <div className="section">
                    <h3>Thông tin cá nhân</h3>

                    <div className="row">
                        <div className="field">
                            <label>Họ và tên</label>
                            <input name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="field">
                            <label>Ngày sinh</label>
                            <input type="date" name="dob" value={form.dob} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Số điện thoại</label>
                            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>Số CCCD</label>
                            <input name="identity" value={form.identity} onChange={handleChange} />
                        </div>
                        <div className="field">
                            <label>Địa chỉ</label>
                            <input name="address" value={form.address} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="section">
                    <h3>Thông tin công tác</h3>
                    <label>Chức vụ</label>
                    <select
                        name="teacherPosition"
                        value={form.teacherPosition}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn chức vụ --</option>
                        {positions.map((pos) => (
                            <option key={pos._id} value={pos._id}>
                                {pos.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="section">
                    <h3>Học vị</h3>
                    {form.degrees.length === 0 && <p>Chưa có học vị nào</p>}
                    <ul>
                        {form.degrees.map((d, i) => (
                            <li key={i}>
                                {d.type} - {d.school} - {d.major} ({d.graduated})
                            </li>
                        ))}
                    </ul>

                    {!showDegreeForm && (
                        <button
                            type="button"
                            className="btn-add"
                            onClick={() => setShowDegreeForm(true)}
                        >
                            ➕ Thêm học vị
                        </button>
                    )}

                    {showDegreeForm && (
                        <div className="degree-form">
                            <label>Loại bằng</label>
                            <select name="type" value={newDegree.type} onChange={handleDegreeChange}>
                                <option value="">-- Chọn loại bằng --</option>
                                <option value="Cử nhân">Cử nhân</option>
                                <option value="Thạc sĩ">Thạc sĩ</option>
                                <option value="Tiến sĩ">Tiến sĩ</option>
                            </select>

                            <label>Trường</label>
                            <input name="school" value={newDegree.school} onChange={handleDegreeChange} />

                            <label>Chuyên ngành</label>
                            <input name="major" value={newDegree.major} onChange={handleDegreeChange} />

                            <label>Năm tốt nghiệp</label>
                            <input name="graduated" value={newDegree.graduated} onChange={handleDegreeChange} />

                            <button type="button" className="btn-save" onClick={addDegree}>
                                Lưu học vị
                            </button>
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">Lưu</button>
                    <button type="button" className="btn-cancel" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    );
}
