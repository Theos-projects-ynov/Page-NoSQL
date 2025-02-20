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
                        <Login />
                    </>
                } />
                <Route path="/createform" element={
                    <>
                        <CreateForm />
                    </>
                } />
                <Route path="/" element={
                    <UserConnected>
                        <NavBar />
                        <HomePage />
                    </UserConnected>
                } />
                <Route path="/profil" element={
                    <>
                        <Profil />
                    </>
                } />
                <Route path="/form/answer/:id" element={
                    <>
                        <FormAnswer />
                    </>
                } />
                <Route path="/form/edit/:id" element={
                    <>
                        <FormEdit />
                    </>
                } />
                <Route path="/form/stats/:id" element={
                    <>
                        <FormStats />
                    </>
                } />
                <Route path="/register" element={
                    <>
                        <Register />
                    </>
                } />
                <Route path="/form/:id" element={
                    <>
                        <FormResponse />
                    </>
                } />

            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter