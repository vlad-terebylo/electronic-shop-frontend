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
import UnauthorizedPage from "./authorization/UnauthorizedPage";
import ProtectedRoute from "./core/ProtectedRoute";
import './i18n';
import AdminRoute from "./core/AdminRoute";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/:lang/admin" element={<AdminRoute><AdminPage/></AdminRoute>}/>
                    <Route path="/:lang/admin/items/:id" element={<AdminRoute><ShowItemById/></AdminRoute>}/>
                    <Route path="/:lang/admin/items/add" element={<AdminRoute><AddNewItem/></AdminRoute>}/>
                    <Route path="/:lang/admin/item-types/add" element={<AdminRoute><AddNewItemType/></AdminRoute>}/>
                    <Route path="/:lang/admin/items/update/:id" element={<AdminRoute><UpdateItem/></AdminRoute>}/>
                    <Route path="/:lang/admin/itemTypes/update/:id" element={<AdminRoute><UpdateItemType/></AdminRoute>}/>
                    <Route path="/:lang/admin/item-types" element={<AdminRoute><ShowAllItemTypes/></AdminRoute>}/>
                    <Route path="/:lang/admin/purchases" element={<AdminRoute><PurchasesPage/></AdminRoute>}/>

                    <Route path="/:lang/" element={<MainPage/>}/>
                    <Route path="/:lang/items/:id" element={<ShowItemByIdU/>}/>
                    <Route path="/:lang/items/cart" element={<ShowCart/>}/>
                    <Route path="/:lang/items/cart/purchase" element={<ProtectedRoute><PurchasePage/></ProtectedRoute>}/>
                    <Route path="/:lang/login" element={<LoginPage/>}/>
                    <Route path="/:lang/signUp" element={<SignUpPage/>}/>
                    <Route path="/:lang/non-authorized" element={<UnauthorizedPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
