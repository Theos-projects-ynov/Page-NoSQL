import mongoose from "mongoose";

const connexionDB = () => {
    mongoose.connect('mongodb+srv://stoffelbachtheos:HyTHPNSavOKOALq6@cluster0.t0c8u.mongodb.net/')
        .then(() => {
            console.log('\x1b[32m\x1b[1m%s\x1b[0m', 'Connection to MongoDB successful');
        })
        .catch(err => {
            console.error('Connection error', err);
        });
}

export default connexionDB;