import Mark from '../model/mark.model.js';

// Add marks for a student
export const addMarks = async (req, res) => {
    try {
        const { studentId, academicYear, semester, examType, subjects, totalMarks } = req.body;

        console.log('Adding marks for:', { studentId, academicYear, semester, examType });

        // Check if marks already exist for this student, year, semester and exam type
        const existingMarks = await Mark.findOne({
            studentId,
            academicYear,
            semester,
            examType
        });

        if (existingMarks) {
            return res.status(400).json({
                success: false,
                message: `Marks for ${examType} exam already exist for this student in Year ${academicYear} Semester ${semester}`
            });
        }

        // Create new marks record
        const newMark = new Mark({
            studentId,
            academicYear,
            semester,
            examType,
            subjects,
            totalMarks
        });

        await newMark.save();

        console.log('Marks saved successfully for:', { studentId, academicYear, semester, examType });

        res.status(201).json({
            success: true,
            message: 'Marks added successfully',
            data: newMark
        });
    } catch (error) {
        console.error('Error adding marks:', error);

        // Handle duplicate key error specifically
        if (error.code === 11000) {
            // Check which index caused the duplicate error
            if (error.keyPattern && error.keyPattern.studentId && error.keyPattern.examType && !error.keyPattern.academicYear) {
                return res.status(400).json({
                    success: false,
                    message: 'Database index conflict. Please drop the old index "studentId_1_examType_1" from MongoDB.',
                    error: 'OLD_INDEX_CONFLICT'
                });
            }

            return res.status(400).json({
                success: false,
                message: 'Duplicate marks entry. This exam already exists for this student.',
                error: 'DUPLICATE_ENTRY'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get marks for a specific student
export const getStudentMarks = async (req, res) => {
    try {
        const { studentId } = req.params;

        const marks = await Mark.find({ studentId })
            .populate('studentId', 'firstName lastName studentNumber')
            .sort({ academicYear: 1, semester: 1, examType: 1 });

        res.json({
            success: true,
            data: marks
        });
    } catch (error) {
        console.error('Error fetching student marks:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all marks (for admin view)
export const getAllMarks = async (req, res) => {
    try {
        const marks = await Mark.find()
            .populate('studentId', 'firstName lastName studentNumber')
            .sort({ academicYear: -1, semester: -1, createdAt: -1 });

        res.json({
            success: true,
            data: marks
        });
    } catch (error) {
        console.error('Error fetching all marks:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Calculate CA marks for a student for specific academic year
export const calculateCAMarks = async (req, res) => {
    try {
        const { studentId, academicYear } = req.params;

        // Get all marks for the student in the specified academic year
        const yearMarks = await Mark.find({
            studentId,
            academicYear: parseInt(academicYear)
        });

        // Check if we have all required exams: mid and final for both semesters
        const semester1Mid = yearMarks.find(m => m.semester === 1 && m.examType === 'mid');
        const semester1Final = yearMarks.find(m => m.semester === 1 && m.examType === 'final');
        const semester2Mid = yearMarks.find(m => m.semester === 2 && m.examType === 'mid');
        const semester2Final = yearMarks.find(m => m.semester === 2 && m.examType === 'final');

        if (!semester1Mid || !semester1Final || !semester2Mid || !semester2Final) {
            return res.status(400).json({
                success: false,
                message: 'All mid and final exam marks for both semesters are required to calculate CA marks'
            });
        }

        // Calculate CA marks based on all exam performances
        const sem1MidAvg = semester1Mid.totalMarks / semester1Mid.subjects.length;
        const sem1FinalAvg = semester1Final.totalMarks / semester1Final.subjects.length;
        const sem2MidAvg = semester2Mid.totalMarks / semester2Mid.subjects.length;
        const sem2FinalAvg = semester2Final.totalMarks / semester2Final.subjects.length;

        const caMarks = Math.round(
            (sem1MidAvg * 0.1) +
            (sem1FinalAvg * 0.15) +
            (sem2MidAvg * 0.15) +
            (sem2FinalAvg * 0.6)
        );

        res.json({
            success: true,
            caMarks,
            message: 'CA marks calculated successfully'
        });
    } catch (error) {
        console.error('Error calculating CA marks:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};