import React, {useState} from 'react';
import apiClient from '../../core/ApiClient';
import {useNavigate} from 'react-router-dom';
import '../../App.css';
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";

const AddNewItemType = () => {
    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();

    const validate = () => {
        const newErrors = {};

        if (!title || !title.trim()) newErrors.title = 'Title is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleAddItemType = async () => {
        if (!validate()) return;
        if (!title.trim()) return;
        try {
            await apiClient.post('/admin/itemTypes', {title});
            setTitle('');
            navigate(`${prefix}/admin/item-types`);
        } catch (err) {
            console.error(t("error_adding_item_type"), err);
        }
    };

    return (
        <div className="container">
            <h2>{t("add_item_type")}</h2>
            <input
                type="text"
                placeholder="Item type title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{marginBottom: '10px', padding: '5px', width: '250px'}}
            />
            {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}

            <div>
                <button onClick={handleAddItemType} style={{marginRight: '10px'}}>
                    {t("add_item_type")}
                </button>
                <button onClick={() => navigate(`${prefix}/admin/item-types`)}>
                    ← {t("home")}
                </button>
            </div>

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
    );
};

export default AddNewItemType;
