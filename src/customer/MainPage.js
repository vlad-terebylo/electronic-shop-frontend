import React from 'react';
import ShowAllItems from './item/ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../core/AuthButton";
import {useTranslation} from "react-i18next";
import {useLocale} from "../core/UseLocales";


const MainPage = () => {

    const roles = JSON.parse(sessionStorage.getItem('app.user.roles') || '[]');
    const isAdmin = roles.includes("admin");
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();

    return (
        <div className="container">
            <h1>{t('main_customer_page')}</h1>

            <AuthButton/>

            <Link to={`${prefix}/items/cart`}>
                <button style={{margin: '5px'}}>{t('cart_btn')}</button>
            </Link>

            {isAdmin && (
                <Link to={`${prefix}/admin`}>
                    <button style={{margin: '5px'}}>{t("to_admin_page")}</button>
                </Link>
            )}

            <div className="lang-switcher">
                {SUPPORTED_LOCALES.map((locale) => (
                    <button
                        key={locale}
                        style={{margin: '5px'}}
                        onClick={() => changeLang(locale)}
                    >
                        {locale.toUpperCase()}
                    </button>
                ))}
            </div>

            <ShowAllItems/>
        </div>
    )
};

export default MainPage;