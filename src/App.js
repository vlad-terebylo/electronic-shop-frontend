import './App.css';
import React from "react";
import AddNewItem from './item/AddNewItem';
import ShowAllItems from "./item/ShowAllItems";
import HomePage from "./item/HomePage";
import ShowItemById from "./item/ShowItemById";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/item/:id" element={<ShowItemById/>}/>
                    <Route path={"/add_new_item"} element={<AddNewItem/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
