import React, { useEffect, useState } from 'react'
import axios from "axios";
// import img from '../assets/img.png';
// import '../styles/style.css'

function Profil() {
    const [forms, setForms] = useState([]);
    useEffect(() => {
        axios.post('http://localhost:3000/user/profil', {
            token: localStorage.getItem('token')
        }).then((response) => {
            setForms(response.data.forms);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <h1>Profil</h1>

            <div id="myForm">
                <h2>Mes formulaires</h2>
                <ul>
                    {forms.map((form, index) => {
                        return <li key={index}>{form.title}</li>
                    })}
                </ul>

            </div>
        </>
    )
}

export default Profil