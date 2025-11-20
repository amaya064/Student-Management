"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserGraduate, FaEnvelope, FaLock, FaSpinner, FaSignInAlt } from 'react-icons/fa';
import Navigation from "../Components/Navigation";

interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

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
      const res = await fetch("http://localhost:3000/api/signup/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Signin failed. Please try again.');
        return;
      }

      setError(null);

      localStorage.setItem('email', formData.email);
      localStorage.setItem('userData', JSON.stringify(data.user));

      router.push("/"); 
    } catch (error: unknown) {
      console.error("Error:", error);
      setLoading(false);
      
      if (error instanceof Error) {
        setError(error.message || "An unexpected error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navigation />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaSignInAlt className="text-white text-lg" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 text-sm">
              Sign in to your Student Management System account
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
                <FaEnvelope className="text-gray-400 mr-3 text-lg" />
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
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <FaSignInAlt className="mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/Signup" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition duration-200">
                Create Account
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
                Access your academic dashboard and manage your student profile
              </p>
            </div>

            <div className="space-y-3 text-left">
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">📊</span>
                </div>
                <span className="text-blue-50 text-sm">View academic progress</span>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">📚</span>
                </div>
                <span className="text-blue-50 text-sm">Access course materials</span>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">👤</span>
                </div>
                <span className="text-blue-50 text-sm">Manage your profile</span>
              </div>
              
              <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xs">🎯</span>
                </div>
                <span className="text-blue-50 text-sm">Track your goals</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <p className="text-blue-200 text-xs">
                Join thousands of students managing their academic journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}