import mongoose from "mongoose";

const connexionDB = () => {
    console.log("test de connection");
    // mongoose.connect('FormAPI:<db_password>@cluster0.x4q1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // mongoose.connect('mongodb://localhost:27017/google_forms')
    mongoose.connect('mongodb+srv://FormAPI:djACNsdAbcK2heddjACNsdAbcK2hed@cluster0.x4q1h.mongodb.net/Form_piece?retryWrites=true&w=majority&appName=Cluster0/')
        // mongoose.connect('mongodb+srv://test42:yM3fTLisSwV2yz6W@cluster0.x4q1h.mongodb.net/Form_piece?retryWrites=true&w=majority&appName=Cluster0/')
        .then(() => {
            console.log('\x1b[32m\x1b[1m%s\x1b[0m', 'Connection to MongoDB successful');
        })
        .catch(err => {
            console.error('mince Connection error', err);
        });
};

export default connexionDB;