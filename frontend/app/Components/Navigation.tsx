"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaUserGraduate, FaInfoCircle, FaEnvelope, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaBook, FaChartBar } from "react-icons/fa";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  // Initialize email from localStorage on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmail(localStorage.getItem("email"));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    setEmail(null);
    router.push("/"); 
  };

  const handleProfile = () => {
    if (email) {
      router.push(`/profile/${email}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-5 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif font-bold text-white flex items-center space-x-2">
          <FaUserGraduate className="text-2xl" />
          <span>Student Management System</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex flex-col lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0 space-y-4 text-lg ${
            menuOpen ? "block absolute top-full left-0 right-0 bg-blue-600 z-50 p-4" : "hidden"
          }`}
        >
          <Link href="/" className="flex items-center space-x-2 hover:text-blue-200">
            <FaHome />
            <span>Home</span>
          </Link>
          {email && (
            <>
              <Link href="/students" className="flex items-center space-x-2 hover:text-blue-200">
                <FaUserGraduate />
                <span>Students</span>
              </Link>
              <Link href="/courses" className="flex items-center space-x-2 hover:text-blue-200">
                <FaBook />
                <span>Courses</span>
              </Link>
              <Link href="/reports" className="flex items-center space-x-2 hover:text-blue-200">
                <FaChartBar />
                <span>Reports</span>
              </Link>
            </>
          )}
          <Link href="/about" className="flex items-center space-x-2 hover:text-blue-200">
            <FaInfoCircle />
            <span>About Us</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-2 hover:text-blue-200">
            <FaEnvelope />
            <span>Contact</span>
          </Link>
        </div>

        {/* User Profile or Login/Signup Buttons */}
        <div className="relative">
          {email ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleProfile}
                className="flex items-center space-x-2 text-lg font-semibold px-4 py-2 rounded-md bg-blue-600 shadow-md hover:bg-blue-700 transition duration-300"
              >
                <FaUserCircle />
                <span>{email}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-lg font-semibold px-4 py-2 rounded-md bg-red-600 shadow-md hover:bg-red-700 transition duration-300"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                href="/Signup"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                <FaUserCircle />
                <span>Sign Up</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center space-x-2 border border-blue-600 text-blue-100 px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300"
              >
                <FaUserCircle />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}