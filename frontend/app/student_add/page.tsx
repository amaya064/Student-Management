"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FaUserGraduate, 
  FaUser, 
  FaPhoneAlt, 
  FaMapMarkedAlt, 
  FaLock,
  FaIdCard,
  FaVenusMars,
  FaGraduationCap,
  FaCalendarAlt,
  FaPlusCircle,
  FaArrowLeft
} from 'react-icons/fa';
import Navigation from "../Components/Navigation";

// Define types for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  studentNumber: string;
  gender: string;
  faculty: string;
  dateOfJoining: string;
  phone: string;
  address: string;
}

export default function AdminStudentRegistration() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    studentNumber: '',
    gender: '',
    faculty: '',
    dateOfJoining: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const faculties = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Medicine',
    'Law',
    'Arts & Humanities',
    'Science',
    'Education',
    'Social Sciences',
    'Health Sciences'
  ];

  useEffect(() => {
    console.log("Admin Student Registration Component loaded");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await fetch("http://localhost:3000/api/signup/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Student registration failed. Please try again.');
        return;
      }

      setSuccess('Student registered successfully!');
      setError(null);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        studentNumber: '',
        gender: '',
        faculty: '',
        dateOfJoining: '',
        phone: '',
        address: '',
      });

      // Optionally redirect to students list after success
      setTimeout(() => {
        router.push("/Admin_Home");
      }, 2000);

    } catch (error: unknown) {
      console.error("Error:", error);
      setLoading(false);

      if (error instanceof Error) {
        setError(error.message || "An unexpected error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Left Section - Form */}
          <div className="w-full lg:w-2/3 p-8 lg:p-12">
            <div className="flex items-center mb-8">
              <button
                onClick={() => router.back()}
                className="flex items-center text-blue-600 hover:text-blue-800 mr-4 transition-colors"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <FaUserGraduate className="text-white text-lg" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">Register New Student</h2>
                <p className="text-gray-600 text-sm">
                  Add a student to the Student Management System
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaUser className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaUser className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaVenusMars className="text-gray-400 mr-3" />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Joining *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Number *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaIdCard className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      name="studentNumber"
                      value={formData.studentNumber}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                      placeholder="e.g., STU20240001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Faculty *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaGraduationCap className="text-gray-400 mr-3" />
                    <select
                      name="faculty"
                      value={formData.faculty}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700"
                      required
                    >
                      <option value="">Select Faculty</option>
                      {faculties.map((faculty, index) => (
                        <option key={index} value={faculty}>{faculty}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaUser className="text-gray-400 mr-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                      placeholder="student@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaPhoneAlt className="text-gray-400 mr-3" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                  <FaMapMarkedAlt className="text-gray-400 mr-3" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 resize-none"
                    placeholder="Enter complete address"
                    rows={3}
                    required
                  />
                </div>
              </div>

              {/* Account Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                  <FaLock className="text-gray-400 mr-3" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
                    placeholder="Enter secure password"
                    minLength={6}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Password must be at least 6 characters long
                </p>
              </div>

              <button
                type="submit"
                className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Registering Student...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FaPlusCircle className="mr-2" />
                    Register Student
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Right Section - Info */}
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 lg:p-12 flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-lg">
                  <FaUserGraduate className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Admin Portal</h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Manage student accounts and academic records efficiently
                </p>
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span className="text-blue-50 text-sm">Complete student profiles</span>
                </div>

                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span className="text-blue-50 text-sm">Academic information tracking</span>
                </div>

                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span className="text-blue-50 text-sm">Secure account management</span>
                </div>

                <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xs">✓</span>
                  </div>
                  <span className="text-blue-50 text-sm">Automated enrollment</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-blue-200 text-xs">
                  Streamline student onboarding with our comprehensive admin tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}