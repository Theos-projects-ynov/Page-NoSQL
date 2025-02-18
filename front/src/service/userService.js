// const API_URL = 'http://localhost:3000/user';

const login = async (email, password) => {
    try {
        console.log("email2 : ", email);
        const response = await fetch(`http://localhost:3000/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Échec de la connexion');
        }

        return response;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
};

const register = async (email, password) => {
    try {
        console.log("email register : ", email);
        const response = await fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Échec de l'inscription");
        }

        return response;
    } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
    }
};

const isConnect = async (token) => {
    // try {
    //     const response = await fetch(`http://localhost:3000/user/isConnect`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({token}),
    //     });
    //
    //     if (!response.ok) {
    //         const errorData = await response.json();
    //         throw new Error(errorData.message || 'Échec de la connexion');
    //     }
    //
    //     return response;
    // }
    // catch (error) {
    //     console.error('Erreur lors de la connexion:', error);
    // }
    return true;
}

export { login, register, isConnect };
