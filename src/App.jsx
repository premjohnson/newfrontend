import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSignUp from './components/AdminSignUp';
import AdminLogout from './components/AdminLogout';
import Home from './components/Home';
import StudentProfile from './components/StudentProfile';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/signup" />} />
                <Route path="/admin/signup" element={<AdminSignUp />} />
                <Route path="/admin/logout" element={<AdminLogout />} />
                <Route path="/home" element={<Home />} />
                <Route path="/student-profile" element={<StudentProfile />} />
            </Routes>
        </Router>
    );
}

export default App;
