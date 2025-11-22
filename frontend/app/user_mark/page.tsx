"use client";

import React, { useEffect, useState } from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaBook,
  FaGraduationCap,
  FaStar,
  FaCalendarAlt,
  FaDownload
} from "react-icons/fa";
import Navigation from "../Components/Navigation";

// Import jsPDF
import jsPDF from "jspdf";

interface Subject {
  code: string;
  name: string;
  marks: number;
}

interface Mark {
  _id: string;
  studentId: {
    _id: string;
    firstName: string;
    lastName: string;
    studentNumber: string;
  };
  academicYear: number;
  semester: number;
  examType: 'mid' | 'final';
  subjects: Subject[];
  totalMarks: number;
  caMarks?: number;
  createdAt: string;
}

export default function AcademicPerformancePage() {
  const [studentMarks, setStudentMarks] = useState<Mark[]>([]);
  const [marksLoading, setMarksLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);

  useEffect(() => {
    const fetchStudentMarks = async () => {
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const student = JSON.parse(userData);
          setStudentData(student);
          const response = await fetch(`http://localhost:3000/api/marks/student/${student._id}`);
          if (response.ok) {
            const data = await response.json();
            setStudentMarks(data.data || []);
          }
        }
      } catch (error) {
        console.error("Error fetching student marks:", error);
      } finally {
        setMarksLoading(false);
      }
    };

    fetchStudentMarks();
  }, []);

  // Group marks by academic year and semester
  const marksByYearAndSemester = studentMarks.reduce((acc, mark) => {
    const year = mark.academicYear;
    const semester = mark.semester;

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][semester]) {
      acc[year][semester] = [];
    }

    acc[year][semester].push(mark);
    return acc;
  }, {} as Record<number, Record<number, Mark[]>>);

  // Calculate statistics
  const totalExams = studentMarks.length;
  const midExams = studentMarks.filter(mark => mark.examType === 'mid').length;
  const finalExams = studentMarks.filter(mark => mark.examType === 'final').length;
  const averageMarks = studentMarks.length > 0
    ? Math.round(studentMarks.reduce((sum, mark) => sum + mark.totalMarks, 0) / studentMarks.length)
    : 0;

  // Download Result Sheet as PDF
  const handleDownloadResultSheet = () => {
    if (studentMarks.length === 0) {
      alert("No marks available to download.");
      return;
    }

    // Create new PDF document
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
      title: `Academic Result Sheet - ${studentData?.firstName} ${studentData?.lastName}`,
      subject: 'Student Academic Results',
      author: 'University Management System',
      keywords: 'academic, results, marks, transcript',
      creator: 'University Management System'
    });

    // Add university header
    doc.setFillColor(41, 128, 185);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT MANAGEMENT SYSTEM', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text('OFFICIAL ACADEMIC TRANSCRIPT', 105, 22, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let yPosition = 45;

    // Student Information
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('STUDENT INFORMATION', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${studentData?.firstName || 'N/A'} ${studentData?.lastName || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Student ID: ${studentData?.studentNumber || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Email: ${studentData?.email || 'N/A'}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Faculty: ${studentData?.faculty || 'Not specified'}`, 20, yPosition);
    yPosition += 10;

    // Academic Summary
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ACADEMIC SUMMARY', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Exams: ${totalExams}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Mid Examinations: ${midExams}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Final Examinations: ${finalExams}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Average Total Marks: ${averageMarks}%`, 20, yPosition);
    yPosition += 10;

    // Academic Performance by Year and Semester
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DETAILED ACADEMIC PERFORMANCE', 20, yPosition);
    yPosition += 10;

    Object.entries(marksByYearAndSemester).forEach(([year, semesters]) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`ACADEMIC YEAR ${year}`, 20, yPosition);
      yPosition += 8;

      Object.entries(semesters).forEach(([semester, marks]) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(`Semester ${semester}:`, 25, yPosition);
        yPosition += 6;

        marks.forEach((mark) => {
          // Check if we need a new page for this mark
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }

          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          const examType = mark.examType === 'mid' ? 'MID EXAMINATION' : 'FINAL EXAMINATION';
          doc.text(`${examType} - Total: ${mark.totalMarks}%`, 30, yPosition);
          yPosition += 5;

          // Subjects
          mark.subjects.forEach((subject) => {
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 20;
            }

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            const subjectText = `${subject.code} - ${subject.name}: ${subject.marks}%`;
            doc.text(subjectText, 35, yPosition);
            yPosition += 4;
          });

          // CA Marks if available
          if (mark.caMarks) {
            if (yPosition > 270) {
              doc.addPage();
              yPosition = 20;
            }
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text(`Continuous Assessment: ${mark.caMarks}%`, 35, yPosition);
            yPosition += 5;
          }

          yPosition += 3; // Space between exams
        });

        yPosition += 3; // Space between semesters
      });

      yPosition += 5; // Space between years
    });

    // Add footer
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Official transcript generated on ${currentDate}`, 105, 285, { align: 'center' });
    doc.text('This is an official document. Unauthorized duplication is prohibited.', 105, 290, { align: 'center' });

    // Save the PDF
    const fileName = `Academic_Transcript_${studentData?.studentNumber || `${studentData?.firstName}_${studentData?.lastName}`}.pdf`;
    doc.save(fileName);
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section with Download Button */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Academic Performance</h1>
            <p className="text-gray-600 text-sm mb-4">Your comprehensive academic results and examination performance</p>

            {/* Download Result Sheet Button */}
            {studentMarks.length > 0 && (
              <div className="flex justify-center mb-4">
                <button
                  onClick={handleDownloadResultSheet}
                  className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaDownload className="text-sm" />
                  <span>Download Result Sheet</span>
                </button>
              </div>
            )}
          </div>

          {/* Academic Performance Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaChartBar className="text-white text-xl" />
                  <div>
                    <h2 className="text-xl font-bold">Academic Performance</h2>
                    <p className="text-green-100 text-sm">Your marks and examination results</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-green-100 text-sm">Total Exams</p>
                  <p className="text-2xl font-bold">{totalExams}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaClipboardList className="text-blue-600 text-lg" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Total Exams</h3>
                  <p className="text-xl font-bold text-blue-600">{totalExams}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaBook className="text-purple-600 text-lg" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Mid Exams</h3>
                  <p className="text-xl font-bold text-purple-600">{midExams}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaGraduationCap className="text-green-600 text-lg" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Final Exams</h3>
                  <p className="text-xl font-bold text-green-600">{finalExams}</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaStar className="text-orange-600 text-lg" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">Average Marks</h3>
                  <p className="text-xl font-bold text-orange-600">{averageMarks}</p>
                </div>
              </div>

              {/* Marks Display */}
              {marksLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-t-2 border-green-500 border-solid rounded-full animate-spin mx-auto mb-3"></div>
                  <div className="text-gray-600">Loading your marks...</div>
                </div>
              ) : studentMarks.length === 0 ? (
                <div className="text-center py-8">
                  <FaClipboardList className="text-4xl text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Marks Available</h3>
                  <p className="text-gray-500 text-sm">Your examination marks will appear here once they are recorded.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(marksByYearAndSemester).map(([year, semesters]) => (
                    <div key={year} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <FaCalendarAlt className="mr-2 text-blue-600" />
                        Year {year} Academic Performance
                      </h3>

                      <div className="space-y-4">
                        {Object.entries(semesters).map(([semester, marks]) => (
                          <div key={semester} className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-700 mb-3">Semester {semester}</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {marks.map((mark) => (
                                <div key={mark._id} className={`border rounded-lg p-4 ${mark.examType === 'mid'
                                    ? 'border-blue-200 bg-blue-50'
                                    : 'border-green-200 bg-green-50'
                                  }`}>
                                  <div className="flex justify-between items-center mb-3">
                                    <span className={`font-semibold ${mark.examType === 'mid' ? 'text-blue-700' : 'text-green-700'
                                      }`}>
                                      {mark.examType === 'mid' ? 'Mid Examination' : 'Final Examination'}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${mark.examType === 'mid'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-green-100 text-green-800'
                                      }`}>
                                      Total: {mark.totalMarks}
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {mark.subjects.map((subject, idx) => (
                                      <div key={idx} className="flex justify-between items-center text-sm">
                                        <div>
                                          <span className="font-medium text-gray-700">{subject.code}</span>
                                          <span className="text-gray-500 ml-2">{subject.name}</span>
                                        </div>
                                        <span className={`font-semibold ${subject.marks >= 75 ? 'text-green-600' :
                                            subject.marks >= 50 ? 'text-yellow-600' : 'text-red-600'
                                          }`}>
                                          {subject.marks}%
                                        </span>
                                      </div>
                                    ))}
                                  </div>

                                  {mark.caMarks && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                      <div className="flex justify-between items-center text-sm">
                                        <span className="text-purple-600 font-semibold">Continuous Assessment:</span>
                                        <span className="text-purple-600 font-bold">{mark.caMarks}%</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}