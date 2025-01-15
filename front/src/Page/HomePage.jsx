import React, { useState } from 'react'
import FormCreation from "./FormCreation";
// import img from '../assets/img.png';
// import '../styles/style.css'

function HomePage() {
    const [data] = useState(['rezrezrz','azeeerty'])
    // FETCH DATA


    return (
        <>
            <h1>Home Page</h1>
            <p>Home Page</p>

            <FormCreation/>
            {/*HERE PLACE ALL FORMS CREATE*/}

            {/* <img src={img} alt="img" /> */}
        </>
    )
}

export default HomePage