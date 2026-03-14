import React from 'react';
import ShowAllItems from './ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../../core/AuthButton";
import {callBackend} from "../../core/ApiHelper";
import {useIsAuthenticated, useMsal} from "@azure/msal-react";

const AdminPage = () => {
    const {instance, accounts} = useMsal();

    const data = async () => {
        try {
            console.log(accounts[0]);
            console.log(instance.getActiveAccount);
            const data = await callBackend(instance, accounts);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h1>Main admin page</h1>

            <button onClick={data}>Call backend</button>

            <AuthButton/>

            <div className="button-group">

                <Link to="/admin/items/add">
                    <button>Add new item</button>
                </Link>

                <Link to="/admin/item-types">
                    <button>Show all item types</button>
                </Link>

                <Link to="/admin/purchases">
                    <button>Show all customers' purchases</button>
                </Link>


            </div>

            <ShowAllItems/>
        </div>
    );
};

export default AdminPage;