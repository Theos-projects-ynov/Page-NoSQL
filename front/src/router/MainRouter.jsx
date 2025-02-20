import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateForm from "../Page/CreateForm";
import Login from "../Page/Login";
import HomePage from "../Page/HomePage";
import Profil from "../Page/Profil";
import FormAnswer from "../Page/FormAnswer";
import FormEdit from "../Page/FormEdit";
import FormStats from "../Page/FormStats";
import NavBar from "../components/header/NavBar";
import UserConnected from "../components/auth/UserConnected";
import Register from "../Page/Register";
import FormResponse from "../Page/FormResponse";

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
                        <UserConnected>
                            <NavBar/>
                            <CreateForm/>
                        </UserConnected>
                    </>
                }/>
                <Route path="/" element={
                    <UserConnected>
                        <NavBar/>
                        <HomePage/>
                    </UserConnected>
                }/>
                <Route path="/profil" element={
                    <>
                        <UserConnected>
                            <NavBar/>
                            <Profil/>
                        </UserConnected>
                    </>
                }/>
                <Route path="/form/answer/:id" element={
                    <>
                        <UserConnected>
                            <NavBar/>
                            <FormAnswer/>
                        </UserConnected>
                    </>
                }/>
                <Route path="/form/edit/:id" element={
                    <>
                        <UserConnected>
                            <NavBar/>
                            <FormEdit/>
                        </UserConnected>
                    </>
                }/>
                <Route path="/form/stats/:id" element={
                    <>
                        <UserConnected>
                            <NavBar/>
                            <FormStats/>
                        </UserConnected>
                    </>
                }/>
                <Route path="/register" element={
                    <>
                        <NavBar/>
                        <Register/>
                    </>
                }/>
                <Route path="/form/:id" element={
                    <>
                        <UserConnected>
                            <NavBar/>
                            <FormResponse/>
                        </UserConnected>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter