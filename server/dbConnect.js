const mongoose = require('mongoose')


module.exports = async() =>{
    const mongoUri = process.env.MONGODB_URI;

    try {
        const connect = await mongoose.connect(mongoUri,{
useUnifiedTopology: true,
useNewUrlParser : true

        })
        //  console.log(`mongodb is connected successfully : ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}