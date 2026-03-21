import React from 'react';
import ShowAllItems from './ShowAllItems';
import {Link} from "react-router-dom";
import AuthButton from "../../core/AuthButton";
import {useTranslation} from "react-i18next";


const AdminPage = () => {
    const {t, i18n} = useTranslation();

    return (
        <div className="container">
            <h1>{t("main_admin_page")}</h1>

            <AuthButton/>

            <div className="button-group">

                <Link to="/admin/items/add">
                    <button>{t("add_new_item")}</button>
                </Link>

                <Link to="/admin/item-types">
                    <button>Show all item types</button>
                </Link>

                <Link to="/admin/purchases">
                    <button>Show all customers' purchases</button>
                </Link>

                <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('en')}>EN</button>
                <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('cz')}>CZ</button>


            </div>

            <ShowAllItems/>
        </div>
    );
};

export default AdminPage;
