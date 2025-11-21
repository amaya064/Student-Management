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
  FaComments
} from 'react-icons/fa';

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
      icon: <FaPhone className="text-2xl text-blue-600" />,
      title: "Phone Support",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm EST",
      link: "tel:+15551234567"
    },
    {
      icon: <FaEnvelope className="text-2xl text-green-600" />,
      title: "Email Support",
      details: "support@studentmanagementsystem.com",
      description: "We reply within 24 hours",
      link: "mailto:support@studentmanagementsystem.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-red-600" />,
      title: "Headquarters",
      details: "123 Education Drive, Suite 500",
      description: "Boston, MA 02108, United States",
      link: "https://maps.google.com"
    },
    {
      icon: <FaClock className="text-2xl text-purple-600" />,
      title: "Business Hours",
      details: "Monday - Friday: 8:00 AM - 6:00 PM",
      description: "Saturday: 9:00 AM - 2:00 PM EST",
      link: "#"
    }
  ];

  const supportOptions = [
    {
      title: "Technical Support",
      description: "Get help with system setup, troubleshooting, and technical issues",
      contact: "tech@studentmanagementsystem.com"
    },
    {
      title: "Sales Inquiries",
      description: "Learn about pricing, features, and implementation for your institution",
      contact: "sales@studentmanagementsystem.com"
    },
    {
      title: "Training & Onboarding",
      description: "Schedule training sessions for your staff and administrators",
      contact: "training@studentmanagementsystem.com"
    }
  ];

  const faqs = [
    {
      question: "How long does implementation typically take?",
      answer: "Most institutions are fully operational within 2-4 weeks, depending on size and requirements."
    },
    {
      question: "Do you offer customized solutions?",
      answer: "Yes, we provide tailored implementations to meet the specific needs of your educational institution."
    },
    {
      question: "What kind of training do you provide?",
      answer: "We offer comprehensive training sessions, documentation, and ongoing support for all users."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 30-day free trial for qualified educational institutions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            Get in touch with our team. We're here to help you transform your educational institution with our management solutions.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in Touch</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our dedicated support team is ready to assist you with any questions about our 
                Student Management System. Reach out to us through any of the following channels.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                  >
                    <div className="mr-4 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 font-medium">{item.details}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Media */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a href="#" className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-6">
                  <FaComments className="text-3xl text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-800">Send us a Message</h2>
                </div>

                {submitMessage && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name
                      </label>
                      <input
                        type="text"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your school or organization"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your contact number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <FaHeadset className="text-4xl text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Dedicated Support Channels</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our specialized teams are ready to assist you with different aspects of our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <a 
                  href={`mailto:${option.contact}`}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  {option.contact}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our Student Management System
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a href="#contact-form" className="text-blue-600 font-semibold hover:text-blue-700">
                Contact us directly
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Schedule a personalized demo and see how our Student Management System can transform your institution
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Schedule Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 Student Management System. All rights reserved.</p>
          <p className="text-gray-400 mt-2">
            Transforming education through innovative management solutions
          </p>
        </div>
      </footer>
    </div>
  );
}