import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../core/ApiClient';
import {useLocale} from "../../core/UseLocales";
import {useTranslation} from "react-i18next";

const UpdateItemType = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [title, setItemTypeItem] = useState('');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();

    useEffect(() => {
        apiClient.get(`/itemTypes/${id}`)
            .then(res => {
                setItemTypeItem(res.data.title);
                setLoading(false);
            })
            .catch(err => {
                console.error(t("error_fetching_item_types"), err);
                setLoading(false);
            });
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!title || !title.trim()) newErrors.title = 'Title is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await apiClient.patch(`/admin/itemTypes/${id}`, {title});
            navigate(`${prefix}/admin/item-types`);
        } catch (err) {
            console.error(t("error_updating_item_type"), err);
            alert(t("error_saving_changes"));
        }
    };

    if (loading) return <p>{t("loading")}</p>;

    return (
        <div className="container">
            <h2>{t("update_item_type")}: {title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={e => setItemTypeItem(e.target.value)}
                    style={{padding: '5px', width: '250px', marginBottom: '10px'}}
                />
                {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}
                <div>
                    <button type="submit" style={{marginRight: '10px'}}>{t("save")}</button>
                    <button type="button"
                            onClick={() => navigate(`${prefix}/admin/item-types`)}>← {t("home")}</button>
                </div>
            </form>
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

export default UpdateItemType;
