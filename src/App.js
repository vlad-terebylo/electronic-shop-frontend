import './App.css';
import React from "react";
import AddNewItem from './admin/item/AddNewItem';
import ShowItemById from "./admin/item/ShowItemById";
import ShowItemByIdU from "./customer/item/ShowItemById";
import UpdateItem from "./admin/item/UpdateItem";
import AddNewItemType from "./admin/itemType/AddNewItemType";
import ShowAllItemTypes from "./admin/itemType/ShowAllItemTypes"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UpdateItemType from "./admin/itemType/UpdateItemType";
import PurchasesPage from "./admin/purchase/GetPurchasedItems";
import MainPage from "./customer/MainPage";
import AdminPage from "./admin/item/AdminPage";
import ShowCart from "./customer/cart/ShowCart";
import PurchasePage from "./customer/purchase/PurchasePage";
import LoginPage from "./authorization/LoginPage";
import SignUpPage from "./authorization/CreateAccount";



function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/admin/items/:id" element={<ShowItemById/>}/>
                    <Route path={"/admin/items/add"} element={<AddNewItem/>}/>
                    <Route path={"/admin/item-types/add"} element={<AddNewItemType/>}/>
                    <Route path="/admin/items/update/:id" element={<UpdateItem/>}/>
                    <Route path="/admin/itemTypes/update/:id" element={<UpdateItemType/>}/>
                    <Route path="/admin/item-types" element={<ShowAllItemTypes/>}/>
                    <Route path="/admin/purchases" element={<PurchasesPage/>}/>

                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/items/:id" element={<ShowItemByIdU/>}/>
                    <Route path="/items/cart" element={<ShowCart/>}/>
                    <Route path="/items/cart/purchase" element={<PurchasePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signUp" element={<SignUpPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
