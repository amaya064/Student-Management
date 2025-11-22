"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaChartBar,
  FaPlusCircle
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  return (
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
            className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
            onClick={() => router.push("/course_view")}
          >
            <FaBook className="text-white text-lg mr-3" />
            <span className="font-medium">Manage Courses</span>
          </li>
          <li
            className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
            onClick={() => router.push("/student_add")}
          >
            <FaUserGraduate className="text-white text-lg mr-3" />
            <span className="font-medium">Add Students</span>
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
            onClick={() => router.push("/mark_add")}
          >
            <FaChartBar className="text-white text-lg mr-3" />
            <span className="font-medium">Add mark</span>
          </li>
          <li
            className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
            onClick={() => router.push("/mark_view")}
          >
            <FaChartBar className="text-white text-lg mr-3" />
            <span className="font-medium">View mark</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}