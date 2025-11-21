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
  FaUser
} from "react-icons/fa";

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
              <FaUserPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Admin Dashboard</span>
            </li>
            <li
              className="flex items-center p-4 bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => router.push("/Student_view")}
            >
              <FaUserGraduate className="text-white text-lg mr-3" />
              <span className="font-medium">View Students</span>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
            Student Management
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Manage all student accounts and information
          </p>
        </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
              >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FaUserGraduate className="text-white text-xl" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || 'Student'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status || 'Active'}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold truncate">
                    {getDisplayValue(user.firstName)} {getDisplayValue(user.lastName)}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1 truncate">{user.email}</p>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  {/* Academic Information */}
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <FaIdCard className="text-gray-400 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 font-medium">Student No:</span>
                        <p className="text-gray-800 font-mono">{getDisplayValue(user.studentNumber)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <FaGraduationCap className="text-gray-400 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 font-medium">Faculty:</span>
                        <p className="text-gray-800">{getDisplayValue(user.faculty)}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <FaVenusMars className="text-gray-400 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 font-medium">Gender:</span>
                        <p className="text-gray-800">{getDisplayValue(user.gender)}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <FaCalendarAlt className="text-gray-400 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 font-medium">Joined:</span>
                        <p className="text-gray-800">
                          {user.dateOfJoining 
                            ? new Date(user.dateOfJoining).toLocaleDateString() 
                            : 'Please update'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center text-sm">
                      <FaPhone className="text-gray-400 mr-3 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 font-medium">Phone:</span>
                        <p className="text-gray-800">{user.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start text-sm">
                      <FaMapMarkerAlt className="text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 font-medium">Address:</span>
                        <p className="text-gray-800">{user.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Security Information */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <FaLock className="text-gray-400 text-sm" />
                      <span className="text-gray-500 font-medium text-sm">Password Status:</span>
                    </div>
                    <div className="mt-1 bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-green-700 text-xs font-medium">
                        🔒 Securely Encrypted
                      </p>
                      <p className="text-green-600 text-xs mt-1">
                        Password is securely hashed for protection
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Registered:</span> {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 flex gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2 font-semibold"
                  >
                    <FaEdit className="text-sm" />
                    <span>Update</span>
                  </button>
                  <button
                    onClick={() => handleRemove(user._id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2 font-semibold"
                  >
                    <FaTrash className="text-sm" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
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
  );
}