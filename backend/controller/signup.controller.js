import User from '../model/signup.model.js';
import bcrypt from 'bcrypt';


// Signup method
export const signup = async (req, res, next) => {
  console.log("Signup request received with data:", req.body);
  const { email, password, phone, address, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use, please choose a different one.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      firstName: firstName || 'Not Provided', // Default value
      lastName: lastName || 'Not Provided',   // Default value
      email, 
      password: hashedPassword, 
      phone, 
      address,
      role: 'student'
    });

    await newUser.save();
    console.log("User created successfully!");
    
    // Remove password from response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully!',
      data: userResponse
    });
  } catch (error) {
    console.error("Signup error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already in use, please choose a different one.' 
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
    
    next(error);
  }
};







export const registerStudent = async (req, res, next) => {
  console.log("Admin student registration request received with data:", req.body);
  
  const { 
    firstName,
    lastName,
    email, 
    password, 
    studentNumber,
    gender,
    faculty,
    dateOfJoining,
    phone, 
    address 
  } = req.body;

  try {
    // Check for required fields for student registration
    const requiredFields = [
      'firstName', 'lastName', 'email', 'password', 'studentNumber',
      'gender', 'faculty', 'dateOfJoining', 'phone', 'address'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Check if user with same email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({ 
        success: false, 
        message: 'Student with this email already exists' 
      });
    }

    // Check if student with same student number already exists
    const existingUserByNumber = await User.findOne({ studentNumber });
    if (existingUserByNumber) {
      return res.status(409).json({ 
        success: false, 
        message: 'Student with this student number already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newStudent = new User({ 
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      studentNumber: studentNumber.toUpperCase(),
      gender,
      faculty,
      dateOfJoining: new Date(dateOfJoining),
      phone, 
      address,
      role: 'student'
    });

    await newStudent.save();
    console.log("Student registered successfully by admin!");

    // Remove password from response
    const studentResponse = newStudent.toObject();
    delete studentResponse.password;

    res.status(201).json({ 
      success: true, 
      message: 'Student registered successfully!', 
      data: studentResponse 
    });
  } catch (error) {
    console.error("Student registration error:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({ 
        success: false, 
        message: `Student with this ${field} already exists` 
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
    
    next(error);
  }
};






// Signin function
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    console.log("User signed in successfully!");
    // Send user data in response
    res.status(200).json({ success: true, message: 'Signed in successfully!', user });
  } catch (error) {
    console.error("Signin error:", error);
    next(error);
  }
};







export const getEmployeeDetailsByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details." });
  }
};





export const updateUserProfile = async (req, res) => {
  const { email } = req.params;
  const { 
    firstName, 
    lastName, 
    phone, 
    address, 
    studentNumber, 
    gender, 
    faculty, 
    dateOfJoining, 
    role, 
    status 
  } = req.body;

  try {
    const updateData = {
      phone,
      address
    };

    // Only update these fields if they are provided and not "Please update"
    if (firstName && firstName !== "Please update") updateData.firstName = firstName;
    if (lastName && lastName !== "Please update") updateData.lastName = lastName;
    if (studentNumber && studentNumber !== "Please update") updateData.studentNumber = studentNumber;
    if (gender && gender !== "Please update") updateData.gender = gender;
    if (faculty && faculty !== "Please update") updateData.faculty = faculty;
    if (dateOfJoining) updateData.dateOfJoining = new Date(dateOfJoining);
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    const user = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true } // Return updated document
    );
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "User profile updated successfully", 
      data: user 
    });
  } catch (error) {
    console.error("Update user profile error:", error);
    
    // Handle duplicate key error for studentNumber
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false, 
        message: "Student number already exists" 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Error updating user profile.", 
      error: error.message 
    });
  }
};



export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments(); // Count all users in the collection
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user count', error });
  }
};
