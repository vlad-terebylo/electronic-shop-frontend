import React, {useState, useEffect} from "react";
import apiClient from '../../core/ApiClient';
import {useParams, useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";


const ShowItemById = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypeTitle, setItemTypeTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {t, i18n} = useTranslation();


    const formatDate = (producingYear) => {
        return producingYear[2] + ' / ' + producingYear[1] + ' / ' + producingYear[0];
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item = await apiClient.get(`/items/${id}`);
                const data = item.data;
                setItem(item.data);

                const itemType = await apiClient.get(`/itemTypes/${data.itemTypeId}`);
                setItemTypeTitle(itemType.data.title);

                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(t("error_fetching_item"));
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    if (loading) return <p>{t("loading")}</p>;
    if (error) return <p>{error}</p>;
    if (!item) return <p>{t("failed_load_item")}</p>;
    return (
        <div className="container">
            <h1>{t("detail")}</h1>
            <ul>
                <li><strong>Id:</strong> {item.id}</li>
                <li><strong>{t("title")}:</strong> {item.title}</li>
                <li><strong>{t("price")}:</strong> {item.price}</li>
                <li><strong>{t("quantity")}:</strong> {item.quantity}</li>
                <li><strong>{t("year")}:</strong> {formatDate(item.producingYear)}</li>
                <li><strong>{t("manufacturer")}:</strong> {item.manufacturer}</li>
                <li><strong>{t("type")}:</strong> {itemTypeTitle}</li>
            </ul>
            <button onClick={() => navigate(-1)} className="button-group">
                ← {t("home")}
            </button>

            <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('en')}>EN</button>
            <button style={{margin: '5px'}} onClick={() => i18n.changeLanguage('cz')}>CZ</button>
        </div>
    );
};

export default ShowItemById;
