import React, { useEffect, useState } from "react";
import { getAllTeacherPositions } from "../../api/teacherPosition.js";
import AddTeacherPosition from "../AddTeacherPosition/AddTeacherPosition";
import "./TeacherPositionList.css";

export default function TeacherPositionList() {
    const [positions, setPositions] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const loadPositions = async () => {
        const res = await getAllTeacherPositions();
        if (res.success) setPositions(res.data);
    };

    useEffect(() => {
        loadPositions();
    }, []);

    return (
        <div className="position-list">
            {/* Header */}
            <div className="header">
                <h2>📌 Danh sách vị trí giáo viên</h2>
                <button className="btn-create" onClick={() => setShowForm(true)}>
                    ➕ Tạo vị trí
                </button>
            </div>

            {/* Bảng danh sách */}
            <div className="table-wrapper">
                <table className="position-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Mã</th>
                            <th>Mô tả</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {positions.length > 0 ? (
                            positions.map((p, i) => (
                                <tr key={p._id}>
                                    <td>{i + 1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.code}</td>
                                    <td>{p.des || "—"}</td>
                                    <td>
                                        {p.isActive ? (
                                            <span className="status active">Đang hoạt động</span>
                                        ) : (
                                            <span className="status inactive">Ngừng</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form thêm mới */}
            {showForm && (
                <div className="overlay" onClick={() => setShowForm(false)}>
                    <div className="side-panel" onClick={(e) => e.stopPropagation()}>
                        <AddTeacherPosition
                            onClose={() => {
                                setShowForm(false);
                                loadPositions();
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
