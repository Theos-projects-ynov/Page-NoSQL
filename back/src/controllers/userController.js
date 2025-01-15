import User from "../models/User.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

const generateToken = (userId) => {
    const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
    );
    console.log("generate token : ", token);
    return token;
};

const getAllUser = async (req, res) => {
    try {
        console.log("test1")
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des utilisateurs');
    }
}

const createUser = async (req, res) => {
    console.log("test create user")
    try {
        let {name, email,password, age} = req.body;
        password = bcrypt.hashSync(password, 10);

        let newUser = new User({name,password, email, age});
        newUser = newUser.toObject();

        newUser['token'] = generateToken(newUser._id.toString());

        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        console.log("error : ",error);
        res.status(400).send('Erreur lors de la création de l\'utilisateur');
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        user = user.toObject();
        if (user === null) {
            res.status(404).send('Utilisateur non trouvé');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).send('Mot de passe incorrect');
        }

        user['token'] = generateToken(user._id.toString());

        console.log("user : ",user);

        res.status(200).send({"message": "Connexion réussie",user});
    } catch (error) {
        console.log("error : ",error);
        res.status(400).send('Erreur lors de la création de l\'utilisateur');
    }
}

export {
    getAllUser,
    createUser,
    login
}