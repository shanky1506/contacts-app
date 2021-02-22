const mongoose = require('mongoose');


const connectDB = async ()=> {
    try{
        const uri = process.env.ATLAS_URI;
        const conn = await mongoose.connect(uri, {
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Atlas Connecte : ${conn.connection.host}`)
    } catch(err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB