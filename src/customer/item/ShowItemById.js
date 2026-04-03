import React, {useState, useEffect} from "react";
import publicApiClient from '../../core/PublicApiClient';
import {useParams, useNavigate} from 'react-router-dom';
import {addToCart} from "../cart/CartService";
import CartPopup from "../cart/CartPopup";
import AddToCartPopup from "../cart/AddToCartPopup";
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";


const ShowItemByIdU = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [itemTypeTitle, setItemTypeTitle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupItem, setPopupItem] = useState(null);
    const [popupMessage, setPopupMessage] = useState(null);
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();

    const formatDate = (producingYear) => {
        return producingYear[2] + ' / ' + producingYear[1] + ' / ' + producingYear[0];
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

    const closePopup = () => setPopupMessage(null);

    if (loading) return <p>{t("loading")}</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="container">
            <h1>{t("detail")}</h1>
            <ul>
                <li><strong>{t("title")}:</strong> {item.title}</li>
                <li><strong>{t("price")}:</strong> {item.price}</li>
                <li><strong>{t("quantity")}:</strong> {item.quantity}</li>
                <li><strong>{t("year")}:</strong> {formatDate(item.producingYear)}</li>
                <li><strong>{t("manufacturer")}:</strong> {item.manufacturer}</li>
                <li><strong>{t("type")}:</strong> {itemTypeTitle}</li>
            </ul>
            <button onClick={() => navigate(`${prefix}/`)} className="button-group">
                ← {t("home")}
            </button>
            <button onClick={() => handleAddClick(item)} className="button-group">
                {t("add")}
            </button>

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


            {popupItem && (
                <AddToCartPopup
                    item={popupItem}
                    onClose={() => setPopupItem(null)}
                    onAdd={handleAddToCart}
                />
            )}

            {popupMessage && <CartPopup message={popupMessage} onClose={closePopup}/>}
        </div>
    );
};

export default ShowItemByIdU;
