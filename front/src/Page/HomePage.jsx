import React from 'react';
import { isConnect } from "../service/userService";
import FormCard from "../components/forms/FormCard";
import "../Style/page/homePage.sass"

function HomePage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isConnected, setIsConnected] = React.useState(false);
    const [forms, setForms] = React.useState([]);

    React.useEffect(() => {
        checkConnection();
        // Pour la démonstration, on simule un fetch des formulaires
        const demoForms = [
            {
                id: 1,
                name: 'Formulaire 1',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
            {
                id: 2,
                name: 'Formulaire 2',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
            {
                id: 3,
                name: 'Formulaire 3',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
            {
                id: 4,
                name: 'Formulaire 4',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
            {
                id: 5,
                name: 'Formulaire 5',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
            {
                id: 6,
                name: 'Formulaire 6',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
            {
                id: 7,
                name: 'Formulaire 7',
                banner: 'https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain'
            },
        ];
        setForms(demoForms);
    }, []);

    const checkConnection = async () => {
        isConnect(localStorage.getItem('token'))
            .then((response) => {
                if (!response.error) {
                    setIsConnected(true);
                    setIsLoading(false);
                    console.log("connecté");
                }
            });
    };

    const handleCardClick = (form) => {
        // Vous pouvez rediriger ou afficher le détail du formulaire
        console.log("Formulaire cliqué :", form);
    };

    const handleAddForm = () => {
        // Logique d'ajout d'un nouveau formulaire
        console.log("Ajouter un nouveau formulaire");
    };

    return (
        <div className="homepage-container">
            <h1 className="homePage-titleCategory">My forms</h1>

            <div id="container-myforms">
                <FormCard name="Formulaire 1"
                          banner="https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain"
                          onClick={() => console.log("Formulaire 1")}/>
                <FormCard name="Formulaire 1"
                          banner="https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain"
                          onClick={() => console.log("Formulaire 1")}/>
                <FormCard name="Formulaire 1"
                          banner="https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain"
                          onClick={() => console.log("Formulaire 1")}/>
                <FormCard name="Formulaire 1"
                          banner="https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain"
                          onClick={() => console.log("Formulaire 1")}/>
                <FormCard name="Formulaire 1"
                          banner="https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain"
                          onClick={() => console.log("Formulaire 1")}/>
                <FormCard name="Formulaire 1"
                          banner="https://th.bing.com/th/id/OIP.7sMSAXgECAXyym5d19hhGgHaEj?rs=1&pid=ImgDetMain"
                          onClick={() => console.log("Formulaire 1")}/>

            </div>

            {/*{isLoading ? (*/}
            {/*    <p>Chargement ...</p>*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*        {isConnected ? <p>Vous êtes connecté</p> :*/}
            {/*            <p>Vous n'êtes pas connecté</p>}*/}
            {/*    </>*/}
            {/*)}*/}

            {/*<div className="forms-section">*/}
            {/*    <h2 className="section-title">Mes formulaires :</h2>*/}
            {/*    <div className="forms-grid">*/}
            {/*        {forms.map((form) => (*/}
            {/*            <FormCard*/}
            {/*                key={form.id}*/}
            {/*                name={form.name}*/}
            {/*                banner={form.banner}*/}
            {/*                onClick={() => handleCardClick(form)}*/}
            {/*            />*/}
            {/*        ))}*/}
            {/*        /!* La dernière case vide avec le '+' *!/*/}
            {/*        <FormCard isEmpty onClick={handleAddForm}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}

export default HomePage;
