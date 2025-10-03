import React, { useState } from "react";
import { createTeacherPosition } from "../../api/teacherPosition.js";
import "./AddTeacherPosition.css";

export default function AddTeacherPosition({ onClose }) {
    const [form, setForm] = useState({ name: "", code: "", des: "", isActive: true });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTeacherPosition(form);
        alert("✅ Tạo vị trí giáo viên thành công!");
        setForm({ name: "", code: "", des: "", isActive: true });
        onClose();
    };

    return (
        <div className="add-position">
            <h2>Thêm vị trí giáo viên</h2>
            <form onSubmit={handleSubmit} className="add-position-form">
                <input
                    placeholder="Tên vị trí"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    placeholder="Mã vị trí"
                    value={form.code}
                    onChange={e => setForm({ ...form, code: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Mô tả"
                    value={form.des}
                    onChange={e => setForm({ ...form, des: e.target.value })}
                    rows={3}
                />

                <select
                    value={form.isActive}
                    onChange={e => setForm({ ...form, isActive: e.target.value === "true" })}
                >
                    <option value="true">Đang hoạt động</option>
                    <option value="false">Ngừng hoạt động</option>
                </select>

                <div className="form-actions">
                    <button type="submit" className="btn-save">Lưu</button>
                    <button type="button" className="btn-cancel" onClick={onClose}>Đóng</button>
                </div>
            </form>
        </div>
    );
}
