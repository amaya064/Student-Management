import Course from '../model/course.model.js';

export const registerCourse = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    
    const { 
      courseCode,
      title, 
      instructor, 
      category, 
      price, 
      duration, 
      level, 
      description 
    } = req.body;
    
    // Check for required fields
    const requiredFields = [
      'courseCode',
      'title', 'instructor', 'category', 'price', 
      'duration', 'level', 'description'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Check if course with same course code already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(409).json({ 
        success: false, 
        message: 'Course with this course code already exists' 
      });
    }
    
    const course = new Course({ 
      courseCode: courseCode.toUpperCase(), // Convert to uppercase
      title, 
      instructor, 
      category, 
      price, 
      duration, 
      level, 
      description
    });
    
    await course.save();

    res.status(201).json({ 
      success: true, 
      message: 'Course registered successfully', 
      data: course 
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Course with this course code already exists' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      data: courses 
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching courses', 
      error: error.message 
    });
  }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: course 
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching course', 
      error: error.message 
    });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const { 
      title, 
      instructor, 
      category, 
      price, 
      duration, 
      level, 
      description 
    } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        instructor, 
        category, 
        price, 
        duration, 
        level, 
        description 
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Course updated successfully', 
      data: updatedCourse 
    });
  } catch (error) {
    console.error('Error updating course:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Course with this title already exists' 
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error updating course', 
      error: error.message 
    });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Course deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting course', 
      error: error.message 
    });
  }
};