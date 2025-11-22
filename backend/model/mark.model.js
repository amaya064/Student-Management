import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

const markSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  academicYear: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 2
  },
  examType: {
    type: String,
    enum: ['mid', 'final'],
    required: true
  },
  subjects: [subjectSchema],
  totalMarks: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Remove any existing conflicting indexes first
markSchema.pre('save', async function(next) {
  try {
    const collection = mongoose.connection.db.collection('marks');
    const indexes = await collection.getIndexes();
    
    // Check if old index exists and drop it
    if (indexes.studentId_1_examType_1) {
      await collection.dropIndex("studentId_1_examType_1");
      console.log('Dropped old index: studentId_1_examType_1');
    }
  } catch (error) {
    console.log('Index cleanup:', error.message);
  }
  next();
});

// Create the correct compound index
markSchema.index({ 
  studentId: 1, 
  academicYear: 1, 
  semester: 1, 
  examType: 1 
}, { 
  unique: true,
  name: "student_year_semester_exam_unique" 
});

// Update the updatedAt field before saving
markSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Mark || mongoose.model('Mark', markSchema);