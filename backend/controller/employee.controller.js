import User from '../model/signup.model.js';

// Register a new employee
export const registerEmployee = async (req, res) => {
  try {
    const { companyNumber, name, address, gender, phoneNumber, dateOfBirth, section } = req.body;
    if (!companyNumber || !name || !address || !gender || !phoneNumber || !dateOfBirth || !section) {
      return res.status(400).json({ success: false, message: 'All fields are required, including section' });
    }
    const employee = new Employee({ companyNumber, name, address, gender, phoneNumber, dateOfBirth, section });
    await employee.save();

    res.status(201).json({ success: true, message: 'Employee registered successfully', data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
