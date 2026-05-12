import React, {useState, useEffect} from 'react';
import apiClient from '../../core/ApiClient';
import {Link, useNavigate} from 'react-router-dom';
import '../../App.css';
import {useLocale} from "../../core/UseLocales";
import ConfirmPopup from "../../core/ConfirmPopup";
import {useTranslation} from "react-i18next";

const ShowAllItemTypes = () => {
    const [itemTypes, setItemType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemTypeId, setItemIdForDelete] = useState(null);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {changeLang, SUPPORTED_LOCALES, prefix} = useLocale();

    useEffect(() => {
        fetchItemTypes();
    }, []);

    const fetchItemTypes = async () => {
        try {
            const itemTypeList = await apiClient.get('/itemTypes');
            const data = Array.isArray(itemTypeList.data) ? itemTypeList.data : itemTypeList.data.itemType;
            setItemType(data || []);
            setLoading(false);
        } catch (error) {
            console.error(t("error_fetching_item_types"), error);
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        if (itemTypeId == null) return;

        try {
            await apiClient.delete(`/admin/itemTypes/${itemTypeId}`);
            setItemIdForDelete(null);
            fetchItemTypes();
        } catch (err) {
            console.error(t("error_deleting_item_type"), err);
        }
    };

    const handleDeleteConfirm = async () => {
        await handleDelete(itemTypeId);
        setItemIdForDelete(null);
    };


    if (loading) return <p>{t("loading")}</p>;
    if (!itemTypes.length) return <p>{t("failed_load_item_types")}</p>;

    return (
        <div className="container">
            <h1>{t("show_all_item_types")}</h1>
            <div className="button-group">
                <Link to={`${prefix}/admin/item-types/add`}>
                    <button style={{marginBottom: '20px'}}>{t("add_item_type")}</button>
                </Link>
                <Link to={`${prefix}/admin`}>
                    <button style={{marginBottom: '20px'}}>← {t("to_admin_page")}</button>
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

            {itemTypes.map(itemType => (
                <div key={itemType.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{itemType.title}</h3>
                    <button onClick={() => navigate(`${prefix}/admin/itemTypes/update/${itemType.id}`)}
                            style={{marginRight: '10px'}}>
                        {t("update_item_type")}
                    </button>

                    <button onClick={() => setItemIdForDelete(itemType.id)}>
                        {t("remove_item_type")}
                    </button>
                </div>
            ))}

            {itemTypeId && (
                <ConfirmPopup
                    message={t("are_you_sure_you_want_to_delete_this_item_type")}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setItemIdForDelete(null)}
                />
            )}
        </div>
    );
};

export default ShowAllItemTypes;
