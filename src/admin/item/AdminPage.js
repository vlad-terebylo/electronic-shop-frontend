import React from 'react';
import ShowAllItems from './ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../../core/AuthButton";
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";


const AdminPage = () => {
    const {t} = useTranslation();
    const {
        changeLang, SUPPORTED_LOCALES,
        prefix
    } = useLocale();

    return (
        <div className="container">
            <h1>{t("main_admin_page")}</h1>

            <div className="button-group">

                <AuthButton/>

                <Link to={`${prefix}/admin/items/add`}>
                    <button>{t("add_new_item")}</button>
                </Link>

                <Link to={`${prefix}/admin/item-types`}>
                    <button>{t("show_all_item_types")}</button>
                </Link>

                <Link to={`${prefix}/admin/purchases`}>
                    <button>{t("show_all_customer_purchases")}</button>
                </Link>

                <Link to={`${prefix}/`}>
                    <button>{t("to_user_page")}</button>
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

            </div>

            <ShowAllItems/>
        </div>
    );
};

export default AdminPage;
