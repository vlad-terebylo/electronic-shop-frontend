import './App.css';
import React from "react";
import AddNewItem from './item/AddNewItem';
import HomePage from "./item/HomePage";
import ShowItemById from "./item/ShowItemById";
import UpdateItem from "./item/UpdateItem";
import AddNewItemType from "./itemType/AddNewItemType";
import ShowAllItemTypes from "./itemType/ShowAllItemTypes"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/items/:id" element={<ShowItemById/>}/>
                    <Route path={"/items/add"} element={<AddNewItem/>}/>
                    <Route path={"/item-types/add"} element={<AddNewItemType/>}/>
                    <Route path="/items/update/:id" element={<UpdateItem/>}/>
                    <Route path="/item-types" element={<ShowAllItemTypes/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
