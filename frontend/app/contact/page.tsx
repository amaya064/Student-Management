"use client";

import React, { useState } from 'react';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaPaperPlane,
    FaHeadset,
    FaComments,
    FaArrowRight,
    FaCheckCircle,
    FaStar
} from 'react-icons/fa';
import Navigation from '../Components/Navigation';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        institution: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Thank you for your message! We will get back to you within 24 hours.');
            setFormData({
                name: '',
                email: '',
                institution: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 2000);
    };

    const contactInfo = [
        {
            icon: <FaPhone className="text-2xl text-white" />,
            title: "Phone Support",
            details: "+1 (555) 123-4567",
            description: "Mon-Fri from 8am to 6pm EST",
            link: "tel:+15551234567",
            bgColor: "bg-gradient-to-br from-blue-500 to-blue-600"
        },
        {
            icon: <FaEnvelope className="text-2xl text-white" />,
            title: "Email Support",
            details: "support@edumanage.com",
            description: "We reply within 24 hours",
            link: "mailto:support@edumanage.com",
            bgColor: "bg-gradient-to-br from-green-500 to-green-600"
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl text-white" />,
            title: "Headquarters",
            details: "123 Education Drive, Suite 500",
            description: "Boston, MA 02108, United States",
            link: "https://maps.google.com",
            bgColor: "bg-gradient-to-br from-red-500 to-red-600"
        },
        {
            icon: <FaClock className="text-2xl text-white" />,
            title: "Business Hours",
            details: "Monday - Friday: 8:00 AM - 6:00 PM",
            description: "Saturday: 9:00 AM - 2:00 PM EST",
            link: "#",
            bgColor: "bg-gradient-to-br from-purple-500 to-purple-600"
        }
    ];

    const supportOptions = [
        {
            icon: "🔧",
            title: "Technical Support",
            description: "Get help with system setup, troubleshooting, and technical issues",
            contact: "tech@edumanage.com",
            features: ["24/7 Support", "Quick Response", "Expert Assistance"]
        },
        {
            icon: "💰",
            title: "Sales Inquiries",
            description: "Learn about pricing, features, and implementation for your institution",
            contact: "sales@edumanage.com",
            features: ["Custom Quotes", "Product Demos", "Implementation Planning"]
        },
        {
            icon: "🎓",
            title: "Training & Onboarding",
            description: "Schedule training sessions for your staff and administrators",
            contact: "training@edumanage.com",
            features: ["Live Training", "Documentation", "Ongoing Support"]
        }
    ];

    const faqs = [
        {
            question: "How long does implementation typically take?",
            answer: "Most institutions are fully operational within 2-4 weeks, depending on size and requirements. We provide a detailed implementation timeline during onboarding."
        },
        {
            question: "Do you offer customized solutions?",
            answer: "Yes, we provide tailored implementations to meet the specific needs of your educational institution. Our solutions scale from small schools to large universities."
        },
        {
            question: "What kind of training do you provide?",
            answer: "We offer comprehensive training sessions, detailed documentation, video tutorials, and ongoing support for all users including administrators, teachers, and staff."
        },
        {
            question: "Is there a free trial available?",
            answer: "Yes, we offer a 30-day free trial for qualified educational institutions. Experience all features with full support during your trial period."
        }
    ];

    const features = [
        "24/7 Customer Support",
        "99.9% Uptime Guarantee",
        "Secure Data Encryption",
        "Regular Feature Updates",
        "Dedicated Account Manager"
    ];

    return (
        <div>
            <Navigation />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                {/* Enhanced Header Section */}
                <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-20 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm border border-white/30">
                                <FaComments className="text-3xl text-white" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                Let's Connect
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Ready to transform your educational institution? Our team is here to help you every step of the way.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                        <FaCheckCircle className="text-green-400 mr-2" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Wave Divider */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-current text-white"></path>
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-current text-white"></path>
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current text-slate-50"></path>
                        </svg>
                    </div>
                </section>

                {/* Contact Information & Form */}
                <section className="py-20 -mt-8 relative z-20">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Enhanced Contact Information */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Get in Touch</h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                                        Our dedicated support team is ready to assist you with any questions about our
                                        Student Management System. We're committed to providing exceptional service.
                                    </p>

                                    {/* Contact Methods */}
                                    <div className="space-y-6 mb-8">
                                        {contactInfo.map((item, index) => (
                                            <a
                                                key={index}
                                                href={item.link}
                                                className="flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
                                            >
                                                <div className={`w-16 h-16 ${item.bgColor} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-lg mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-700 font-semibold mb-1">{item.details}</p>
                                                    <p className="text-gray-500 text-sm">{item.description}</p>
                                                </div>
                                                <FaArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors mt-2" />
                                            </a>
                                        ))}
                                    </div>

                                    {/* Social Media */}
                                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg text-white">
                                        <h3 className="font-bold text-xl mb-4">Follow Our Journey</h3>
                                        <p className="text-gray-300 mb-6">Stay updated with the latest features and educational insights.</p>
                                        <div className="flex space-x-4">
                                            <a href="#" className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                                                <FaLinkedin className="text-2xl" />
                                            </a>
                                            <a href="#" className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                                                <FaTwitter className="text-2xl" />
                                            </a>
                                            <a href="#" className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                                                <FaFacebook className="text-2xl" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced Contact Form */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
                                    <div className="flex items-center mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4">
                                            <FaPaperPlane className="text-2xl text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-4xl font-bold text-gray-800">Send us a Message</h2>
                                            <p className="text-gray-600 mt-2">We typically respond within 2 hours during business days</p>
                                        </div>
                                    </div>

                                    {submitMessage && (
                                        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl text-green-700 flex items-center">
                                            <FaCheckCircle className="text-2xl text-green-500 mr-4 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-lg">Message Sent Successfully!</p>
                                                <p className="text-green-600">{submitMessage}</p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                    Institution Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="institution"
                                                    value={formData.institution}
                                                    onChange={handleChange}
                                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                                    placeholder="Your school or organization"
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white"
                                                    placeholder="Your contact number"
                                                />
                                            </div>
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Subject *
                                            </label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white appearance-none"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="sales">Sales & Pricing</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="training">Training & Onboarding</option>
                                                <option value="partnership">Partnership Opportunity</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="group">
                                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50/50 hover:bg-white resize-none"
                                                placeholder="Tell us how we can help you transform your educational institution..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 px-8 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg hover:shadow-xl"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                                    Sending Your Message...
                                                </>
                                            ) : (
                                                <>
                                                    <FaPaperPlane className="mr-3" />
                                                    Send Message
                                                    <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Support Options */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl mb-6">
                                <FaHeadset className="text-3xl text-blue-600" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Specialized Support Channels</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Our expert teams are dedicated to providing comprehensive support across all aspects of our platform
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {supportOptions.map((option, index) => (
                                <div key={index} className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                                    <div className="text-4xl mb-6">{option.icon}</div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{option.title}</h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                                    <div className="space-y-2 mb-6">
                                        {option.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center text-gray-700">
                                                <FaStar className="text-yellow-500 mr-3 text-sm" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <a
                                        href={`mailto:${option.contact}`}
                                        className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors group/link"
                                    >
                                        {option.contact}
                                        <FaArrowRight className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Enhanced FAQ Section */}
                <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Quick answers to common questions about implementing and using our Student Management System
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                                    <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                                            <span className="text-blue-600 font-semibold">{index + 1}</span>
                                        </div>
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed pl-12">{faq.answer}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <p className="text-gray-600 text-lg mb-4">
                                Still have questions? We're here to help!
                            </p>
                            <a href="#contact-form" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                                <FaComments className="mr-3" />
                                Contact Us Directly
                                <FaArrowRight className="ml-2" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Enhanced CTA Section */}
                <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-6 text-center relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
                            Schedule a personalized demo and see how EduManage can transform your educational institution's administration
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                                <FaHeadset className="mr-3" />
                                Schedule Demo
                            </button>
                            <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                                Start Free Trial
                            </button>
                        </div>
                        <p className="text-blue-100 mt-6 text-sm">
                            No credit card required • 30-day free trial • Full support included
                        </p>
                    </div>
                </section>

                {/* Enhanced Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="container mx-auto px-6">
                        <div className="text-center">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                                    <FaHeadset className="text-xl text-white" />
                                </div>
                                <span className="text-2xl font-bold">EduManage</span>
                            </div>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                                Transforming education through innovative management solutions. Empowering institutions worldwide with cutting-edge technology.
                            </p>
                            <div className="flex justify-center space-x-6 mb-8">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a>
                            </div>
                            <p className="text-gray-500 text-sm">
                                &copy; 2024 EduManage Student Management System. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}