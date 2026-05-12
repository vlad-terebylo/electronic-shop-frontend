import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SearchItemById from "./SearchItemById";
import SearchItemByTitle from "../../core/SearchItemByTitle";
import apiClient from '../../core/ApiClient';
import ConfirmPopup from '../../core/ConfirmPopup';
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";


const ShowAllItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deletedItem, setDeletedItem] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {t} = useTranslation();
    const {prefix} = useLocale();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await apiClient.get('/items');
            const data = Array.isArray(res.data) ? res.data : res.data.items;
            setItems(data || []);
            setLoading(false);
        } catch (err) {
            console.error(t("error_fetching_item"), err);
            setError(t("failed_load_item"));
            setLoading(false);
        }
    };

    const handleSearchByTitle = (title) => {
        if (!title) {
            setFilteredItems(items);
            return;
        }

        const filtered = items.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
        setFilteredItems(filtered);
    };

    const handleSearchById = (id) => {
        if (!id) {
            setFilteredItems(items);
            return;
        }

        const filtered = items.filter(item => item.id === id);
        setFilteredItems(filtered);
    };

    const handleDelete = async () => {
        if (deletedItem == null) return;

        try {
            await apiClient.delete(`/admin/items/${deletedItem}`);
            setDeletedItem(null);
            fetchItems();
        } catch (err) {
            console.error(t("error_deleting_item"), err.response?.data || err.message);
        }
    };

    const handleDeleteConfirm = async () => {
        await handleDelete(deletedItem);
        setDeletedItem(null);
    };

    if (loading) return <p>{t("loading")}</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div>
            <h1>{t("all_items")}</h1>

            <SearchItemById onSearch={handleSearchById}/>
            <SearchItemByTitle onSearch={handleSearchByTitle}/>

            {(filteredItems || items).map(item => (
                <div key={item.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{item.title || item.name}</h3>
                    <p>Id: {item.id}</p>
                    <p>{t("price")}: ${item.price}</p>
                    <p>{t("quantity")}: {item.quantity}</p>
                    <p>{t("manufacturer")}: {item.manufacturer}</p>

                    <Link to={`${prefix}/admin/items/${item.id}`}>
                        <button>{t("detail")}</button>
                    </Link>
                    <button onClick={() => navigate(`${prefix}/admin/items/update/${item.id}`)}
                            style={{marginLeft: '5px'}}>
                        {t("update_item")}
                    </button>
                    <button onClick={() => setDeletedItem(item.id)} style={{marginLeft: '5px'}}>
                        {t("remove_item")}
                    </button>
                </div>
            ))}

            {filteredItems && (
                <button onClick={() => setFilteredItems(null)} style={{marginBottom: "15px"}}>
                    {t("all_items")}
                </button>
            )}

            {deletedItem && (
                <ConfirmPopup
                    message={t("are_you_sure_you_want_to_delete_this_item")}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletedItem(null)}
                />
            )}
        </div>
    );
};

export default ShowAllItems;
