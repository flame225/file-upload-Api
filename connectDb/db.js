const mongoose = require('mongoose')





const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('database well connected')
    } catch (error) {
        console.log("db fail")
    }
};

module.exports = connectDB
