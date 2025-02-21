import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormCreation from "./FormCreation";
import { getFormById } from "./formService";
import "../Style/createForm.css";

function CreateForm() {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (id) {
            getFormById(id)
                .then((res) => {
                    setFormData(res.data);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération du formulaire :", error);
                });
        }
    }, [id]);

    return (
        <>
            <h1>{id ? "Edit Form" : "Create Form"}</h1>
            <p>{id ? "Modify an existing form" : "Create a new form"}</p>

            {id && !formData ? (
                <p>Loading...</p>
            ) : (
                <FormCreation initialForm={formData} />

            )}
        </>
    );
}

export default CreateForm;
