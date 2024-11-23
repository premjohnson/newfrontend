import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [students, setStudents] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch all students
    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/students');
            setStudents(response.data);
        } catch (err) {
            setError('Error fetching students');
        }
    };

    // Fetch faculties based on selected year
    const fetchFaculties = async (year = '') => {
        try {
            const response = await axios.get(`/api/faculty${year ? `/${year}` : ''}`);
            setFaculties(response.data);
        } catch (err) {
            setError('Error fetching faculties');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchStudents();
            await fetchFaculties();
            setLoading(false); // Set loading to false after data is fetched
        };

        fetchData();
    }, []);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        fetchFaculties(e.target.value);
    };

    // Conditional rendering for loading state
    if (loading) return <p className="text-center text-xl">Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Home</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Students Section */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Students</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Student ID</th>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Class</th>
                                <th className="border border-gray-300 px-4 py-2">Year</th>
                                <th className="border border-gray-300 px-4 py-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.studentId}>
                                    <td className="border border-gray-300 px-4 py-2">{student.studentId}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.className}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.year}</td>
                                    <td className="border border-gray-300 px-4 py-2">{student.email || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Faculty Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4">Faculty</h2>
                <div className="mb-4">
                    <label htmlFor="year" className="mr-2 font-medium">Filter by Year:</label>
                    <select
                        id="year"
                        className="border border-gray-300 px-4 py-2"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <option value="">All Years</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Subject</th>
                                <th className="border border-gray-300 px-4 py-2">Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculties.map((faculty) => (
                                <tr key={faculty._id}>
                                    <td className="border border-gray-300 px-4 py-2">{faculty.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{faculty.subject}</td>
                                    <td className="border border-gray-300 px-4 py-2">{faculty.year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Home;
