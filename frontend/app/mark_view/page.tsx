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
    const [expandedStudents, setExpandedStudents] = useState<Set<string>>(new Set());

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

    const toggleStudentExpansion = (studentId: string) => {
        const newExpanded = new Set(expandedStudents);
        if (newExpanded.has(studentId)) {
            newExpanded.delete(studentId);
        } else {
            newExpanded.add(studentId);
        }
        setExpandedStudents(newExpanded);
    };

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
                <div className="min-h-screen bg-gray-100 py-8 flex-1">
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

                        {/* Compact Table View */}
                        {Object.keys(marksByStudent).length === 0 ? (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <div className="text-gray-500 text-lg">
                                    {marks.length === 0 ? 'No marks data available' : 'No marks match your filters'}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                {/* Table Header */}
                                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                                    <div className="col-span-3">Student Information</div>
                                    <div className="col-span-2 text-center">Academic Year</div>
                                    <div className="col-span-2 text-center">Semester</div>
                                    <div className="col-span-2 text-center">Exam Type</div>
                                    <div className="col-span-2 text-center">Total Marks</div>
                                    <div className="col-span-1 text-center">Actions</div>
                                </div>

                                {/* Student Rows */}
                                <div className="divide-y divide-gray-200">
                                    {Object.entries(marksByStudent).map(([studentId, { student, marks: studentMarks }]) => (
                                        <div key={studentId} className="bg-white">
                                            {/* Student Summary Row */}
                                            <div
                                                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                                onClick={() => toggleStudentExpansion(studentId)}
                                            >
                                                <div className="col-span-3">
                                                    <div className="font-medium text-gray-900">
                                                        {student.firstName} {student.lastName}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        ID: {student.studentNumber}
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-center text-gray-700">
                                                    Year {Math.min(...studentMarks.map(m => m.academicYear))} - {Math.max(...studentMarks.map(m => m.academicYear))}
                                                </div>
                                                <div className="col-span-2 text-center text-gray-700">
                                                    {[...new Set(studentMarks.map(m => m.semester))].sort().join(', ')}
                                                </div>
                                                <div className="col-span-2 text-center">
                                                    <div className="inline-flex flex-col gap-1">
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                            Mid: {studentMarks.filter(m => m.examType === 'mid').length}
                                                        </span>
                                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                            Final: {studentMarks.filter(m => m.examType === 'final').length}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-center">
                                                    <div className="text-lg font-semibold text-gray-900">
                                                        {Math.round(studentMarks.reduce((sum, mark) => sum + mark.totalMarks, 0) / studentMarks.length)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Average</div>
                                                </div>
                                                <div className="col-span-1 text-center">
                                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                                        {expandedStudents.has(studentId) ? 'Hide' : 'View'} Details
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expanded Details */}
                                            {expandedStudents.has(studentId) && (
                                                <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                                                    <div className="space-y-4">
                                                        {/* Group by Year and Semester */}
                                                        {[1, 2, 3, 4].map(year => {
                                                            const yearMarks = studentMarks.filter(m => m.academicYear === year);
                                                            if (yearMarks.length === 0) return null;

                                                            return (
                                                                <div key={year} className="border border-gray-200 rounded-lg bg-white">
                                                                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                                                                        <h4 className="font-semibold text-gray-800">Year {year}</h4>
                                                                    </div>
                                                                    <div className="p-4">
                                                                        {[1, 2].map(semester => {
                                                                            const semesterMarks = yearMarks.filter(m => m.semester === semester);
                                                                            if (semesterMarks.length === 0) return null;

                                                                            return (
                                                                                <div key={semester} className="mb-4 last:mb-0">
                                                                                    <h5 className="font-medium text-gray-700 mb-2">Semester {semester}</h5>
                                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                                        {/* Mid Exams */}
                                                                                        {semesterMarks.filter(m => m.examType === 'mid').map(midExam => (
                                                                                            <div key={midExam._id} className="border border-blue-200 rounded p-3 bg-blue-50">
                                                                                                <div className="flex justify-between items-center mb-2">
                                                                                                    <span className="font-semibold text-blue-800 text-sm">Mid Exam</span>
                                                                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                                                                        Total: {midExam.totalMarks}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="space-y-1">
                                                                                                    {midExam.subjects.map((subject, idx) => (
                                                                                                        <div key={idx} className="flex justify-between items-center text-xs">
                                                                                                            <span className="text-gray-600 truncate">
                                                                                                                {subject.code}: {subject.name}
                                                                                                            </span>
                                                                                                            <span className={`font-medium ${subject.marks >= 75 ? 'text-green-600' :
                                                                                                                    subject.marks >= 50 ? 'text-yellow-600' : 'text-red-600'
                                                                                                                }`}>
                                                                                                                {subject.marks}%
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}

                                                                                        {/* Final Exams */}
                                                                                        {semesterMarks.filter(m => m.examType === 'final').map(finalExam => (
                                                                                            <div key={finalExam._id} className="border border-green-200 rounded p-3 bg-green-50">
                                                                                                <div className="flex justify-between items-center mb-2">
                                                                                                    <span className="font-semibold text-green-800 text-sm">Final Exam</span>
                                                                                                    <div className="flex gap-1">
                                                                                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                                                                                            Total: {finalExam.totalMarks}
                                                                                                        </span>
                                                                                                        {finalExam.caMarks && (
                                                                                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                                                                                                CA: {finalExam.caMarks}%
                                                                                                            </span>
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="space-y-1">
                                                                                                    {finalExam.subjects.map((subject, idx) => (
                                                                                                        <div key={idx} className="flex justify-between items-center text-xs">
                                                                                                            <span className="text-gray-600 truncate">
                                                                                                                {subject.code}: {subject.name}
                                                                                                            </span>
                                                                                                            <span className={`font-medium ${subject.marks >= 75 ? 'text-green-600' :
                                                                                                                    subject.marks >= 50 ? 'text-yellow-600' : 'text-red-600'
                                                                                                                }`}>
                                                                                                                {subject.marks}%
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
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