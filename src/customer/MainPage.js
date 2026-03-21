import React from 'react';
import ShowAllItems from './item/ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../core/AuthButton";
import {useTranslation} from "react-i18next";


const MainPage = () => {

    const {t, i18n} = useTranslation();

    return (
        <div className="container">
            <h1>{t('main_customer_page')}</h1>

            <AuthButton/>

            <Link to="/items/cart">
                <button style={{margin: '5px'}}>{t('cart_btn')}</button>
            </Link>

            <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('cz')}>CZ</button>

            <ShowAllItems/>
        </div>
    )
};

export default MainPage;