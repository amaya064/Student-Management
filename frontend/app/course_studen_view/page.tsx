"use client";

import React, { useState, useEffect } from "react";
import {
    FaBook,
    FaChalkboardTeacher,
    FaTag,
    FaDollarSign,
    FaClock,
    FaSignal,
    FaSearch,
    FaFilter,
    FaUserGraduate,
    FaShoppingCart,
    FaInfoCircle
} from "react-icons/fa";
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

export default function StudentCourseView() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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

    // Filter and search courses
    const filteredCourses = courses.filter(course => {
        const matchesSearch = 
            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLevel = filterLevel === "all" || course.level === filterLevel;
        const matchesCategory = filterCategory === "all" || course.category === filterCategory;

        return matchesSearch && matchesLevel && matchesCategory;
    });

    // Get unique categories for filter
    const categories = [...new Set(courses.map(course => course.category))];

    const handleEnroll = (course: Course) => {
        alert(`Enrollment feature for "${course.title}" will be implemented soon!`);
        // You can implement enrollment logic here
    };

    const handleViewDetails = (course: Course) => {
        setSelectedCourse(course);
    };

    const closeModal = () => {
        setSelectedCourse(null);
    };

    return (
        <div>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
                    <div className="max-w-7xl mx-auto px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Discover a wide range of courses designed to help you learn new skills and advance your career
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-400 text-lg" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search courses by title, instructor, category, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-8 py-12">
                    {/* Filters Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Level Filter */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaSignal className="text-gray-400" />
                                </div>
                                <select
                                    value={filterLevel}
                                    onChange={(e) => setFilterLevel(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Difficulty Levels</option>
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
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Results Count */}
                            <div className="flex items-center justify-center md:justify-start">
                                <span className="text-gray-600 font-medium">
                                    {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                                </span>
                            </div>

                            {/* Sort Options */}
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    onChange={(e) => {
                                        // Add sorting logic here if needed
                                    }}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="duration">Duration</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
                            <FaInfoCircle className="mr-2 text-red-500" />
                            {error}
                        </div>
                    )}

                    {/* Courses Grid */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredCourses.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                            <FaBook className="mx-auto text-gray-400 text-6xl mb-4" />
                            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No courses found</h3>
                            <p className="text-gray-500 text-lg max-w-md mx-auto">
                                {searchTerm || filterLevel !== "all" || filterCategory !== "all" 
                                    ? "Try adjusting your search criteria or filters to find more courses." 
                                    : "No courses available at the moment. Please check back later."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course) => (
                                <div 
                                    key={course._id} 
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    {/* Course Header with Level Badge */}
                                    <div className="relative">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    course.level === 'Beginner' ? 'bg-green-500' :
                                                    course.level === 'Intermediate' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`}>
                                                    {course.level}
                                                </span>
                                                <span className="text-blue-100 text-sm font-medium">
                                                    {course.duration}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-1">{course.courseCode}</h3>
                                            <h2 className="font-bold text-xl leading-tight">{course.title}</h2>
                                        </div>
                                    </div>

                                    {/* Course Details */}
                                    <div className="p-6">
                                        <div className="space-y-4 mb-4">
                                            <div className="flex items-center text-gray-700">
                                                <FaChalkboardTeacher className="mr-3 text-blue-500 text-lg flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Instructor</p>
                                                    <p className="font-semibold">{course.instructor}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center text-gray-700">
                                                <FaTag className="mr-3 text-green-500 text-lg flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Category</p>
                                                    <p className="font-semibold">{course.category}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description Preview */}
                                        <div className="mb-6">
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {course.description}
                                            </p>
                                        </div>

                                        {/* Price and Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                            <div className="flex items-center">
                                                <FaDollarSign className="text-yellow-500 mr-1" />
                                                <span className="text-2xl font-bold text-gray-800">
                                                    {course.price === 0 ? 'Free' : `$${course.price}`}
                                                </span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewDetails(course)}
                                                    className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                                >
                                                    <FaInfoCircle className="mr-2" />
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => handleEnroll(course)}
                                                    className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-md"
                                                >
                                                    <FaShoppingCart className="mr-2" />
                                                    Enroll
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Course Details Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        selectedCourse.level === 'Beginner' ? 'bg-green-500' :
                                        selectedCourse.level === 'Intermediate' ? 'bg-yellow-500' :
                                        'bg-red-500'
                                    }`}>
                                        {selectedCourse.level}
                                    </span>
                                    <h2 className="text-2xl font-bold mt-3">{selectedCourse.title}</h2>
                                    <p className="text-blue-100 text-lg mt-1">{selectedCourse.courseCode}</p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-blue-200 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="flex items-center">
                                    <FaChalkboardTeacher className="text-blue-500 text-xl mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Instructor</p>
                                        <p className="font-semibold text-lg">{selectedCourse.instructor}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaTag className="text-green-500 text-xl mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Category</p>
                                        <p className="font-semibold text-lg">{selectedCourse.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="text-purple-500 text-xl mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-semibold text-lg">{selectedCourse.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaDollarSign className="text-yellow-500 text-xl mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Price</p>
                                        <p className="font-semibold text-lg text-2xl">
                                            {selectedCourse.price === 0 ? 'Free' : `$${selectedCourse.price}`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">Course Description</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {selectedCourse.description}
                                </p>
                            </div>

                            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => handleEnroll(selectedCourse)}
                                    className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold"
                                >
                                    <FaShoppingCart className="mr-2" />
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}