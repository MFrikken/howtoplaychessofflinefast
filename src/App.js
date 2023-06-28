import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import License from "./Components/License";
import Main from "./Components/Main";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path={"/"} element={<Main />} />
                <Route exact path={"/License"} element={<License/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
