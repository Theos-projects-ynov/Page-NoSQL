import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

const connexionDB = () => {
    console.log("test de connection");

    mongoose.connect('mongodb://localhost:27017/pieceForm')
    // mongoose.connect('mongodb+srv://' + process.env.USERNAMEDB + ':' + process.env.PASSWORDDB + '@cluster0.x4q1h.mongodb.net/Form_piece?retryWrites=true&w=majority&appName=Cluster0/')
        .then(() => {
            console.log('\x1b[32m\x1b[1m%s\x1b[0m', 'Connection to MongoDB successful');
        })
        .catch(err => {
            console.error('mince Connection error', err);
        });
};

export default connexionDB;