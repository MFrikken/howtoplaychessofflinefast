import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import License from "./Components/License";
import Main from "./Components/Main";

function App() {

    return (
            <Routes>
                <Route exact path={"/"} element={<Main/>} />
                <Route exact path={"/License"} element={<License/>} />
            </Routes>
    );
}

export default App;
