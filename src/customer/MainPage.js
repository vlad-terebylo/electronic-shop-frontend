import React from 'react';
import ShowAllItems from './item/ShowAllItems';
import AuthButton from "../core/AuthButton";
import {useTranslation} from "react-i18next";
import LocalizedLink from "../core/Link";
import LanguageSwitcher from "../core/LanguageSwitcher";
import {useIsAuthenticated} from "@azure/msal-react";


const MainPage = () => {

    const roles = JSON.parse(sessionStorage.getItem('app.user.roles') || '[]');
    const isAdmin = roles.includes("admin");
    const isAuthenticatedAsUser = useIsAuthenticated() && !isAdmin;
    const {t} = useTranslation();

    return (
        <div className="container">
            <h1>{t('main_customer_page')}</h1>

            <AuthButton/>

            <LocalizedLink to="/items/cart">
                <button style={{margin: '5px'}}>{t('cart_btn')}</button>
            </LocalizedLink>

            {isAdmin && (
                <LocalizedLink to="/admin">
                    <button style={{margin: '5px'}}>{t("to_admin_page")}</button>
                </LocalizedLink>
            )}

            {isAuthenticatedAsUser && (
                <h1>Welcome! You are authenticated with users' rights</h1>
            )}

            {isAdmin && (
                <h1>Welcome, admin!</h1>
            )}

            <LanguageSwitcher/>

            <ShowAllItems/>
        </div>
    )
};

export default MainPage;