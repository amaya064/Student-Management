"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaBook,
  FaChartLine,
  FaSignOutAlt,
  FaEdit,
  FaGraduationCap
} from "react-icons/fa";
import Navigation from "../Components/Navigation";

interface Student {
  email: string;
  phone: string;
  address: string;
}

export default function StudentProfile() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const studentData = JSON.parse(userData);
      setStudent(studentData);
      setLoading(false);
    } else {
      console.error("No user data found in localStorage.");
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleMyCourses = () => {
    router.push("/mycourses");
  };

  const handleMyGrades = () => {
    router.push("/mygrades");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-blue-500 border-solid rounded-full animate-spin mx-auto mb-3"></div>
          <div className="text-lg font-medium text-gray-700">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <FaUserGraduate className="text-4xl text-gray-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Student Data Found</h2>
          <p className="text-gray-600 mb-4 text-sm">Please log in to access your student profile.</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div className="py-6 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header Section - More Compact */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Student Portal</h1>
            <p className="text-gray-600 text-sm">Manage your academic profile and activities</p>
          </div>

          {/* Main Profile Card - More Compact */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUserGraduate className="text-white text-xl" />
              </div>
              <h1 className="text-lg font-bold">Welcome, {student.email}!</h1>
              <p className="text-blue-100 text-xs mt-1">Student Account</p>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-3">Profile Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-blue-600 text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600 font-medium">Email</p>
                    <p className="text-gray-800 font-semibold text-sm truncate">{student.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-green-600 text-sm" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600 font-medium">Phone</p>
                    <p className="text-gray-800 font-semibold text-sm">{student.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg md:col-span-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-purple-600 text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600 font-medium">Address</p>
                    <p className="text-gray-800 font-semibold text-sm truncate">{student.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - More Compact */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => router.push("/studentupdateprofile")}
                  className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaEdit className="text-xs" />
                  <span>Update</span>
                </button>

                <button
                  onClick={handleMyCourses}
                  className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaBook className="text-xs" />
                  <span>Courses</span>
                </button>

                <button
                  onClick={handleMyGrades}
                  className="bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaChartLine className="text-xs" />
                  <span>Grades</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards - More Compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaBook className="text-blue-600 text-lg" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Enrolled Courses</h3>
              <p className="text-xl font-bold text-blue-600">5</p>
              <p className="text-gray-600 text-xs">Current semester</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaChartLine className="text-green-600 text-lg" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">GPA</h3>
              <p className="text-xl font-bold text-green-600">3.8</p>
              <p className="text-gray-600 text-xs">Current standing</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FaGraduationCap className="text-purple-600 text-lg" />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Academic Level</h3>
              <p className="text-xl font-bold text-purple-600">Year 2</p>
              <p className="text-gray-600 text-xs">Undergraduate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal - More Compact */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-xs text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaSignOutAlt className="text-red-600 text-lg" />
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Confirm Logout
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-2">
              <button
                onClick={cancelLogout}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 font-medium text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}