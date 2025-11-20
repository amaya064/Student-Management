"use client";

import React, { useState, useEffect } from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaTag,
    FaDollarSign,
    FaClock,
    FaSignal,
    FaEdit,
    FaTrash,
    FaSearch,
    FaFilter,
    FaUserGraduate,
    FaChartBar,
    FaPlusCircle,
    FaEye
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navigation from "../Components/Navigation";

interface Course {
    _id: string;
    courseCode: string;
    title: string;
    instructor: string;
    category: string;
    price: number;
    duration: string;
    level: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export default function CourseView() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");

    // Fetch all courses
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/courses");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setCourses(data.data);
            } else {
                setError("Failed to load courses");
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            setError("Failed to load courses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (courseId: string, courseTitle: string) => {
        if (!confirm(`Are you sure you want to delete the course "${courseTitle}"?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.success) {
                alert("Course deleted successfully");
                // Refresh the course list
                fetchCourses();
            } else {
                alert(data.message || "Failed to delete course");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Error deleting course. Please try again.");
        }
    };

    const handleEditCourse = (courseId: string) => {
        router.push(`/course/${courseId}`);
    };

    // Filter and search courses
    const filteredCourses = courses.filter(course => {
        const matchesSearch = 
            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLevel = filterLevel === "all" || course.level === filterLevel;
        const matchesCategory = filterCategory === "all" || course.category === filterCategory;

        return matchesSearch && matchesLevel && matchesCategory;
    });

    // Get unique categories for filter
    const categories = [...new Set(courses.map(course => course.category))];

    return (
        <div>
            <Navigation />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-gradient-to-br from-blue-700 to-indigo-600 text-white shadow-xl">
                    {/* Profile Section */}
                    <div className="p-6 border-b border-indigo-400">
                        <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                                <FaUserGraduate className="text-blue-600 text-xl" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Admin</h2>
                                <p className="text-gray-300 text-sm">Student System Admin</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="mt-6">
                        <ul className="space-y-2">
                            <li
                                className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
                                onClick={() => router.push("/Admin_Home")}
                            >
                                <FaChalkboardTeacher className="text-white text-lg mr-3" />
                                <span className="font-medium">Dashboard</span>
                            </li>
                            <li
                                className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
                                onClick={() => router.push("/course")}
                            >
                                <FaPlusCircle className="text-white text-lg mr-3" />
                                <span className="font-medium">Add Course</span>
                            </li>
                            <li
                                className="flex items-center p-4 bg-indigo-500 rounded-md cursor-pointer transition-all"
                                onClick={() => router.push("/course-view")}
                            >
                                <FaBook className="text-white text-lg mr-3" />
                                <span className="font-medium">Manage Courses</span>
                            </li>
                            <li
                                className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
                                onClick={() => router.push("/reports")}
                            >
                                <FaChartBar className="text-white text-lg mr-3" />
                                <span className="font-medium">View Reports</span>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Management</h1>
                                <p className="text-gray-600">
                                    View and manage all courses in the system
                                </p>
                            </div>
                            <button
                                onClick={() => router.push("/course")}
                                className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105"
                            >
                                <FaPlusCircle className="mr-2" />
                                Add New Course
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">Total Courses</p>
                                        <p className="text-3xl font-bold text-gray-800 mt-2">{courses.length}</p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <FaBook className="text-blue-600 text-xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">Beginner Courses</p>
                                        <p className="text-3xl font-bold text-green-600 mt-2">
                                            {courses.filter(c => c.level === 'Beginner').length}
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <FaSignal className="text-green-600 text-xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">Intermediate Courses</p>
                                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                                            {courses.filter(c => c.level === 'Intermediate').length}
                                        </p>
                                    </div>
                                    <div className="bg-yellow-100 p-3 rounded-full">
                                        <FaSignal className="text-yellow-600 text-xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">Advanced Courses</p>
                                        <p className="text-3xl font-bold text-red-600 mt-2">
                                            {courses.filter(c => c.level === 'Advanced').length}
                                        </p>
                                    </div>
                                    <div className="bg-red-100 p-3 rounded-full">
                                        <FaSignal className="text-red-600 text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search and Filter Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaSearch className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Level Filter */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaFilter className="text-gray-400" />
                                    </div>
                                    <select
                                        value={filterLevel}
                                        onChange={(e) => setFilterLevel(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="all">All Levels</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaTag className="text-gray-400" />
                                    </div>
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
                                <FaEye className="mr-2 text-red-500" />
                                {error}
                            </div>
                        )}

                        {/* Courses Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="text-center py-12">
                                <FaBook className="mx-auto text-gray-400 text-6xl mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No courses found</h3>
                                <p className="text-gray-500 mb-6">
                                    {searchTerm || filterLevel !== "all" || filterCategory !== "all" 
                                        ? "Try adjusting your search or filters" 
                                        : "Get started by adding your first course"}
                                </p>
                                <button
                                    onClick={() => router.push("/course")}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Add Your First Course
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <div key={course._id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                                        {/* Course Header */}
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg">{course.courseCode}</h3>
                                                    <h2 className="font-semibold text-xl mt-1">{course.title}</h2>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    course.level === 'Beginner' ? 'bg-green-500' :
                                                    course.level === 'Intermediate' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`}>
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Course Details */}
                                        <div className="p-6">
                                            <div className="space-y-3">
                                                <div className="flex items-center text-gray-600">
                                                    <FaChalkboardTeacher className="mr-3 text-blue-500" />
                                                    <span className="font-medium">{course.instructor}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FaTag className="mr-3 text-green-500" />
                                                    <span>{course.category}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FaDollarSign className="mr-3 text-yellow-500" />
                                                    <span className="font-semibold">${course.price}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FaClock className="mr-3 text-purple-500" />
                                                    <span>{course.duration}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="mt-4">
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {course.description}
                                                </p>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                                                <button
                                                    onClick={() => handleEditCourse(course._id)}
                                                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                                >
                                                    <FaEdit className="mr-2" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCourse(course._id, course.title)}
                                                    className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                                                >
                                                    <FaTrash className="mr-2" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}