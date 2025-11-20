"use client";

import React, { useState, useEffect } from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaTag,
    FaDollarSign,
    FaClock,
    FaSignal,
    FaSave,
    FaPlusCircle,
    FaExclamationTriangle,
    FaGraduationCap,
    FaListAlt,
    FaUserGraduate,
    FaChartBar,
    FaHashtag
} from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";
import Navigation from "../Components/Navigation";

export default function CourseRegistration() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string; // Get course ID from URL if in edit mode

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        courseCode: "",
        title: "",
        instructor: "",
        category: "",
        price: "",
        duration: "1 month",
        level: "Beginner",
        description: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Duration options for dropdown
    const durationOptions = [
        "1 month",
        "2 months",
        "3 months",
        "4 months",
        "5 months",
        "6 months",
        "7 months",
        "8 months",
        "9 months",
        "10 months",
        "11 months",
        "12 months",
        "18 months",
        "24 months"
    ];

    // Check if we're in edit mode and fetch course data
    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            fetchCourseData();
        }
    }, [id]);

    const fetchCourseData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3000/api/courses`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                const course = data.data.find((c: any) => c._id === id);
                if (course) {
                    setFormData({
                        courseCode: course.courseCode || "",
                        title: course.title || "",
                        instructor: course.instructor || "",
                        category: course.category || "",
                        price: course.price || "",
                        duration: course.duration || "1 month",
                        level: course.level || "Beginner",
                        description: course.description || ""
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching course data:", error);
            setError("Failed to load course data");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(""); // Clear error when user starts typing
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const requestData = {
                ...formData,
                price: parseFloat(formData.price),
                courseCode: formData.courseCode.toUpperCase() // Ensure course code is uppercase
            };

            let response;
            let url;

            if (isEditMode) {
                // Update existing course
                url = `http://localhost:3000/api/courses/${id}`;
                response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData)
                });
            } else {
                // Register new course
                url = "http://localhost:3000/api/courses/register";
                response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData)
                });
            }

            // Check if response is OK before trying to parse JSON
            if (!response.ok) {
                // For 409 Conflict error, try to get the specific error message
                if (response.status === 409) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Course with this course code already exists");
                }

                const errorText = await response.text();
                console.error("Server response error:", errorText);

                // Check if it's HTML error page
                if (errorText.includes('<!DOCTYPE') || errorText.includes('<html')) {
                    throw new Error("Server returned HTML instead of JSON. Check if API endpoint exists.");
                }

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                // Reset form after successful submission
                if (!isEditMode) {
                    setFormData({
                        courseCode: "",
                        title: "",
                        instructor: "",
                        category: "",
                        price: "",
                        duration: "1 month",
                        level: "Beginner",
                        description: ""
                    });
                }
                router.push("/Admin_Home");
            } else {
                setError(data.message || "Operation failed");
                alert(data.message || "Operation failed");
            }
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            setError(`Error: ${errorMessage}`);
            alert(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navigation />
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar - Added from Admin_Home */}
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
                                <FaChalkboardTeacher className="text-white text-lg mr-3" />
                                <span className="font-medium">Add Course</span>
                            </li>
                            <li
                                className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
                                onClick={() => router.push("/course_view")}
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
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-4">
                                <FaBook className="text-white text-xl" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                {isEditMode ? "Update Course" : "Register New Course"}
                            </h1>
                            <p className="text-gray-600 text-sm">
                                {isEditMode
                                    ? "Update existing course information"
                                    : "Add new course to your student management system"}
                            </p>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center text-sm">
                                <FaExclamationTriangle className="mr-2 text-red-500 text-xs" />
                                {error}
                            </div>
                        )}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Left Section */}
                                    <div className="space-y-4">
                                        {/* Course Code Field */}
                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaHashtag className="text-blue-600 text-xs" />
                                            </div>
                                            <input
                                                type="text"
                                                id="courseCode"
                                                name="courseCode"
                                                placeholder="Course Code (e.g., CS101)"
                                                value={formData.courseCode}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm uppercase"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaBook className="text-blue-600 text-xs" />
                                            </div>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                placeholder="Course Title"
                                                value={formData.title}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaChalkboardTeacher className="text-blue-600 text-xs" />
                                            </div>
                                            <input
                                                type="text"
                                                id="instructor"
                                                name="instructor"
                                                placeholder="Instructor Name"
                                                value={formData.instructor}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Right Section */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaTag className="text-blue-600 text-xs" />
                                            </div>
                                            <input
                                                type="text"
                                                id="category"
                                                name="category"
                                                placeholder="Category"
                                                value={formData.category}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaDollarSign className="text-blue-600 text-xs" />
                                            </div>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                value={formData.price}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm"
                                                onChange={handleChange}
                                                required
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>

                                        {/* Duration Dropdown */}
                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaClock className="text-blue-600 text-xs" />
                                            </div>
                                            <select
                                                id="duration"
                                                name="duration"
                                                value={formData.duration}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                                                onChange={handleChange}
                                                required
                                            >
                                                {durationOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                            <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors">
                                                <FaSignal className="text-blue-600 text-xs" />
                                            </div>
                                            <select
                                                id="level"
                                                name="level"
                                                value={formData.level}
                                                className="w-full bg-transparent focus:outline-none text-gray-700 text-sm"
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Description Field */}
                                <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 group focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
                                    <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center group-focus-within:bg-blue-200 transition-colors mt-1">
                                        <FaBook className="text-blue-600 text-xs" />
                                    </div>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Course Description"
                                        value={formData.description}
                                        rows={4}
                                        className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 text-sm resize-none"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            {isEditMode ? "Updating..." : "Registering..."}
                                        </>
                                    ) : (
                                        <>
                                            {isEditMode ? (
                                                <>
                                                    <FaSave className="mr-2 text-xs" />
                                                    Update Course
                                                </>
                                            ) : (
                                                <>
                                                    <FaPlusCircle className="mr-2 text-xs" />
                                                    Register Course
                                                </>
                                            )}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}