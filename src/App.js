import './App.css';
import React from "react";
import AddNewItem from './admin/item/AddNewItem';
import ShowItemById from "./admin/item/ShowItemById";
import ShowItemByIdU from "./customer/item/ShowItemById";
import UpdateItem from "./admin/item/UpdateItem";
import AddNewItemType from "./admin/itemType/AddNewItemType";
import ShowAllItemTypes from "./admin/itemType/ShowAllItemTypes"
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
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
            <Routes>

                <Route path="/" element={<MainPage/>}/>
                <Route path="/items/:id" element={<ShowItemByIdU/>}/>
                <Route path="/items/cart" element={<ShowCart/>}/>
                <Route path="/items/cart/purchase" element={<ProtectedRoute><PurchasePage/></ProtectedRoute>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
                <Route path="/non-authorized" element={<UnauthorizedPage/>}/>

                <Route path="/admin" element={<AdminRoute><AdminPage/></AdminRoute>}/>
                <Route path="/admin/items/:id" element={<AdminRoute><ShowItemById/></AdminRoute>}/>
                <Route path="/admin/items/add" element={<AdminRoute><AddNewItem/></AdminRoute>}/>
                <Route path="/admin/items/update/:id" element={<AdminRoute><UpdateItem/></AdminRoute>}/>
                <Route path="/admin/item-types/add" element={<AdminRoute><AddNewItemType/></AdminRoute>}/>
                <Route path="/admin/itemTypes/update/:id" element={<AdminRoute><UpdateItemType/></AdminRoute>}/>
                <Route path="/admin/item-types" element={<AdminRoute><ShowAllItemTypes/></AdminRoute>}/>
                <Route path="/admin/purchases" element={<AdminRoute><PurchasesPage/></AdminRoute>}/>


                <Route path="/:lang">
                    <Route index element={<MainPage/>}/>
                    <Route path="items/:id" element={<ShowItemByIdU/>}/>
                    <Route path="items/cart" element={<ShowCart/>}/>
                    <Route path="items/cart/purchase" element={<ProtectedRoute><PurchasePage/></ProtectedRoute>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signUp" element={<SignUpPage/>}/>
                    <Route path="non-authorized" element={<UnauthorizedPage/>}/>

                    <Route path="admin" element={<AdminRoute><AdminPage/></AdminRoute>}/>
                    <Route path="admin/items/:id" element={<AdminRoute><ShowItemById/></AdminRoute>}/>
                    <Route path="admin/items/add" element={<AdminRoute><AddNewItem/></AdminRoute>}/>
                    <Route path="admin/items/update/:id" element={<AdminRoute><UpdateItem/></AdminRoute>}/>
                    <Route path="admin/item-types/add" element={<AdminRoute><AddNewItemType/></AdminRoute>}/>
                    <Route path="admin/itemTypes/update/:id" element={<AdminRoute><UpdateItemType/></AdminRoute>}/>
                    <Route path="admin/item-types" element={<AdminRoute><ShowAllItemTypes/></AdminRoute>}/>
                    <Route path="admin/purchases" element={<AdminRoute><PurchasesPage/></AdminRoute>}/>
                </Route>

                <Route path="/en/*" element={<Navigate to="/" replace />} />

            </Routes>
        </Router>
    );
}

export default App;