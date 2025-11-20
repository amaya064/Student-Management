import React from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">Student Management System</h1>
          <p className="text-center mt-2">Efficiently manage student records and information</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Student Management System
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform to manage student information, track academic progress, 
            and streamline administrative tasks for educational institutions.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">👨‍🎓</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Records</h3>
            <p className="text-gray-600">
              Manage comprehensive student profiles including personal information, 
              academic records, and contact details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Academic Tracking</h3>
            <p className="text-gray-600">
              Monitor student performance, grades, attendance, and academic progress 
              throughout their educational journey.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Access</h3>
            <p className="text-gray-600">
              Easy-to-use interface with fast search and filtering capabilities 
              for efficient student information retrieval.
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Add New Student
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200">
              View All Students
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200">
              Generate Reports
            </button>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">System Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-blue-600">1,250</div>
              <div className="text-gray-600 text-sm">Total Students</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-green-600">45</div>
              <div className="text-gray-600 text-sm">Active Classes</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600 text-sm">Attendance Rate</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-2xl font-bold text-orange-600">32</div>
              <div className="text-gray-600 text-sm">Teaching Staff</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Student Management System. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            Designed for educational institutions to streamline student administration
          </p>
        </div>
      </footer>
    </div>
  )
}