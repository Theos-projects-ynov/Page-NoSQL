import React, { useState, useEffect } from 'react';
import FormCard from "../components/forms/FormCard";
import "../Style/page/homePage.sass";
import { getMyForms } from "../service/formService";
import { jwtDecode } from 'jwt-decode';
import { getMyAnswer } from "../service/answerService";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [myForms, setMyForms] = useState([]);
    const [answerForms, setAnswerForms] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);

    // 67b733b2bd3c8f9b9434b8e4

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);
                // Supposons que getMyForms renvoie une promesse
                getMyForms(decoded.id)
                    .then(res => {
                        const resforms = res.data;
                        resforms.reverse();
                        resforms.splice(7);
                        setMyForms(resforms);
                        console.log("forms : ", resforms);

                    }).catch(error => {
                    console.error("Erreur lors de la récupération des formulaires :", error);
                    setIsLoading(false);
                });
                console.log("resd")
                getMyAnswer(decoded.id)
                    .then(res => {
                        const resAnswer = res.data;
                        resAnswer.reverse();
                        resAnswer.splice(7);
                        setAnswerForms(resAnswer);
                        console.log("answerForms : ", resAnswer);
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
                        answerForms.length === 0 ? (
                            <p>No form found</p>
                        ) : (
                            answerForms.map((form, index) => (
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
