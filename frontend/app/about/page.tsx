import React from 'react';
import {
    FaGraduationCap,
    FaUsers,
    FaChartLine,
    FaShieldAlt,
    FaMobileAlt,
    FaCloud,
    FaAward,
    FaHandsHelping
} from 'react-icons/fa';
import Navigation from '../Components/Navigation';

export default function About() {
    const features = [
        {
            icon: <FaGraduationCap className="text-3xl text-blue-600" />,
            title: "Student Management",
            description: "Comprehensive student profiles with academic records, attendance tracking, and performance analytics."
        },
        {
            icon: <FaUsers className="text-3xl text-green-600" />,
            title: "Course Administration",
            description: "Efficient course creation, enrollment management, and curriculum organization for optimal academic delivery."
        },
        {
            icon: <FaChartLine className="text-3xl text-purple-600" />,
            title: "Advanced Analytics",
            description: "Real-time insights and reporting tools to monitor institutional performance and student progress."
        },
        {
            icon: <FaShieldAlt className="text-3xl text-red-600" />,
            title: "Secure Platform",
            description: "Enterprise-grade security with role-based access control and data encryption protocols."
        },
        {
            icon: <FaMobileAlt className="text-3xl text-orange-600" />,
            title: "Mobile Responsive",
            description: "Seamless experience across all devices with intuitive interface design and optimized performance."
        },
        {
            icon: <FaCloud className="text-3xl text-cyan-600" />,
            title: "Cloud-Based",
            description: "Scalable cloud infrastructure ensuring high availability, reliability, and automatic updates."
        }
    ];

    const stats = [
        { number: "50,000+", label: "Students Managed" },
        { number: "500+", label: "Educational Institutions" },
        { number: "99.9%", label: "System Uptime" },
        { number: "24/7", label: "Support Available" }
    ];

    const team = [
        {
            name: "Dr. Sarah Johnson",
            role: "Chief Education Officer",
            bio: "Former university dean with 15+ years in educational technology and curriculum development."
        },
        {
            name: "Michael Chen",
            role: "Lead Developer",
            bio: "Full-stack developer specializing in scalable educational platforms and data security."
        },
        {
            name: "Emily Rodriguez",
            role: "Product Manager",
            bio: "Expert in user experience design and educational workflow optimization."
        },
        {
            name: "David Thompson",
            role: "Support Director",
            bio: "Dedicated to ensuring seamless implementation and ongoing customer success."
        }
    ];

    return (
        <div>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-5xl font-bold mb-6">About Student Management System</h1>
                        <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                            Transforming educational administration through innovative technology solutions.
                            Our platform empowers institutions to streamline operations, enhance student engagement,
                            and drive academic excellence.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Get Started
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    To revolutionize educational management by providing institutions with powerful,
                                    intuitive tools that simplify administrative tasks, foster student success, and
                                    enable data-driven decision making.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We believe that technology should enhance, not complicate, the educational experience.
                                    Our solutions are designed to work seamlessly with existing workflows while providing
                                    transformative capabilities.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-lg leading-relaxed">
                                    To create a world where educational institutions can focus on what matters most -
                                    teaching and learning - while our platform handles the complexities of administration,
                                    data management, and institutional analytics.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Comprehensive tools designed to meet the diverse needs of modern educational institutions
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Trusted by Educators Worldwide</h2>
                            <p className="text-xl opacity-90">Proven results across diverse educational environments</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-blue-100 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Leadership Team</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Experienced professionals dedicated to advancing educational technology
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="bg-gradient-to-br from-blue-100 to-indigo-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaAward className="text-3xl text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Values</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center p-6">
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaHandsHelping className="text-2xl text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Collaboration</h3>
                                <p className="text-gray-600">
                                    We work closely with educational institutions to understand their unique challenges
                                    and develop tailored solutions.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaChartLine className="text-2xl text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
                                <p className="text-gray-600">
                                    Continuously evolving our platform with cutting-edge features and emerging technologies
                                    in education.
                                </p>
                            </div>
                            <div className="text-center p-6">
                                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaShieldAlt className="text-2xl text-orange-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Security</h3>
                                <p className="text-gray-600">
                                    Protecting sensitive educational data with enterprise-level security measures and
                                    compliance standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Institution?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                            Join thousands of educational institutions already benefiting from our Student Management System
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Start Free Trial
                            </button>
                            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-6 text-center">
                        <p>&copy; 2024 Student Management System. All rights reserved.</p>
                        <p className="text-gray-400 mt-2">
                            Empowering education through innovative technology solutions
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}