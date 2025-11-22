"use client";

import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import Sidebar from '../Components/Sidebar';

interface Student {
    _id: string;
    firstName: string;
    lastName: string;
    studentNumber: string;
}

interface Subject {
    code: string;
    name: string;
    marks: number;
}

interface MarkData {
    studentId: string;
    academicYear: number;
    semester: number;
    examType: 'mid' | 'final';
    subjects: Subject[];
    totalMarks: number;
}

export default function MarksEntryPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<string>('');
    const [academicYear, setAcademicYear] = useState<number>(1);
    const [semester, setSemester] = useState<number>(1);
    const [examType, setExamType] = useState<'mid' | 'final'>('mid');
    const [subjects, setSubjects] = useState<Subject[]>([{ code: '', name: '', marks: 0 }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [existingMarks, setExistingMarks] = useState<any[]>([]);

    // Fetch students from database
    useEffect(() => {
        fetchStudents();
    }, []);

    // Fetch existing marks when student is selected
    useEffect(() => {
        if (selectedStudent) {
            fetchStudentMarks(selectedStudent);
        } else {
            setExistingMarks([]);
        }
    }, [selectedStudent]);

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/employees/users');
            const data = await response.json();
            setStudents(data.data || []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchStudentMarks = async (studentId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/marks/student/${studentId}`);
            const data = await response.json();
            if (data.success) {
                setExistingMarks(data.data || []);
            }
        } catch (error) {
            console.error('Error fetching student marks:', error);
        }
    };

    const addSubjectField = () => {
        setSubjects([...subjects, { code: '', name: '', marks: 0 }]);
    };

    const removeSubjectField = (index: number) => {
        if (subjects.length > 1) {
            const newSubjects = subjects.filter((_, i) => i !== index);
            setSubjects(newSubjects);
        }
    };

    const updateSubject = (index: number, field: keyof Subject, value: string | number) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value as never;
        setSubjects(newSubjects);
    };

    // Check if exam already exists
    const examExists = (year: number, semester: number, type: 'mid' | 'final') => {
        return existingMarks.some(mark =>
            mark.academicYear === year &&
            mark.semester === semester &&
            mark.examType === type
        );
    };

    // Check if year is completed
    const isYearCompleted = (year: number) => {
        return examExists(year, 1, 'mid') &&
            examExists(year, 1, 'final') &&
            examExists(year, 2, 'mid') &&
            examExists(year, 2, 'final');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedStudent) {
            alert('Please select a student');
            return;
        }

        if (subjects.some(subject => !subject.code || !subject.name)) {
            alert('Please fill all subject fields');
            return;
        }

        if (examExists(academicYear, semester, examType)) {
            alert(`This student already has ${examType} exam marks for Year ${academicYear} Semester ${semester}`);
            return;
        }

        setLoading(true);
        setMessage('');

        const markData: MarkData = {
            studentId: selectedStudent,
            academicYear,
            semester,
            examType,
            subjects,
            totalMarks: subjects.reduce((sum, subject) => sum + subject.marks, 0)
        };

        try {
            const response = await fetch('http://localhost:3000/api/marks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(markData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Marks added successfully!');
                fetchStudentMarks(selectedStudent);
                setSubjects([{ code: '', name: '', marks: 0 }]);
            } else {
                setMessage(data.message || 'Error adding marks');
            }
        } catch (error) {
            console.error('Error adding marks:', error);
            setMessage('Error adding marks');
        } finally {
            setLoading(false);
        }
    };

    // Get available years
    const getAvailableYears = () => {
        return [1, 2, 3, 4].filter(year => !isYearCompleted(year));
    };

    return (
        <div>
            <Navigation />
            <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Student Marks Entry System
                        </h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Student Selection */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Student *
                                </label>
                                <select
                                    value={selectedStudent}
                                    onChange={(e) => setSelectedStudent(e.target.value)}
                                    className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Choose a student</option>
                                    {students.map((student) => (
                                        <option key={student._id} value={student._id}>
                                            {student.firstName} {student.lastName} - {student.studentNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedStudent && (
                                <>
                                    {/* Academic Year and Semester */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-green-50 p-4 rounded-lg text-black">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Academic Year *
                                            </label>
                                            <select
                                                value={academicYear}
                                                onChange={(e) => {
                                                    setAcademicYear(Number(e.target.value));
                                                    setSemester(1);
                                                    setExamType('mid');
                                                }}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                {getAvailableYears().map(year => (
                                                    <option key={year} value={year}>
                                                        Year {year} {isYearCompleted(year) ? '(Completed)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="bg-green-50 p-4 rounded-lg text-black">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Semester *
                                            </label>
                                            <select
                                                value={semester}
                                                onChange={(e) => setSemester(Number(e.target.value))}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            >
                                                <option value={1}>Semester 1</option>
                                                <option value={2}>Semester 2</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Exam Type Selection */}
                                    <div className="bg-yellow-50 p-4 rounded-lg text-black">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Exam Type *
                                        </label>
                                        <div className="flex space-x-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="mid"
                                                    checked={examType === 'mid'}
                                                    onChange={(e) => setExamType(e.target.value as 'mid' | 'final')}
                                                    className="mr-2"
                                                    disabled={examExists(academicYear, semester, 'mid')}
                                                />
                                                Mid Exam {examExists(academicYear, semester, 'mid') && '✅'}
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value="final"
                                                    checked={examType === 'final'}
                                                    onChange={(e) => setExamType(e.target.value as 'mid' | 'final')}
                                                    className="mr-2"
                                                    disabled={examExists(academicYear, semester, 'final')}
                                                />
                                                Final Exam {examExists(academicYear, semester, 'final') && '✅'}
                                            </label>
                                        </div>
                                    </div>

                                    {/* Progress Display */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-800 mb-2">Progress for Year {academicYear}</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <strong>Semester 1:</strong>
                                                <div>Mid Exam: {examExists(academicYear, 1, 'mid') ? '✅' : '❌'}</div>
                                                <div>Final Exam: {examExists(academicYear, 1, 'final') ? '✅' : '❌'}</div>
                                            </div>
                                            <div>
                                                <strong>Semester 2:</strong>
                                                <div>Mid Exam: {examExists(academicYear, 2, 'mid') ? '✅' : '❌'}</div>
                                                <div>Final Exam: {examExists(academicYear, 2, 'final') ? '✅' : '❌'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subjects Input */}
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Subject Marks *
                                            </label>
                                            <button
                                                type="button"
                                                onClick={addSubjectField}
                                                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            >
                                                Add Subject
                                            </button>
                                        </div>

                                        {subjects.map((subject, index) => (
                                            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4 items-end">
                                                <div className="md:col-span-4">
                                                    <label className="block text-xs text-gray-500 mb-1">Subject Code</label>
                                                    <input
                                                        type="text"
                                                        value={subject.code}
                                                        onChange={(e) => updateSubject(index, 'code', e.target.value)}
                                                        className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                        placeholder="e.g., CS101"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-5">
                                                    <label className="block text-xs text-gray-500 mb-1">Subject Name</label>
                                                    <input
                                                        type="text"
                                                        value={subject.name}
                                                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                                                        className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                        placeholder="e.g., Introduction to Programming"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-xs text-gray-500 mb-1">Marks (0-100)</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={subject.marks}
                                                        onChange={(e) => updateSubject(index, 'marks', parseInt(e.target.value) || 0)}
                                                        className="text-black w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-1">
                                                    {subjects.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSubjectField(index)}
                                                            className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="mt-4 p-3 bg-blue-100 rounded">
                                            <strong>Total Marks: {subjects.reduce((sum, subject) => sum + subject.marks, 0)}</strong>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            disabled={loading || examExists(academicYear, semester, examType)}
                                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold"
                                        >
                                            {loading ? 'Adding Marks...' : 'Add Marks'}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Message Display */}
                            {message && (
                                <div className={`p-4 rounded-lg text-center ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {message}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}