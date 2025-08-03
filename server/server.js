const mongoose = require('mongoose');
require('dotenv').config(); 

const mongoURI = process.env.MONGODB_URI; 

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Atlas Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
