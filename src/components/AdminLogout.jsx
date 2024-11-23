// src/components/AdminLogout.jsx

import axiosInstance from '../utils/axiosInstance';

const AdminLogout = () => {
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/admin/logout');
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.error || 'Logout failed.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminLogout;
