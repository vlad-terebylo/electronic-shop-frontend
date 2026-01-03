import './App.css';
import React from "react";
import AddNewItem from './item/AddNewItem';
import ShowAllItems from "./item/ShowAllItems";
import ShowItemById from "./item/ShowItemById";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


function App() {

    return (
        <Router>
            <div>
                <h1>Add new item</h1>
                <AddNewItem/>

                <h2>Show all items</h2>
                <ShowAllItems/>

                <h2>Show item by id</h2>
                <Link to="{/item/:1}">Show item with id 1</Link>

                <Routes>
                    <Route path="/item/:id" element={<ShowItemById/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
