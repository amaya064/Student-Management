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
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg relative">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo - Smaller and more compact */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <FaUserGraduate className="text-white text-sm" />
            </div>
            <span className="text-lg font-semibold text-white group-hover:text-blue-100 transition duration-200">
              Student System
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-xl p-2 rounded-lg hover:bg-white/10 transition duration-200 focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links - Better spacing and arrangement */}
          <div
            className={`lg:flex items-center space-x-1 ${
              menuOpen ? "block absolute top-full left-0 right-0 bg-blue-600 z-50 p-4 shadow-xl" : "hidden"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-1 space-y-2 lg:space-y-0">
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="text-sm" />
                <span>Home</span>
              </Link>
              
              {email && (
                <>
                  <Link 
                    href="/students" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 text-sm font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserGraduate className="text-sm" />
                    <span>Students</span>
                  </Link>
                  <Link 
                    href="/courses" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 text-sm font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaBook className="text-sm" />
                    <span>Courses</span>
                  </Link>
                  <Link 
                    href="/reports" 
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 text-sm font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaChartBar className="text-sm" />
                    <span>Reports</span>
                  </Link>
                </>
              )}
              
              <Link 
                href="/about" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <FaInfoCircle className="text-sm" />
                <span>About</span>
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/10 transition duration-200 text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                <FaEnvelope className="text-sm" />
                <span>Contact</span>
              </Link>
            </div>
          </div>

          {/* User Profile or Login/Signup Buttons - Compact and better arranged */}
          <div className="hidden lg:flex items-center space-x-2">
            {email ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleProfile}
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200"
                >
                  <FaUserCircle className="text-sm" />
                  <span className="max-w-32 truncate">{email}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 transition duration-200"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/Signup"
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200"
                >
                  <FaUserCircle className="text-sm" />
                  <span>Sign Up</span>
                </Link>
                <Link
                  href="/Admin"
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition duration-200"
                >
                  <FaUserCircle className="text-sm" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile user buttons */}
          <div className={`lg:hidden ${menuOpen ? "block mt-4" : "hidden"}`}>
            {email ? (
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    handleProfile();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200 w-full"
                >
                  <FaUserCircle className="text-sm" />
                  <span className="truncate">{email}</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 transition duration-200 w-full"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/Signup"
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition duration-200 text-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUserCircle className="text-sm" />
                  <span>Sign Up</span>
                </Link>
                <Link
                  href="/login"
                  className="flex items-center space-x-2 text-sm font-medium px-3 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition duration-200 text-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUserCircle className="text-sm" />
                  <span>Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}