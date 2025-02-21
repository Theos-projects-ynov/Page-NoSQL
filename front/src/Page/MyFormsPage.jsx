import React, { useState, useEffect } from 'react';
import FormCard from "../components/forms/FormCard";
import "../Style/page/myFormPage.sass";
import { getMyForms } from "../service/formService";
import { jwtDecode } from 'jwt-decode';

function MyFormsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [myForms, setMyForms] = useState([]);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setDecodedToken(decoded);

                getMyForms(decoded.id)
                    .then((res) => {
                        setMyForms(res.data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
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

    const handleCardClick = (form) => {
        console.log("Formulaire cliqué, id :", form._id);
        window.location.href = `/form/stats/${form._id}`;
    };

    return (
        <div id="myforms-page-container">
            <div className="myforms-container">
                <h1>Mes Formulaires</h1>
                <div className="forms-list">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : myForms.length === 0 ? (
                        <p>Aucun formulaire trouvé</p>
                    ) : (
                        myForms.map((form, index) => (
                            <FormCard
                                key={`${form._id}-${index}`}
                                name={form.title}
                                banner={form.banner}
                                onClick={() => handleCardClick(form)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyFormsPage;
