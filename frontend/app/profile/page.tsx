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
  FaGraduationCap,
  FaVenusMars,
  FaIdCard,
  FaCalendarAlt,
  FaUser,
  FaShieldAlt  // Changed from FaShield to FaShieldAlt
} from "react-icons/fa";
import Navigation from "../Components/Navigation";

interface Student {
  _id: string;
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
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function StudentProfile() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const studentData = JSON.parse(userData);
          // Fetch complete student data from API using email
          const response = await fetch(`http://localhost:3000/api/employees/profile/${studentData.email}`);
          if (response.ok) {
            const completeStudentData = await response.json();
            setStudent(completeStudentData);
          } else {
            // Fallback to basic data from localStorage
            setStudent(studentData);
          }
        } else {
          console.error("No user data found in localStorage.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
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

  const getDisplayValue = (value: string | undefined) => {
    return value && value.trim() !== "" ? value : "Not provided";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Student Portal</h1>
            <p className="text-gray-600 text-sm">Manage your academic profile and activities</p>
          </div>

          {/* Main Profile Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUserGraduate className="text-white text-xl" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">
                      {getDisplayValue(student.firstName)} {getDisplayValue(student.lastName)}
                    </h1>
                    <p className="text-blue-100 text-sm">{student.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status || 'Active'}
                      </span>
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {student.role?.charAt(0).toUpperCase() + student.role?.slice(1) || 'Student'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 text-sm">Student ID</p>
                  <p className="font-mono text-sm">{getDisplayValue(student.studentNumber)}</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center">
                    <FaUser className="mr-2 text-blue-600" />
                    Personal Information
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-gray-400" />
                        <span className="text-sm text-gray-600">Full Name</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">
                        {getDisplayValue(student.firstName)} {getDisplayValue(student.lastName)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaVenusMars className="text-gray-400" />
                        <span className="text-sm text-gray-600">Gender</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{getDisplayValue(student.gender)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-gray-400" />
                        <span className="text-sm text-gray-600">Date Joined</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{formatDate(student.dateOfJoining)}</span>
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center">
                    <FaGraduationCap className="mr-2 text-green-600" />
                    Academic Information
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaIdCard className="text-gray-400" />
                        <span className="text-sm text-gray-600">Student Number</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm font-mono">{getDisplayValue(student.studentNumber)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaGraduationCap className="text-gray-400" />
                        <span className="text-sm text-gray-600">Faculty</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{getDisplayValue(student.faculty)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaShieldAlt className="text-gray-400" /> {/* Changed from FaShield to FaShieldAlt */}
                        <span className="text-sm text-gray-600">Account Status</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                        {student.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-lg font-bold text-gray-800 border-b pb-2 flex items-center">
                    <FaEnvelope className="mr-2 text-purple-600" />
                    Contact Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-gray-400" />
                        <span className="text-sm text-gray-600">Email</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm truncate">{student.email}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FaPhone className="text-gray-400" />
                        <span className="text-sm text-gray-600">Phone</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm">{student.phone}</span>
                    </div>

                    <div className="md:col-span-2 flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <FaMapMarkerAlt className="text-gray-400 mt-0.5" />
                        <span className="text-sm text-gray-600">Address</span>
                      </div>
                      <span className="text-gray-800 font-medium text-sm text-right max-w-md">{student.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Metadata */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600">Member Since</p>
                    <p className="text-sm font-medium text-gray-800">{formatDate(student.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Last Updated</p>
                    <p className="text-sm font-medium text-gray-800">{formatDate(student.updatedAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Account Type</p>
                    <p className="text-sm font-medium text-gray-800 capitalize">{student.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 bg-gray-50 border-t">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => router.push("/studentupdateprofile")}
                  className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaEdit className="text-xs" />
                  <span>Update Profile</span>
                </button>

                <button
                  onClick={handleMyCourses}
                  className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaBook className="text-xs" />
                  <span>My Courses</span>
                </button>

                <button
                  onClick={handleMyGrades}
                  className="bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition duration-300 font-medium flex items-center justify-center space-x-2 text-xs"
                >
                  <FaChartLine className="text-xs" />
                  <span>My Grades</span>
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

          {/* Quick Stats Cards */}
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

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
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