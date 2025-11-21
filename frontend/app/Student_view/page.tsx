"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaUsers, FaUserGraduate, FaBook, FaChartBar, FaTrash, FaEdit, FaLock } from "react-icons/fa";

interface User {
  _id: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: string;
}

export default function User_view() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [updateForm, setUpdateForm] = useState({
    phone: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);

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
      phone: user.phone,
      address: user.address
    });
  };

  // Close update modal
  const handleCloseModal = () => {
    setEditingUser(null);
    setUpdateForm({ phone: "", address: "" });
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
            ? { ...user, phone: updateForm.phone, address: updateForm.address }
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
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
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
            Registered Students
          </h1>
          <p className="text-gray-600 text-center text-lg">
            Manage student accounts and information
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
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      Student
                    </span>
                  </div>
                  <h2 className="text-xl font-bold truncate">{user.email}</h2>
                  <p className="text-blue-100 text-sm mt-1">Registered Student</p>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 font-medium">Phone:</span>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">Joined:</span>
                      <p className="text-gray-800">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-500 font-medium text-sm">Address:</span>
                    <p className="text-gray-800 text-sm mt-1">{user.address}</p>
                  </div>

                  <div>
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
                  
                  <div>
                    <span className="text-gray-500 font-medium text-sm">Student ID:</span>
                    <p className="text-gray-800 text-sm mt-1 font-mono">
                      {user._id.substring(0, 8)}...
                    </p>
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
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Update Student</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    disabled
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={updateForm.phone}
                    onChange={(e) => setUpdateForm({ ...updateForm, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    value={updateForm.address}
                    onChange={(e) => setUpdateForm({ ...updateForm, address: e.target.value })}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
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
                      "Update Student"
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