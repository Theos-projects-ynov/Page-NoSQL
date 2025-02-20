import mongoose from "mongoose";

const connexionDB = () => {
    // mongoose.connect('FormAPI:<db_password>@cluster0.x4q1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // mongoose.connect('mongodb://localhost:27017/google_forms')
    mongoose.connect('mongodb+srv://FormAPI:djACNsdAbcK2heddjACNsdAbcK2hed@cluster0.x4q1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/')
        .then(() => {
            console.log('\x1b[32m\x1b[1m%s\x1b[0m', 'Connection to MongoDB successful');
        })
        .catch(err => {
            console.error('Connection error', err);
        });
};

export default connexionDB;