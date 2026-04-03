import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import apiClient from '../../core/ApiClient';
import {useLocale} from "../../core/UseLocales";
import {useTranslation} from "react-i18next";

const UpdateItem = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypes, setItemTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES,prefix} = useLocale();

    useEffect(() => {
        apiClient.get(`/items/${id}`)
            .then(res => {
                setItem(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
        apiClient.get('/itemTypes')
            .then(res => {
                setItemTypes(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }, [id]);

    const validate = () => {
        const newErrors = {};

        if (!item.title || !item.title.trim()) newErrors.title = t("required");
        if (!item.price || isNaN(item.price) || parseInt(item.price) <= 0)
            newErrors.price = t("only_positive_price");
        if (!item.quantity || isNaN(item.quantity) || parseInt(item.quantity) <= 0)
            newErrors.quantity = t("only_positive_quantity");
        if (!item.itemTypeId) newErrors.itemTypeId = t("required");


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await apiClient.put(`/admin/items/${id}`, item);
            navigate(`${prefix}/admin`);
        } catch (err) {
            console.error(t("error_updating_item"), err);
            alert(t("error_saving_changes"))
        }
    };

    if (loading) return <p>{t("loading")}</p>;
    if (!item) return <p>{t("failed_load_item")}</p>;

    return (
        <div className="container">
            <h2>{t("update_item")}: {item.title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={item.title}
                    onChange={e => setItem({...item, title: e.target.value})}
                />
                {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}
                <p></p>

                <input
                    type="number"
                    value={item.price}
                    onChange={e => setItem({...item, price: parseInt(e.target.value)})}
                />
                {errors.price && <p style={{color: 'red'}}>{errors.price}</p>}
                <p></p>

                <input
                    type="number"
                    value={item.quantity}
                    onChange={e => setItem({...item, quantity: parseInt(e.target.value)})}
                />
                {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}
                <p></p>

                <select value={item.itemTypeId}
                        onChange={e => setItem({...item, itemTypeId: parseInt(e.target.value)})}>
                    <option value="">{t("select_item_type")}</option>
                    {itemTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.title}</option>
                    ))}
                </select>
                {errors.itemTypeId && <p style={{color: 'red'}}>{errors.itemTypeId}</p>}
                <p></p>

                <button type="submit">{t("save")}</button>
                <button type="button" onClick={() => navigate(`${prefix}/admin`)} style={{marginLeft: '10px'}}>
                    ← {t("home")}
                </button>
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

export default UpdateItem;
