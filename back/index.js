import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import formRoutes from "./src/routes/formRoutes.js";
import connexionDB from "./src/db/db.js";
import answerRoutes from "./src/routes/answerRoutes.js";
import cors from 'cors';

const app = express();

console.log("");

connexionDB();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/user', userRoutes);
app.use('/form', formRoutes)
app.use('/answer', answerRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port} \x1b[34m\x1b[1m[http://localhost:${port}]` );
});
