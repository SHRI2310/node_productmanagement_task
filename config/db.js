const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mylocalDB';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    // useNewUrlParser: true, useUnifiedTopology: true  // options auto
  });
  console.log('MongoDB connected');
};

module.exports = connectDB;