import React, {useState, useEffect} from "react";
import apiClient from "../../core/ApiClient";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";

const PurchasesPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [itemsMap, setItemsMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();

    useEffect(() => {
        fetchPurchases();
    }, []);

    const fetchPurchases = async () => {
        try {
            const res = await apiClient.get("authenticated/purchase");
            const itemsRes = await apiClient.get("/items");

            const map = {};
            itemsRes.data.forEach(item => {
                map[item.id] = item.title;
            });

            setItemsMap(map);
            setPurchases(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error(t("error_fetching_purchases"), err);
            setError(t("failed_load_purchases"));
            setLoading(false);
        }
    };

    if (loading) return <p>{t("loading_purchases")}</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div className="container">
            <h1>{t("show_all_customer_purchases")}</h1>

            {purchases.map(purchase => (
                <div key={purchase.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <ul>
                        <li><strong>Email:</strong> {purchase.email}</li>
                        <li><strong>{t("total_price")}:</strong> {purchase.totalPrice}</li>
                        <li><strong>{t("items")}:</strong></li>
                        {purchase.purchaseItems.map((item, index) => (
                            <div key={index} style={{margin: "20px"}}>
                                <li><strong>ID:</strong> {item.itemId}</li>
                                <li><strong>{t("item")}:</strong> {itemsMap[item.itemId] || `Item #${item.itemId}`}</li>
                                <li><strong>{t("quantity")}:</strong> {item.quantity}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            ))}
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

            <button onClick={() => navigate(`${prefix}/admin/`)} style={{margin: '10px'}}>
                ← {t("home")}
            </button>
        </div>
    );
};

export default PurchasesPage;
