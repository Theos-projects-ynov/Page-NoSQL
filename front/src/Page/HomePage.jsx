import React from 'react'
import { isConnect } from "../service/userService";
// import img from '../assets/img.png';
// import '../styles/style.css'

function HomePage() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        IsConnected();
    }, [])

    const IsConnected = async () => {
        isConnect(localStorage.getItem('token'))
            .then((response) => {
                if (!response.error) {
                    setIsConnected(true);
                    setIsLoading(false);
                    console.log("connecté");
                }
            });
    }

    return (
        <div>
            <h1>Home Page</h1>
            <p>Home Page</p>

            {isLoading ? <p>Chargement ...</p> :<>
                    {isConnected ? <p>Vous êtes connecté</p> : <p>Vous n'êtes pas connecté</p>}
                </>
            }

            {/* <img src={img} alt="img" /> */}
        </div>
    )
}

export default HomePage