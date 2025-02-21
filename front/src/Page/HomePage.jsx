import React, { useState, useEffect } from 'react';
import FormCard from "../components/forms/FormCard";
import "../Style/page/homePage.sass";
import { getAllForms, getMyForms } from "../service/formService";
import { jwtDecode } from 'jwt-decode';
import { getMyAnswer } from "../service/answerService";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [myForms, setMyForms] = useState([]);
    const [answerForms, setAnswerForms] = useState([]);
    const [allForms, setAllForms] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);

    // 67b733b2bd3c8f9b9434b8e4

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);

                getMyAnswer(decoded.id)
                    .then(res => {
                        const resAnswers = res.data;
                        resAnswers.reverse();
                        resAnswers.splice(8);
                        setAnswerForms(resAnswers);
                        console.log("answerForms : ", resAnswers);
                        setIsLoading(false);
                    }).catch(error => {
                    console.log("Erreur lors de la récupération des formulaires :", error);
                    setIsLoading(false);
                });

                getMyForms(decoded.id)
                    .then(res => {
                        const resForms = res.data;
                        resForms.reverse();
                        resForms.splice(7);
                        setMyForms(resForms);
                        console.log("forms : ", resForms);

                    }).catch(error => {
                    console.log("Erreur lors de la récupération des answer :", error);
                    setIsLoading(false);
                });

                getAllForms(decoded.id)
                    .then(res => {
                        const resAllForms = res.data;
                        resAllForms.reverse();
                        setAllForms(resAllForms);
                        console.log("forms : ", resAllForms);

                    }).catch(error => {
                    console.log("Erreur lors de la récupération des answer :", error);
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
        window.location.href = `/form/${form._id}`;
    };

    const handleAddForm = () => {
        window.location.href = "/createform";
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
                </div>
            </div>
            <div className="homepage-container">
                <h1 className="homePage-titleCategory">All forms</h1>
                <div id="container-myforms">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        allForms.length === 0 ? (
                            <p>No form found</p>
                        ) : (
                            allForms.map((form, index) => (
                                <FormCard
                                    key={form.id + "-" + index}
                                    name={form.title}
                                    banner={form.banner}
                                    onClick={() => handleCardClick(form)}
                                />
                            ))
                        )
                    )}
                </div>
            </div>

        </div>
    );
}

export default HomePage;
