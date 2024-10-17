const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/adminSchema'); // Adjust the path if necessary

mongoose.connect('mongodb://localhost:27017/admins')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const createAdmin = async () => {
  const username = 'admin'; // Change to your desired username
  const password = 'password'; // Change to your desired password

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ username, password: hashedPassword });
  await newAdmin.save();

  console.log('Admin created:', newAdmin);
  mongoose.connection.close();
};

createAdmin();
