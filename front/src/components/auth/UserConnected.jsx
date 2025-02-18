import React, { useEffect, useState } from 'react';
import { isConnect } from '../../service/userService';

function UserConnected({children}) {
    const [isConnected, setIsConnected] = useState(null); // null : chargement, true/false : vérification terminée

    const checkConnection = async () => {
        try {
            console.log("Vérification de connexion...");
            const token = localStorage.getItem('token');
            if (!token) {
                setIsConnected(false);
                return;
            }
            const response = await isConnect(token);
            if (!response.error) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        } catch (error) {
            console.error("Erreur lors de la vérification de connexion :", error);
            setIsConnected(false);
        }
    };

    useEffect(() => {
        checkConnection();
    }, []);

    useEffect(() => {
        console.log("isConnected :", isConnected);
        if (isConnected === false) {
            window.location.href = "/login";
        }
    }, [isConnected]);

    if (isConnected === null) {
        return <p>Chargement...</p>;
    }

    return <>{children}</>;
}

export default UserConnected;
