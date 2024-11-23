import { useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
    const [studentId, setStudentId] = useState('');
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [year, setYear] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/students/add', {
                studentId,
                name,
                className,
                year,
                email,
            });

            setMessage(response.data.message);
        } catch (err) {
            setMessage('Error adding student: ' + err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Add Student</h2>
            {message && <p className="text-center mb-4">{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="studentId">Student ID</label>
                    <input
                        type="text"
                        id="studentId"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="className">Class</label>
                    <input
                        type="text"
                        id="className"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="year">Year</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full"
                        required
                    >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 px-4 py-2 w-full"
                    />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Submit</button>
            </form>
        </div>
    );
};

export default StudentProfile;
