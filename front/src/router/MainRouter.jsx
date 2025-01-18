import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../Page/HomePage";
import Login from "../Page/Login";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <>
                        <Login/>
                    </>
                }/>
                <Route path="/" element={
                    <>
                        <HomePage/>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter