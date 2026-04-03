import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import SearchItemById from "./SearchItemById";
import SearchItemByTitle from "../../core/SearchItemByTitle";
import apiClient from '../../core/ApiClient';
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";


const ShowAllItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingItem, setEditingItem] = useState(null);
    const [id, setItemId] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {t} = useTranslation();
    const {SUPPORTED_LOCALES, prefix} = useLocale();

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
        if (id == null) return;

        try {
            await apiClient.delete(`/admin/items/${id}`);
            setItemId(null);
            fetchItems();
        } catch (err) {
            console.error(t("error_deleting_item"), err.response?.data || err.message);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.put(`/admin/items/${editingItem.id}`, editingItem);
            setEditingItem(null);
            fetchItems();
        } catch (err) {
            console.error(t("error_updating_item"), err);
        }
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
                    <p>{t("price")}: {item.price}</p>
                    <p>{t("quantity")}: {item.quantity}</p>
                    <p>{t("manufacturer")}: {item.manufacturer}</p>

                    <Link to={`${prefix}/admin/items/${item.id}`}>
                        <button>{t("detail")}</button>
                    </Link>
                    <button onClick={() => navigate(`${prefix}/admin/items/update/${item.id}`)}
                            style={{marginLeft: '5px'}}>
                        {t("update_item")}
                    </button>
                    <button onClick={() => setItemId(item.id)} style={{marginLeft: '5px'}}>
                        {t("remove_item")}
                    </button>
                </div>
            ))}

            {filteredItems && (
                <button onClick={() => setFilteredItems(null)} style={{marginBottom: "15px"}}>
                    {t("all_items")}
                </button>
            )}

            {editingItem && (
                <div style={{border: '2px solid blue', padding: '15px', marginTop: '20px'}}>
                    <h2>{t("update_item")}: {editingItem.title || editingItem.name}</h2>
                    <form onSubmit={handleUpdateSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingItem.title}
                            onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={editingItem.price}
                            onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value)})}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={editingItem.quantity}
                            onChange={(e) => setEditingItem({...editingItem, quantity: parseInt(e.target.value)})}
                            required
                        />
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={() => setEditingItem(null)} style={{marginLeft: '10px'}}>
                            {t("cancel")}
                        </button>
                    </form>
                </div>
            )}

            {id && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}>
                        <p>{t("are_you_sure_you_want_to_delete_this_item")}</p>
                        <button onClick={handleDelete} style={{marginRight: '10px'}}>{t("yes")}</button>
                        <button onClick={() => setItemId(null)}>{t("cancel")}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowAllItems;
