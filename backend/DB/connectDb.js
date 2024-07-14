const mongoose = require('mongoose')


const connectDB = async() => await mongoose.connect(process.env.DB).then(() => console.log(`db connection Succesfully`.bgCyan)).catch((err) => console.log(`error in db connection ${err}`))


module.exports = connectDB