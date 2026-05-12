import {useState, useEffect} from 'react';
import publicApiClient from '../../core/PublicApiClient';
import {Link} from 'react-router-dom';
import SearchItemByTitle from "../../core/SearchItemByTitle";
import {addToCart} from "../cart/CartService";
import AddToCartPopup from "../cart/AddToCartPopup";
import {useTranslation} from "react-i18next";
import {useLocale} from "../../core/UseLocales";


const ShowAllItems = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popupItem, setPopupItem] = useState(null);
    const {t} = useTranslation();
    const {prefix} = useLocale();


    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await publicApiClient.get('/items');
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

    const handleAddClick = (item) => {
        setPopupItem(item);
    };

    const handleAddToCart = (item, quantity) => {
        const result = addToCart(item, quantity);
        if (result === false) alert(`${t("updated_quantity")} ${item.title}`);
        else if (result === "exceed") alert(` ${t("cannot_add_more_than")} ${item.quantity}`);
    };

    if (loading) return <p>{t("loading")}</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <div>
            <h1>{t("all_items")}</h1>
            <SearchItemByTitle onSearch={handleSearchByTitle}/>

            {(filteredItems || items).map(item => (
                <div key={item.id} style={{border: '1px solid gray', padding: '10px', marginBottom: '10px'}}>
                    <h3>{item.title || item.name}</h3>
                    <p>{t("price")}: ${item.price}</p>
                    <p>{t("availability")}: {item.quantity > 0 ? t("in_stock") : t("not_in_stock")}</p>
                    <p>{t("manufacturer")}: {item.manufacturer}</p>

                    <button onClick={() => handleAddClick(item)} style={{marginLeft: '5px'}}>
                        {t("add")}
                    </button>

                    <Link to={`${prefix}/items/${item.id}`}>
                        <button style={{marginLeft: '5px'}}>{t("detail")}</button>
                    </Link>
                </div>
            ))}

            {filteredItems && (
                <button onClick={() => setFilteredItems(null)} style={{marginBottom: "15px"}}>
                    {t("all_items")}
                </button>
            )}

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

export default ShowAllItems;