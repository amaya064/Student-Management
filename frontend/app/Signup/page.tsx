"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserGraduate, FaUser, FaPhoneAlt, FaMapMarkedAlt, FaLock } from 'react-icons/fa';

// Define types for form data
interface FormData {
  email: string;
  password: string;
  phone: string;
  address: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Component loaded");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Signup failed. Please try again.');
        return;
      }

      setError(null);
      router.push("/signin");
    } catch (error: unknown) {
      console.error("Error:", error);
      setLoading(false);
      
      // Handle different error types safely
      if (error instanceof Error) {
        setError(error.message || "An unexpected error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUserGraduate className="text-white text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Student Account</h2>
            <p className="text-gray-600 text-sm">
              Join the Student Management System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                <FaUser className="text-gray-400 mr-3 text-lg" />
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                <FaLock className="text-gray-400 mr-3 text-lg" />
                <input
                  type="password"
                  id="password"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                <FaPhoneAlt className="text-gray-400 mr-3 text-lg" />
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                <FaMapMarkedAlt className="text-gray-400 mr-3 text-lg" />
                <input
                  type="text"
                  id="address"
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                  placeholder="Address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                'Create Student Account'
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/Signin" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition duration-200">
                Sign In Here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section - Info */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 lg:p-12 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-lg">
                <FaUserGraduate className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Student Management System</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Your gateway to seamless academic management and student success
              </p>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <span className="text-blue-50 text-sm">Track academic progress</span>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <span className="text-blue-50 text-sm">Access course materials</span>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <span className="text-blue-50 text-sm">Manage personal profile</span>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">✓</span>
                </div>
                <span className="text-blue-50 text-sm">Stay connected with faculty</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-blue-200 text-xs">
                Join thousands of students already managing their academic journey with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}