
const mongoose=require('mongoose');
const mongoURI='mongodb://127.0.0.1:27017/digibook';

// function to connnect to Database (MongoDB)
const connectToMongo=async ()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected To DataBase Successfully!");
}

module.exports=connectToMongo;

