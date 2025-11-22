"use client";

import React, { useEffect, useState } from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaBook,
  FaGraduationCap,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import Navigation from "../Components/Navigation";

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

  useEffect(() => {
    const fetchStudentMarks = async () => {
      try {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const studentData = JSON.parse(userData);
          const response = await fetch(`http://localhost:3000/api/marks/student/${studentData._id}`);
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

  return (
     <div>
          <Navigation />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Academic Performance</h1>
          <p className="text-gray-600 text-sm">Your comprehensive academic results and examination performance</p>
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
                              <div key={mark._id} className={`border rounded-lg p-4 ${
                                mark.examType === 'mid' 
                                  ? 'border-blue-200 bg-blue-50' 
                                  : 'border-green-200 bg-green-50'
                              }`}>
                                <div className="flex justify-between items-center mb-3">
                                  <span className={`font-semibold ${
                                    mark.examType === 'mid' ? 'text-blue-700' : 'text-green-700'
                                  }`}>
                                    {mark.examType === 'mid' ? 'Mid Examination' : 'Final Examination'}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    mark.examType === 'mid' 
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
                                      <span className={`font-semibold ${
                                        subject.marks >= 75 ? 'text-green-600' : 
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