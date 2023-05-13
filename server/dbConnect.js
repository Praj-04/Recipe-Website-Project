const mongoose = require('mongoose')


module.exports = async() =>{
   
    // const mongoUri = process.env.MONGODB_URI;

    //removed the MONGODB_URI from the .env and added only paswd there..removed above line and added below 2 line
    const {PASS} = process.env;
  const mongoUri=`mongodb+srv://prajnayogish4:${PASS}@cluster0.g1snpcp.mongodb.net/?retryWrites=true&w=majority`;

    try {
        const connect = await mongoose.connect(mongoUri,{
useUnifiedTopology: true,
useNewUrlParser : true

        })
          console.log(`mongodb is connected successfully : ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
}