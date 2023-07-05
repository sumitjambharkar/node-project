const mongoose = require("mongoose")

const database = () => {
    try {
        mongoose.connect(process.env.DATABASE)
        console.log('Database connected');
    } catch (error) {
        console.log(error.message);
    }

}
module.exports = database