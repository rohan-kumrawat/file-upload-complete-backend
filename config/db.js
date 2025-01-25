import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Atlas Connected');
  } catch (error) {
    console.error('Atlas Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;