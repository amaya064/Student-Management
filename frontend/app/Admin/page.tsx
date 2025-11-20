"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserShield, FaUserGraduate, FaIdCard, FaKey } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import Link from "next/link";
import Navigation from "../Components/Navigation";

export default function Admin_Login() {
  const [adminCredentials, setAdminCredentials] = useState({
    name: "",
    institutionID: "",
    nic: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, institutionID, nic } = adminCredentials;
    if (
      name === "Admin" &&
      institutionID === "Admin123" &&
      nic === "200008104348"
    ) {
      router.push("/Admin_Home");
    } else {
      setError("Invalid admin credentials. Please try again.");
    }
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="w-full max-w-4xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaUserShield className="text-white text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Student Management System
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Welcome to the administrative portal. Please login to access the system management tools.
            </p>
          </div>

          {/* Admin Login Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserShield className="text-white text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Administrator Login</h2>
                <p className="text-gray-600 text-sm mt-2">System administrator access</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaIdCard className="text-gray-400 mr-3 text-lg" />
                    <input
                      type="text"
                      value={adminCredentials.name}
                      onChange={(e) =>
                        setAdminCredentials({
                          ...adminCredentials,
                          name: e.target.value,
                        })
                      }
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                      placeholder="Admin Name"
                      required
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaUserGraduate className="text-gray-400 mr-3 text-lg" />
                    <input
                      type="text"
                      value={adminCredentials.institutionID}
                      onChange={(e) =>
                        setAdminCredentials({
                          ...adminCredentials,
                          institutionID: e.target.value,
                        })
                      }
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                      placeholder="Institution ID"
                      required
                    />
                  </div>

                  <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                    <FaKey className="text-gray-400 mr-3 text-lg" />
                    <input
                      type="text"
                      value={adminCredentials.nic}
                      onChange={(e) =>
                        setAdminCredentials({
                          ...adminCredentials,
                          nic: e.target.value,
                        })
                      }
                      className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 text-sm"
                      placeholder="NIC Number"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <MdLogin className="mr-2" />
                  Admin Login
                </button>
              </form>
            </div>
          </div>

          {/* Student Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Are you a student?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition duration-200">
                Student Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}