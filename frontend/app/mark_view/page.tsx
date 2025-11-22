"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import Sidebar from '../Components/Sidebar';

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

export default function MarksViewPage() {
    const [marks, setMarks] = useState<Mark[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterYear, setFilterYear] = useState<string>('all');
    const [filterSemester, setFilterSemester] = useState<string>('all');
    const [filterExamType, setFilterExamType] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all marks from database
    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/marks');
                const data = await response.json();
                if (data.success) {
                    setMarks(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching marks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, []);

    // Filter marks based on selected filters and search term
    const filteredMarks = marks.filter(mark => {
        const matchesYear = filterYear === 'all' || mark.academicYear.toString() === filterYear;
        const matchesSemester = filterSemester === 'all' || mark.semester.toString() === filterSemester;
        const matchesExamType = filterExamType === 'all' || mark.examType === filterExamType;

        const studentName = `${mark.studentId.firstName} ${mark.studentId.lastName}`.toLowerCase();
        const studentNumber = mark.studentId.studentNumber.toLowerCase();
        const searchLower = searchTerm.toLowerCase();

        const matchesSearch = searchTerm === '' ||
            studentName.includes(searchLower) ||
            studentNumber.includes(searchLower) ||
            mark.subjects.some(subject =>
                subject.code.toLowerCase().includes(searchLower) ||
                subject.name.toLowerCase().includes(searchLower)
            );

        return matchesYear && matchesSemester && matchesExamType && matchesSearch;
    });

    // Group marks by student for better organization
    const marksByStudent = filteredMarks.reduce((acc, mark) => {
        const studentId = mark.studentId._id;
        if (!acc[studentId]) {
            acc[studentId] = {
                student: mark.studentId,
                marks: []
            };
        }
        acc[studentId].marks.push(mark);
        return acc;
    }, {} as Record<string, { student: any; marks: Mark[] }>);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl font-semibold text-gray-600">Loading marks data...</div>
            </div>
        );
    }

    return (
        <div>
            <Navigation />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                Student Marks Overview
                            </h1>
                            <p className="text-lg text-gray-600">
                                View and manage all student academic marks and performance
                            </p>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{marks.length}</div>
                                <div className="text-gray-600">Total Exam Records</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {Object.keys(marksByStudent).length}
                                </div>
                                <div className="text-gray-600">Students with Marks</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {marks.filter(m => m.examType === 'mid').length}
                                </div>
                                <div className="text-gray-600">Mid Exams</div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">
                                    {marks.filter(m => m.examType === 'final').length}
                                </div>
                                <div className="text-gray-600">Final Exams</div>
                            </div>
                        </div>

                        {/* Filters and Search */}
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {/* Search */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search Students or Subjects
                                    </label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search by name, student number, or subject..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    />
                                </div>

                                {/* Year Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Academic Year
                                    </label>
                                    <select
                                        value={filterYear}
                                        onChange={(e) => setFilterYear(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    >
                                        <option value="all">All Years</option>
                                        <option value="1">Year 1</option>
                                        <option value="2">Year 2</option>
                                        <option value="3">Year 3</option>
                                        <option value="4">Year 4</option>
                                    </select>
                                </div>

                                {/* Semester Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Semester
                                    </label>
                                    <select
                                        value={filterSemester}
                                        onChange={(e) => setFilterSemester(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    >
                                        <option value="all">All Semesters</option>
                                        <option value="1">Semester 1</option>
                                        <option value="2">Semester 2</option>
                                    </select>
                                </div>

                                {/* Exam Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Exam Type
                                    </label>
                                    <select
                                        value={filterExamType}
                                        onChange={(e) => setFilterExamType(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                                    >
                                        <option value="all">All Exams</option>
                                        <option value="mid">Mid Exam</option>
                                        <option value="final">Final Exam</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Marks Display */}
                        {Object.keys(marksByStudent).length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <div className="text-gray-500 text-lg">
                                    {marks.length === 0 ? 'No marks data available' : 'No marks match your filters'}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {Object.entries(marksByStudent).map(([studentId, { student, marks: studentMarks }]) => (
                                    <div key={studentId} className="bg-white rounded-lg shadow overflow-hidden">
                                        {/* Student Header */}
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-2xl font-bold">
                                                        {student.firstName} {student.lastName}
                                                    </h3>
                                                    <p className="text-blue-100">Student Number: {student.studentNumber}</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold">
                                                        Total Exam Records: {studentMarks.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Marks by Academic Year */}
                                        <div className="p-6">
                                            {[1, 2, 3, 4].map(year => {
                                                const yearMarks = studentMarks.filter(m => m.academicYear === year);
                                                if (yearMarks.length === 0) return null;

                                                return (
                                                    <div key={year} className="mb-8 last:mb-0">
                                                        <h4 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                                                            Year {year} Academic Performance
                                                        </h4>

                                                        {/* Semesters */}
                                                        {[1, 2].map(semester => {
                                                            const semesterMarks = yearMarks.filter(m => m.semester === semester);
                                                            if (semesterMarks.length === 0) return null;

                                                            return (
                                                                <div key={semester} className="mb-6 last:mb-0">
                                                                    <h5 className="text-lg font-medium text-gray-700 mb-3">
                                                                        Semester {semester}
                                                                    </h5>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                        {/* Mid Exam */}
                                                                        {semesterMarks.filter(m => m.examType === 'mid').map(midExam => (
                                                                            <div key={midExam._id} className="border border-gray-200 rounded-lg p-4">
                                                                                <div className="flex justify-between items-center mb-3">
                                                                                    <h6 className="font-semibold text-gray-800">Mid Examination</h6>
                                                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                                                                        Total: {midExam.totalMarks}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    {midExam.subjects.map((subject, idx) => (
                                                                                        <div key={idx} className="flex justify-between items-center text-sm">
                                                                                            <span className="text-gray-600">
                                                                                                {subject.code} - {subject.name}
                                                                                            </span>
                                                                                            <span className="font-medium text-gray-800">
                                                                                                {subject.marks}%
                                                                                            </span>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}

                                                                        {/* Final Exam */}
                                                                        {semesterMarks.filter(m => m.examType === 'final').map(finalExam => (
                                                                            <div key={finalExam._id} className="border border-gray-200 rounded-lg p-4">
                                                                                <div className="flex justify-between items-center mb-3">
                                                                                    <h6 className="font-semibold text-gray-800">Final Examination</h6>
                                                                                    <div className="flex items-center space-x-2">
                                                                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                                                                            Total: {finalExam.totalMarks}
                                                                                        </span>
                                                                                        {finalExam.caMarks && (
                                                                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
                                                                                                CA: {finalExam.caMarks}%
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    {finalExam.subjects.map((subject, idx) => (
                                                                                        <div key={idx} className="flex justify-between items-center text-sm">
                                                                                            <span className="text-gray-600">
                                                                                                {subject.code} - {subject.name}
                                                                                            </span>
                                                                                            <span className="font-medium text-gray-800">
                                                                                                {subject.marks}%
                                                                                            </span>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                {finalExam.caMarks && (
                                                                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                                                                        <div className="flex justify-between items-center text-sm font-semibold">
                                                                                            <span>Continuous Assessment (CA):</span>
                                                                                            <span className="text-purple-600">{finalExam.caMarks}%</span>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Summary Statistics */}
                        {filteredMarks.length > 0 && (
                            <div className="mt-8 bg-white rounded-lg shadow p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary Statistics</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {filteredMarks.length}
                                        </div>
                                        <div className="text-gray-600">Filtered Records</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {Math.round(filteredMarks.reduce((sum, mark) => sum + mark.totalMarks, 0) / filteredMarks.length)}
                                        </div>
                                        <div className="text-gray-600">Average Total Marks</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {filteredMarks.filter(m => m.caMarks).length}
                                        </div>
                                        <div className="text-gray-600">Students with CA Marks</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}