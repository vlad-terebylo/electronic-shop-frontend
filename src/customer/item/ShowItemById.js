import React, {useState, useEffect} from "react";
import publicApiClient from '../../core/PublicApiClient';
import {useParams} from 'react-router-dom';
import {addToCart} from "../cart/CartService";
import AddToCartPopup from "../cart/AddToCartPopup";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../core/LanguageSwitcher";
import LocalizedLink from "../../core/Link";


const ShowItemByIdU = () => {
    const {id} = useParams();

    const [item, setItem] = useState(null);
    const [itemTypeTitle, setItemTypeTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupItem, setPopupItem] = useState(null);
    const {t} = useTranslation();

    const formatDate = (producingYear) => {
        if (!producingYear) return "";
        return producingYear.slice(0, 10);
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const item = await publicApiClient.get(`/items/${id}`);
                const data = item.data;
                setItem(item.data);

                const itemType = await publicApiClient.get(`/itemTypes/${data.itemTypeId}`);
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

    const handleAddClick = (item) => {
        setPopupItem(item);
    };

    const handleAddToCart = (item, quantity) => {
        const result = addToCart(item, quantity);
        if (result === false) alert(`${t("updated_quantity")} ${item.title}`);
        else if (result === "exceed") alert(`${t("cannot_add_more_than")} ${item.quantity}`);
    };

    if (loading) return <p>{t("loading")}</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="container">
            <h1>{t("detail")}</h1>
            <ul>
                <li><strong>{t("title")}:</strong> {item.title}</li>
                <li><strong>{t("price")}:</strong> ${item.price}</li>
                <li><strong>{t("availability")}:</strong> {item.quantity > 0 ? t("in_stock") : t("not_in_stock")}</li>
                <li><strong>{t("year")}:</strong> {formatDate(item.producingYear)}</li>
                <li><strong>{t("manufacturer")}:</strong> {item.manufacturer}</li>
                <li><strong>{t("type")}:</strong> {itemTypeTitle}</li>
            </ul>
            <div className="button-group">
                <LocalizedLink to="/" className="button-group-link">
                    <button>{t('home')}</button>
                </LocalizedLink>
                <button onClick={() => handleAddClick(item)}>
                    {t("add")}
                </button>
            </div>

            <LanguageSwitcher/>


            {popupItem && (
                <AddToCartPopup
                    item={popupItem}
                    onClose={() => setPopupItem(null)}
                    onAdd={handleAddToCart}
                />
            )}

        </div>
    );
};

export default ShowItemByIdU;
