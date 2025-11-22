import React from 'react'
import { 
  FaUserGraduate, 
  FaChartLine, 
  FaSearch, 
  FaUsers, 
  FaChalkboardTeacher, 
  FaCalendarCheck,
  FaAward,
  FaShieldAlt
} from 'react-icons/fa'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header with Gradient */}
      <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
              <FaUserGraduate className="text-3xl text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Student Management System
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform educational administration with our comprehensive student management platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-16"
          >
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-current text-white"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-current text-white"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-current text-blue-50"
            ></path>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 -mt-8 relative z-20">
        {/* Welcome Section */}
        <section className="text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            🎓 Trusted by Educational Institutions Worldwide
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Empowering Education Through 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Technology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform revolutionizes student management with cutting-edge features, 
            intuitive design, and powerful analytics to drive educational excellence.
          </p>
        </section>

        {/* Enhanced Features Grid */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUserGraduate className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Comprehensive Student Profiles</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Manage complete student records with detailed academic history, personal information, 
                and real-time performance tracking in one centralized platform.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Personal & academic information
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Attendance & grade tracking
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Document management
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaChartLine className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Gain valuable insights with comprehensive analytics and reporting tools to monitor 
                student progress and institutional performance.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Performance analytics
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Custom reports
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Predictive insights
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaSearch className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Search & Filters</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Quickly find and access student information with our intelligent search system 
                and advanced filtering capabilities.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Instant search results
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Advanced filtering
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Bulk operations
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Enhanced Statistics */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-40 -translate-x-40"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-12">System Performance Metrics</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <FaUsers className="text-2xl text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">1,250</div>
                  <div className="text-blue-200 font-semibold">Total Students</div>
                  <div className="text-blue-300 text-sm mt-1">+5.2% this month</div>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                    <FaChalkboardTeacher className="text-2xl text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">45</div>
                  <div className="text-green-200 font-semibold">Active Classes</div>
                  <div className="text-green-300 text-sm mt-1">12 new this semester</div>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <FaCalendarCheck className="text-2xl text-purple-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">98%</div>
                  <div className="text-purple-200 font-semibold">Attendance Rate</div>
                  <div className="text-purple-300 text-sm mt-1">+2.1% from last month</div>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors duration-300">
                    <FaAward className="text-2xl text-orange-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">32</div>
                  <div className="text-orange-200 font-semibold">Teaching Staff</div>
                  <div className="text-orange-300 text-sm mt-1">5 specialists added</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h3>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Built with modern technology and user experience at its core, our platform offers 
            unparalleled efficiency and reliability.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Secure & Reliable</h4>
              <p className="text-gray-600">Enterprise-grade security with 99.9% uptime</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaUserGraduate className="text-2xl text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">User-Friendly</h4>
              <p className="text-gray-600">Intuitive interface designed for all users</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-2xl text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Scalable</h4>
              <p className="text-gray-600">Grows with your institution's needs</p>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <FaUserGraduate className="text-white" />
                </div>
                <span className="text-xl font-bold">EduManage</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transforming educational administration with innovative technology solutions.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Student Management System. All rights reserved. | 
              <span className="text-blue-400 ml-1">Designed with ❤️ for education</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}