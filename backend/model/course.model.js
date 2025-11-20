import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseCode: { 
      type: String, 
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    title: { 
      type: String, 
      required: [true, 'Course title is required'],
      trim: true
    },
    instructor: { 
      type: String, 
      required: [true, 'Instructor name is required'],
      trim: true
    },
    category: { 
      type: String, 
      required: [true, 'Category is required'],
      trim: true
    },
    price: { 
      type: Number, 
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    duration: { 
      type: String, 
      required: [true, 'Duration is required'],
      trim: true
    },
    level: { 
      type: String, 
      required: [true, 'Level is required'],
      enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'],
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);