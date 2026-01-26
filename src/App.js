import './App.css';
import React from "react";
import AddNewItem from './item/AddNewItem';
import HomePage from "./item/HomePage";
import ShowItemById from "./item/ShowItemById";
import UpdateItem from "./item/UpdateItem";
import AddNewItemType from "./item/AddNewItemType";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/item/:id" element={<ShowItemById/>}/>
                    <Route path={"/add_new_item"} element={<AddNewItem/>}/>
                    <Route path={"/add_new_item_type"} element={<AddNewItemType/>}/>
                    <Route path="/update/:id" element={<UpdateItem/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
