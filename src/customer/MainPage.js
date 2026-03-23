import React from 'react';
import ShowAllItems from './item/ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../core/AuthButton";
import {useTranslation} from "react-i18next";
import {useLocale} from "../core/UseLocales";


const MainPage = () => {

    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES} = useLocale();

    return (
        <div className="container">
            <h1>{t('main_customer_page')}</h1>

            <AuthButton/>

            <Link to={`/${SUPPORTED_LOCALES[0]}/items/cart`}>
                <button style={{margin: '5px'}}>{t('cart_btn')}</button>
            </Link>

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