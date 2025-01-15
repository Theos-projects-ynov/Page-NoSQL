import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Page/HomePage";
import Login from "../Page/Login";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <>
                        <Login/>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter