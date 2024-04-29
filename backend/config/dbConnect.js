const {default : mongoose} = require('mongoose')

const dbConnect =()=>{
    try {
        const conn = mongoose.connect("mongodb://127.0.0.1/E_Cars")
        console.log("Database connect successfully")
    } catch (error) {
        console.log("Database error")
    }
}
module.exports = dbConnect