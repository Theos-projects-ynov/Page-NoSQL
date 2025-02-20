import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FormList() {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/forms") // L'endpoint qui liste les formulaires
            .then((response) => response.json())
            .then((data) => setForms(data))
            .catch((error) => console.error("Erreur de chargement des formulaires :", error));
    }, []);

    return (
        <div className="form-list-container">
            <h1>Liste des Formulaires</h1>
            <ul>
                {forms.map((form) => (
                    <li key={form._id}>
                        <Link to={`/form/${form._id}`}>{form.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FormList;
