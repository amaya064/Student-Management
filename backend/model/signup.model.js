import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: false, // Changed to optional
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: { 
    type: String, 
    required: false, // Changed to optional
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  studentNumber: { 
    type: String, 
    required: false,
    unique: true,
    sparse: true,
    trim: true,
    uppercase: true
  },
  gender: { 
    type: String, 
    required: false,
    enum: ['Male', 'Female']
  },
  faculty: { 
    type: String, 
    required: false,
    trim: true
  },
  dateOfJoining: { 
    type: Date, 
    required: false
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  address: { 
    type: String, 
    required: [true, 'Address is required'],
    trim: true
  },
  role: { 
    type: String, 
    enum: ['student', 'admin', 'faculty'],
    default: 'student'
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
  }
}, { timestamps: true });

// Compound index to ensure studentNumber uniqueness when provided
userSchema.index({ studentNumber: 1 }, { 
  unique: true, 
  sparse: true,
  partialFilterExpression: { studentNumber: { $exists: true } }
});

const User = mongoose.model('User', userSchema);

export default User;