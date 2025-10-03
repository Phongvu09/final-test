// Layout.jsx
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
    return (
        <div className="layout">
            <aside className="sidebar">
                <h2>School System</h2>
                <nav>
                    <Link to="/teachers">Giáo viên</Link>
                    <Link to="/add-teacher">Thêm GV</Link>
                    <Link to="/positions">Chức vụ</Link>
                    <Link to="/add-position">Thêm chức vụ</Link>
                </nav>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}
