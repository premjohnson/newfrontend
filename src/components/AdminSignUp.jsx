import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from '../utils/axiosInstance';

const AdminSignUp = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/admin/signup', {
                Email: formData.email,
                password: formData.password,
            });
            setMessage(response.data.message);

            // Navigate to Home page after successful signup
            if (response.status === 201) {
                navigate('/home'); // Adjust the route as needed
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Signup failed.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6">Admin Sign Up</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                >
                    Sign Up
                </button>
                {message && (
                    <p className="text-center text-sm text-red-500 mt-4">{message}</p>
                )}
            </form>
        </div>
    );
};

export default AdminSignUp;
