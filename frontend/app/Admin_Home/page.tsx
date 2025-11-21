"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaUserPlus, FaClipboardList, FaUserGraduate, FaChalkboardTeacher, FaBook, FaChartBar } from "react-icons/fa";
import Navigation from "../Components/Navigation";

export default function Admin_Home() {
  const router = useRouter();
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    // Fetch the user count from the backend
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/signup/count");
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    // Fetch the employee count from the backend
    const fetchEmployeeCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/employees/count"
        );
        const data = await response.json();
        setEmployeeCount(data.count);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    fetchUserCount();
    fetchEmployeeCount();
  }, []);

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
                            onClick={() => router.push("/Student_view")}
                          >
                            <FaUserGraduate className="text-white text-lg mr-3" />
                            <span className="font-medium">View Students</span>
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
          <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              {/* Icon and Title */}
              <div className="text-white text-3xl font-bold flex items-center space-x-2">
                <FaUserGraduate className="h-8 w-8 text-white" />
                <h1>Student Management System</h1>
              </div>
            </div>

            <div className="text-white">
              <p className="text-lg font-medium">
                Welcome to the Admin Dashboard
              </p>
            </div>
          </header>

          {/* Cards Section */}
          <section className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student Card */}
            <div
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => router.push("/Student_view")}
            >
              <div className="flex items-center space-x-6">
                <FaUserGraduate className="text-blue-500 text-5xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Registered Students
                  </h3>
                  <p className="mt-4">
                    <strong className="text-4xl text-blue-600 font-extrabold">
                      {userCount}
                    </strong>
                    <span className="text-gray-600 text-lg ml-2">Students</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Staff Card */}
            <div
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => router.push("/employeeview")}
            >
              <div className="flex items-center space-x-4">
                <FaChalkboardTeacher className="text-green-500 text-4xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Registered Staff
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <strong className="text-4xl text-green-600 font-extrabold">
                      {employeeCount}
                    </strong>
                    <span className="text-lg ml-2">Staff Members</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => router.push("/courses")}
            >
              <div className="flex items-center space-x-4">
                <FaBook className="text-purple-500 text-4xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Manage Courses</h3>
                  <p className="text-gray-600 mt-2">
                    Create and manage academic courses and curriculum.
                  </p>
                </div>
              </div>
            </div>

            {/* Reports Card */}
            <div
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => router.push("/reports")}
            >
              <div className="flex items-center space-x-4">
                <FaChartBar className="text-orange-500 text-4xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Academic Reports</h3>
                  <p className="text-gray-600 mt-2">
                    Generate and view academic performance reports.
                  </p>
                </div>
              </div>
            </div>

            {/* Register Staff Card */}
            <div
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => router.push("/employeeregister")}
            >
              <div className="flex items-center space-x-4">
                <FaUserPlus className="text-teal-500 text-4xl" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Add Staff</h3>
                  <p className="text-gray-600 mt-2">
                    Register new faculty and staff members.
                  </p>
                </div>
              </div>
            </div>

            {/* System Overview Card */}
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg text-white">
              <div className="flex items-center space-x-4">
                <FaUsers className="text-white text-4xl" />
                <div>
                  <h3 className="text-xl font-bold">System Overview</h3>
                  <p className="mt-2 text-blue-100">
                    Total Users: <strong>{userCount + employeeCount}</strong>
                  </p>
                  <p className="text-blue-100">
                    Active Academic Year: 2024
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}