import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateForm from "../Page/CreateForm";
import Login from "../Page/Login";
import HomePage from "../Page/HomePage";

function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <>
                        <Login/>
                    </>
                }/>
                <Route path="/createform" element={
                    <>
                        <CreateForm/>
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