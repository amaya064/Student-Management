"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserPlus,
  FaUsers,
  FaUserGraduate,
  FaBook,
  FaChartBar,
  FaTrash,
  FaEdit,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaGraduationCap,
  FaCalendarAlt,
  FaIdCard,
  FaEnvelope,
  FaUser,
  FaDownload
} from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import Navigation from "../Components/Navigation";

// Import jsPDF
import jsPDF from "jspdf";

interface User {
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

export default function User_view() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [updateForm, setUpdateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    studentNumber: "",
    gender: "",
    faculty: "",
    dateOfJoining: "",
    phone: "",
    address: "",
    role: "",
    status: ""
  });
  const [loading, setLoading] = useState(false);

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
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/employees/users");
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Download Profile as PDF
  const handleDownloadProfile = (user: User) => {
    // Create new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: `Student Profile - ${user.firstName} ${user.lastName}`,
      subject: 'Student Information',
      author: 'University Management System',
      keywords: 'student, profile, academic',
      creator: 'University Management System'
    });

    // Add university header
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT MANAGEMENT SYSTEM', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('STUDENT PROFILE REPORT', 105, 22, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let yPosition = 45;

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Personal Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PERSONAL INFORMATION', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Full Name: ${user.firstName || 'N/A'} ${user.lastName || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Email: ${user.email || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Gender: ${user.gender || 'Not provided'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Date Joined: ${user.dateOfJoining ? new Date(user.dateOfJoining).toLocaleDateString() : 'Not provided'}`, 20, yPosition);
    yPosition += 10;

    // Academic Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ACADEMIC INFORMATION', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Student Number: ${user.studentNumber || 'Not provided'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Faculty: ${user.faculty || 'Not provided'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Role: ${user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}`, 20, yPosition);
    yPosition += 10;

    // Contact Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CONTACT INFORMATION', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Phone: ${user.phone || 'Not provided'}`, 20, yPosition);
    yPosition += 6;

    // Handle address with text wrapping
    const address = user.address || 'Not provided';
    const splitAddress = doc.splitTextToSize(`Address: ${address}`, 150);
    doc.text(splitAddress, 20, yPosition);
    yPosition += (splitAddress.length * 4) + 6;

    // Account Information Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ACCOUNT INFORMATION', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Status: ${user.status || 'Active'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Member Since: ${new Date(user.createdAt).toLocaleDateString()}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Last Updated: ${new Date(user.updatedAt).toLocaleDateString()}`, 20, yPosition);
    yPosition += 10;

    // Add a border around the content
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, 35, 180, yPosition - 35);

    // Add footer
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Report generated on ${currentDate} at ${currentTime}`, 105, 285, { align: 'center' });
    doc.text('Student Management System - Develop By Amaya', 105, 290, { align: 'center' });

    // Save the PDF
    const fileName = `Student_Profile_${user.studentNumber || `${user.firstName}_${user.lastName}`}.pdf`;
    doc.save(fileName);
  };

  // Remove user handler
  const handleRemove = async (id: string) => {
    if (!confirm("Are you sure you want to remove this student?")) {
      return;
    }

    try {
      await fetch(`http://localhost:3000/api/employees/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== id));
      alert("Student removed successfully.");
    } catch (error) {
      console.error("Error removing student:", error);
      alert("Failed to remove student.");
    }
  };

  // Open update modal
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setUpdateForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      studentNumber: user.studentNumber || "",
      gender: user.gender || "",
      faculty: user.faculty || "",
      dateOfJoining: user.dateOfJoining ? new Date(user.dateOfJoining).toISOString().split('T')[0] : "",
      phone: user.phone || "",
      address: user.address || "",
      role: user.role || "student",
      status: user.status || "Active"
    });
  };

  // Close update modal
  const handleCloseModal = () => {
    setEditingUser(null);
    setUpdateForm({
      firstName: "",
      lastName: "",
      email: "",
      studentNumber: "",
      gender: "",
      faculty: "",
      dateOfJoining: "",
      phone: "",
      address: "",
      role: "",
      status: ""
    });
  };

  // Update user handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/signup/profile/${editingUser.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateForm),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the user in the local state
        setUsers(users.map(user =>
          user._id === editingUser._id
            ? { ...user, ...updateForm }
            : user
        ));
        alert("Student information updated successfully!");
        handleCloseModal();
      } else {
        alert(data.message || "Failed to update student information.");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred while updating student information.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getDisplayValue = (value: string | undefined) => {
    return value && value.trim() !== "" ? value : "Please update";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'faculty': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Navigation />
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-1 p-8">

          {/* Statistics Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Student Overview</h3>
                <p className="text-gray-600 text-lg">
                  Total <span className="text-blue-600 font-bold text-xl">{users.length}</span> students registered in the system
                </p>
                <div className="flex gap-4 mt-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Active: {users.filter(u => u.status === 'Active').length}
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Students: {users.filter(u => u.role === 'student').length}
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <FaUserGraduate className="text-blue-600 text-3xl" />
              </div>
            </div>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <FaUserGraduate className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Students Found</h3>
              <p className="text-gray-500 mb-6">No students have registered in the system yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Information
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Academic Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Information
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                        {/* Student Information */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                              <FaUserGraduate className="text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {getDisplayValue(user.firstName)} {getDisplayValue(user.lastName)}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-xs text-gray-400 mt-1">
                                Joined: {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Academic Details */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <FaIdCard className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-900 font-medium">{getDisplayValue(user.studentNumber)}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <FaGraduationCap className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{getDisplayValue(user.faculty)}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <FaVenusMars className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{getDisplayValue(user.gender)}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <FaCalendarAlt className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">
                                {user.dateOfJoining
                                  ? new Date(user.dateOfJoining).toLocaleDateString()
                                  : 'Please update'
                                }
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Contact Information */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <FaPhone className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="text-gray-700">{getDisplayValue(user.phone)}</span>
                            </div>
                            <div className="flex items-start text-sm">
                              <FaMapMarkerAlt className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 line-clamp-2">{getDisplayValue(user.address)}</span>
                            </div>
                          </div>
                        </td>

                        {/* Account Status */}
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                              {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'Student'}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {user.status || 'Active'}
                            </span>
                            <div className="flex items-center text-xs text-green-600">
                              <FaLock className="mr-1" size={10} />
                              Secured
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(user)}
                              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-2 font-semibold text-sm"
                            >
                              <FaEdit className="text-sm" />
                              <span>Update</span>
                            </button>
                            <button
                              onClick={() => handleDownloadProfile(user)}
                              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 flex items-center space-x-2 font-semibold text-sm"
                            >
                              <FaDownload className="text-sm" />
                              <span>Download Profile</span>
                            </button>
                            <button
                              onClick={() => handleRemove(user._id)}
                              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center space-x-2 font-semibold text-sm"
                            >
                              <FaTrash className="text-sm" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Update Modal */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6 p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800">Update Student Information</h3>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleUpdate} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="md:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaUser className="mr-2 text-blue-600" />
                        Personal Information
                      </h4>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={updateForm.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        placeholder="Enter first name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={updateForm.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        placeholder="Enter last name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={updateForm.gender}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Date of Joining *
                      </label>
                      <input
                        type="date"
                        name="dateOfJoining"
                        value={updateForm.dateOfJoining}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        required
                      />
                    </div>

                    {/* Academic Information */}
                    <div className="md:col-span-2 mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaGraduationCap className="mr-2 text-green-600" />
                        Academic Information
                      </h4>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Student Number *
                      </label>
                      <input
                        type="text"
                        name="studentNumber"
                        value={updateForm.studentNumber}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        placeholder="e.g., STU20240001"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Faculty *
                      </label>
                      <select
                        name="faculty"
                        value={updateForm.faculty}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        required
                      >
                        <option value="">Select Faculty</option>
                        {faculties.map((faculty, index) => (
                          <option key={index} value={faculty}>{faculty}</option>
                        ))}
                      </select>
                    </div>

                    {/* Contact Information */}
                    <div className="md:col-span-2 mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaEnvelope className="mr-2 text-purple-600" />
                        Contact Information
                      </h4>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={updateForm.email}
                        disabled
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={updateForm.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={updateForm.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white resize-none"
                        placeholder="Enter complete address"
                        required
                      />
                    </div>

                    {/* Account Information */}
                    <div className="md:col-span-2 mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FaLock className="mr-2 text-red-600" />
                        Account Information
                      </h4>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Role
                      </label>
                      <select
                        name="role"
                        value={updateForm.role}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                      >
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                        <option value="faculty">Faculty</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-black">
                        Status
                      </label>
                      <select
                        name="status"
                        value={updateForm.status}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition duration-300 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                      ) : (
                        "Update Student Information"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}