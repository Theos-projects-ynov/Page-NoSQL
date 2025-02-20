import React, { useState, useEffect } from 'react';
import FormCard from "../components/forms/FormCard";
import "../Style/page/homePage.sass";
import { getMyForms } from "../service/formService";
import { jwtDecode } from 'jwt-decode';

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [myForms, setMyForms] = useState([]);
    const [answerForms, setAnswerForms] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
                // Supposons que getMyForms renvoie une promesse
                getMyForms(decoded.id)
                    .then(res => {

                        res.data.reverse();
                        res.data.splice(7);
                        setMyForms(res.data);
                        setIsLoading(false);
                    }).catch(error => {
                    console.error("Erreur lors de la récupération des formulaires :", error);
                    setIsLoading(false);
                });

            } catch (error) {
                console.error("Erreur lors du décodage du token JWT :", error);
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, []);

    const handleCardClick = async (form) => {
        console.log("Formulaire cliqué :", form, ", decodedToken :", decodedToken);
    };

    const handleAddForm = () => {
        console.log("Ajouter un nouveau formulaire");
    };

    return (
        <div id="homepage-container-page">
            <div className="homepage-container">
                <h1 className="homePage-titleCategory">My forms</h1>
                <div id="container-myforms">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        myForms.length === 0 ? (
                            <p>No form found</p>
                        ) : (
                            myForms.map((form, index) => (
                                <FormCard
                                    key={form.id + "-" + index}
                                    name={form.title}
                                    banner={form.banner}
                                    onClick={() => handleCardClick(form)}
                                />
                            ))
                        )
                    )}
                    <FormCard isEmpty onClick={handleAddForm}/>
                </div>
            </div>
            <div className="homepage-container">
                <h1 className="homePage-titleCategory">My answers</h1>
                <div id="container-myforms">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        myForms.length === 0 ? (
                            <p>No form found</p>
                        ) : (
                            myForms.map((form, index) => (
                                <FormCard
                                    key={form.id + "-" + index}
                                    name={form.title}
                                    banner={form.banner}
                                    onClick={() => handleCardClick(form)}
                                />
                            ))
                        )
                    )}
                    <FormCard isEmpty onClick={handleAddForm}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
